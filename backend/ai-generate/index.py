"""
Генерация кода игры с помощью OpenAI GPT.
Принимает prompt пользователя, возвращает JS-код игры.
Требует авторизации (токен).
"""
import json
import os
import urllib.request
import urllib.error
import psycopg2


def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])


def get_schema():
    return os.environ.get("MAIN_DB_SCHEMA", "public")


def cors_headers():
    return {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Authorization",
    }


def ok(data: dict):
    return {"statusCode": 200, "headers": {**cors_headers(), "Content-Type": "application/json"}, "body": json.dumps(data)}


def err(msg: str, code: int = 400):
    return {"statusCode": code, "headers": {**cors_headers(), "Content-Type": "application/json"}, "body": json.dumps({"error": msg})}


def check_auth(event: dict) -> bool:
    headers = event.get("headers") or {}
    auth = headers.get("X-Authorization") or headers.get("x-authorization") or ""
    token = auth[7:] if auth.startswith("Bearer ") else None
    if not token:
        return False
    schema = get_schema()
    conn = get_conn()
    cur = conn.cursor()
    try:
        cur.execute(
            f"SELECT 1 FROM {schema}.sessions WHERE token=%s AND expires_at > NOW()",
            (token,)
        )
        return cur.fetchone() is not None
    finally:
        cur.close()
        conn.close()


def call_openai(prompt: str) -> str:
    api_key = os.environ.get("OPENAI_API_KEY", "")
    if not api_key:
        raise ValueError("OPENAI_API_KEY не задан")

    system_prompt = """Ты — ИИ-движок для создания браузерных игр на JavaScript.
Напиши ТОЛЬКО чистый JavaScript код игры для canvas (без HTML, без markdown, без пояснений).
Код должен:
- Использовать canvas с id='gameCanvas'
- Быть самодостаточным и запускаться сразу
- Содержать игровой цикл requestAnimationFrame
- Иметь управление (стрелки или WASD или мышь — по смыслу игры)
- Использовать неоновую цветовую палитру (cyan, magenta, lime)
- Быть ограничен ~80 строками
Начинай сразу с кода, никаких объяснений."""

    payload = json.dumps({
        "model": "gpt-4o-mini",
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": f"Создай игру: {prompt}"}
        ],
        "max_tokens": 1200,
        "temperature": 0.7
    }).encode()

    req = urllib.request.Request(
        "https://api.openai.com/v1/chat/completions",
        data=payload,
        headers={
            "Content-Type": "application/json",
            "Authorization": f"Bearer {api_key}"
        }
    )
    with urllib.request.urlopen(req, timeout=25) as resp:
        data = json.loads(resp.read())
    return data["choices"][0]["message"]["content"].strip()


def handler(event: dict, context) -> dict:
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers(), "body": ""}

    if not check_auth(event):
        return err("Требуется авторизация", 401)

    body = {}
    if event.get("body"):
        body = json.loads(event["body"])

    prompt = (body.get("prompt") or "").strip()
    if not prompt:
        return err("Введите описание игры")
    if len(prompt) > 1000:
        return err("Описание слишком длинное (макс. 1000 символов)")

    code = call_openai(prompt)
    return ok({"code": code})
