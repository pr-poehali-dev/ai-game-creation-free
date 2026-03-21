"""
Аутентификация: регистрация, вход, выход, получение текущего пользователя.
Actions: register, login, logout, me
"""
import json
import os
import hashlib
import secrets
import psycopg2


def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])


def get_schema():
    return os.environ.get("MAIN_DB_SCHEMA", "public")


def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()


def get_token(event: dict) -> str | None:
    headers = event.get("headers") or {}
    auth = headers.get("X-Authorization") or headers.get("x-authorization") or ""
    if auth.startswith("Bearer "):
        return auth[7:]
    return None


def cors_headers():
    return {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Authorization",
    }


def ok(data: dict):
    return {"statusCode": 200, "headers": {**cors_headers(), "Content-Type": "application/json"}, "body": json.dumps(data)}


def err(msg: str, code: int = 400):
    return {"statusCode": code, "headers": {**cors_headers(), "Content-Type": "application/json"}, "body": json.dumps({"error": msg})}


def handler(event: dict, context) -> dict:
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers(), "body": ""}

    schema = get_schema()
    body = {}
    if event.get("body"):
        body = json.loads(event["body"])

    action = body.get("action") or (event.get("queryStringParameters") or {}).get("action", "me")

    conn = get_conn()
    cur = conn.cursor()

    try:
        if action == "register":
            username = (body.get("username") or "").strip()
            email = (body.get("email") or "").strip().lower()
            password = body.get("password") or ""

            if not username or not email or not password:
                return err("Заполните все поля")
            if len(password) < 6:
                return err("Пароль минимум 6 символов")
            if len(username) < 3:
                return err("Имя минимум 3 символа")

            cur.execute(f"SELECT id FROM {schema}.users WHERE email=%s OR username=%s", (email, username))
            if cur.fetchone():
                return err("Пользователь с таким email или именем уже существует")

            pw_hash = hash_password(password)
            cur.execute(
                f"INSERT INTO {schema}.users (username, email, password_hash) VALUES (%s, %s, %s) RETURNING id, username, email",
                (username, email, pw_hash)
            )
            user = cur.fetchone()
            token = secrets.token_hex(32)
            cur.execute(f"INSERT INTO {schema}.sessions (user_id, token) VALUES (%s, %s)", (user[0], token))
            conn.commit()
            return ok({"token": token, "user": {"id": user[0], "username": user[1], "email": user[2]}})

        elif action == "login":
            email = (body.get("email") or "").strip().lower()
            password = body.get("password") or ""

            if not email or not password:
                return err("Введите email и пароль")

            pw_hash = hash_password(password)
            cur.execute(
                f"SELECT id, username, email FROM {schema}.users WHERE email=%s AND password_hash=%s",
                (email, pw_hash)
            )
            user = cur.fetchone()
            if not user:
                return err("Неверный email или пароль")

            token = secrets.token_hex(32)
            cur.execute(f"INSERT INTO {schema}.sessions (user_id, token) VALUES (%s, %s)", (user[0], token))
            conn.commit()
            return ok({"token": token, "user": {"id": user[0], "username": user[1], "email": user[2]}})

        elif action == "logout":
            token = get_token(event)
            if token:
                cur.execute(f"UPDATE {schema}.sessions SET expires_at=NOW() WHERE token=%s", (token,))
                conn.commit()
            return ok({"ok": True})

        elif action == "me":
            token = get_token(event)
            if not token:
                return err("Не авторизован", 401)
            cur.execute(
                f"""SELECT u.id, u.username, u.email
                    FROM {schema}.sessions s
                    JOIN {schema}.users u ON u.id = s.user_id
                    WHERE s.token=%s AND s.expires_at > NOW()""",
                (token,)
            )
            user = cur.fetchone()
            if not user:
                return err("Сессия истекла", 401)
            return ok({"user": {"id": user[0], "username": user[1], "email": user[2]}})

        else:
            return err("Неизвестное действие", 400)

    finally:
        cur.close()
        conn.close()
