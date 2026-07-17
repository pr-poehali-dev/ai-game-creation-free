"""
OAuth-авторизация через Google, Yandex, Facebook, VK.
GET ?provider=google&redirect_uri=<origin> - редирект на страницу авторизации провайдера
GET ?code=...&state=... - callback от провайдера, создаёт пользователя/сессию и редиректит на фронтенд
"""
import json
import os
import base64
import secrets
import urllib.request
import urllib.parse
import psycopg2

SELF_URL = "https://functions.poehali.dev/1aaa4d1a-1e5b-42c5-aa63-493f25677874"

PROVIDERS = {
    "google": {
        "auth_url": "https://accounts.google.com/o/oauth2/v2/auth",
        "token_url": "https://oauth2.googleapis.com/token",
        "user_url": "https://www.googleapis.com/oauth2/v2/userinfo",
        "scope": "openid email profile",
        "client_id_env": "GOOGLE_CLIENT_ID",
        "client_secret_env": "GOOGLE_CLIENT_SECRET",
    },
    "yandex": {
        "auth_url": "https://oauth.yandex.ru/authorize",
        "token_url": "https://oauth.yandex.ru/token",
        "user_url": "https://login.yandex.ru/info?format=json",
        "scope": "login:email login:info login:avatar",
        "client_id_env": "YANDEX_CLIENT_ID",
        "client_secret_env": "YANDEX_CLIENT_SECRET",
    },
    "facebook": {
        "auth_url": "https://www.facebook.com/v18.0/dialog/oauth",
        "token_url": "https://graph.facebook.com/v18.0/oauth/access_token",
        "user_url": "https://graph.facebook.com/me",
        "scope": "email public_profile",
        "client_id_env": "FACEBOOK_CLIENT_ID",
        "client_secret_env": "FACEBOOK_CLIENT_SECRET",
    },
    "vk": {
        "auth_url": "https://oauth.vk.com/authorize",
        "token_url": "https://oauth.vk.com/access_token",
        "user_url": "https://api.vk.com/method/users.get",
        "scope": "email",
        "client_id_env": "VK_CLIENT_ID",
        "client_secret_env": "VK_CLIENT_SECRET",
    },
}


def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])


def get_schema():
    return os.environ.get("MAIN_DB_SCHEMA", "public")


def cors_headers():
    return {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }


def err_redirect(redirect_uri: str, message: str):
    target = f"{redirect_uri}?oauth_error={urllib.parse.quote(message)}"
    return {"statusCode": 302, "headers": {**cors_headers(), "Location": target}, "body": ""}


def err(msg: str, code: int = 400):
    return {"statusCode": code, "headers": {**cors_headers(), "Content-Type": "application/json"}, "body": json.dumps({"error": msg})}


def http_get_json(url: str, headers: dict = None) -> dict:
    req = urllib.request.Request(url, headers=headers or {})
    with urllib.request.urlopen(req, timeout=15) as resp:
        return json.loads(resp.read())


def http_post_form_json(url: str, data: dict) -> dict:
    payload = urllib.parse.urlencode(data).encode()
    req = urllib.request.Request(url, data=payload, headers={"Content-Type": "application/x-www-form-urlencoded"})
    with urllib.request.urlopen(req, timeout=15) as resp:
        return json.loads(resp.read())


def ensure_unique_username(cur, schema: str, base: str) -> str:
    base = "".join(c for c in base if c.isalnum() or c in "_-") or "player"
    base = base[:30]
    candidate = base
    i = 1
    while True:
        cur.execute(f"SELECT 1 FROM {schema}.users WHERE username=%s", (candidate,))
        if not cur.fetchone():
            return candidate
        i += 1
        candidate = f"{base}{i}"


def handle_authorize(query: dict):
    provider = query.get("provider", "")
    redirect_uri_front = query.get("redirect_uri", "")
    if provider not in PROVIDERS:
        return err("Неизвестный провайдер")
    if not redirect_uri_front:
        return err("Не указан redirect_uri")

    cfg = PROVIDERS[provider]
    client_id = os.environ.get(cfg["client_id_env"])
    if not client_id:
        return err_redirect(redirect_uri_front, f"Вход через {provider} временно недоступен")

    state = base64.urlsafe_b64encode(json.dumps({
        "provider": provider,
        "redirect_uri": redirect_uri_front,
        "n": secrets.token_hex(8),
    }).encode()).decode()

    params = {
        "client_id": client_id,
        "redirect_uri": SELF_URL,
        "response_type": "code",
        "scope": cfg["scope"],
        "state": state,
    }
    if provider == "vk":
        params["v"] = "5.131"
        params["display"] = "page"

    location = f"{cfg['auth_url']}?{urllib.parse.urlencode(params)}"
    return {"statusCode": 302, "headers": {**cors_headers(), "Location": location}, "body": ""}


def handle_callback(query: dict):
    code = query.get("code", "")
    state_raw = query.get("state", "")
    try:
        state = json.loads(base64.urlsafe_b64decode(state_raw.encode()).decode())
    except Exception:
        return err("Некорректный state")

    provider = state.get("provider")
    redirect_uri_front = state.get("redirect_uri", "")
    if provider not in PROVIDERS:
        return err_redirect(redirect_uri_front or "/", "Неизвестный провайдер")

    cfg = PROVIDERS[provider]
    client_id = os.environ.get(cfg["client_id_env"])
    client_secret = os.environ.get(cfg["client_secret_env"])
    if not client_id or not client_secret:
        return err_redirect(redirect_uri_front, f"Вход через {provider} временно недоступен")

    try:
        if provider in ("facebook", "vk"):
            token_params = {
                "client_id": client_id,
                "client_secret": client_secret,
                "redirect_uri": SELF_URL,
                "code": code,
            }
            token_data = http_get_json(f"{cfg['token_url']}?{urllib.parse.urlencode(token_params)}")
        else:
            token_data = http_post_form_json(cfg["token_url"], {
                "client_id": client_id,
                "client_secret": client_secret,
                "redirect_uri": SELF_URL,
                "code": code,
                "grant_type": "authorization_code",
            })

        access_token = token_data.get("access_token")
        if not access_token:
            return err_redirect(redirect_uri_front, "Не удалось получить токен доступа")

        oauth_id = ""
        email = ""
        username = ""
        avatar_url = ""

        if provider == "google":
            profile = http_get_json(cfg["user_url"], {"Authorization": f"Bearer {access_token}"})
            oauth_id = str(profile.get("id", ""))
            email = profile.get("email", "")
            username = profile.get("name", "") or email.split("@")[0]
            avatar_url = profile.get("picture", "")

        elif provider == "yandex":
            profile = http_get_json(cfg["user_url"], {"Authorization": f"OAuth {access_token}"})
            oauth_id = str(profile.get("id", ""))
            email = profile.get("default_email", "") or ""
            username = profile.get("display_name") or profile.get("real_name") or profile.get("login", "")
            if not profile.get("is_avatar_empty") and profile.get("default_avatar_id"):
                avatar_url = f"https://avatars.yandex.net/get-yapic/{profile['default_avatar_id']}/islands-200"

        elif provider == "facebook":
            profile = http_get_json(
                f"{cfg['user_url']}?fields=id,name,email,picture&access_token={access_token}"
            )
            oauth_id = str(profile.get("id", ""))
            email = profile.get("email", "") or ""
            username = profile.get("name", "")
            avatar_url = (profile.get("picture") or {}).get("data", {}).get("url", "")

        elif provider == "vk":
            oauth_id = str(token_data.get("user_id", ""))
            email = token_data.get("email", "") or ""
            api_params = {
                "user_ids": oauth_id,
                "fields": "photo_200",
                "access_token": access_token,
                "v": "5.131",
            }
            vk_resp = http_get_json(f"{cfg['user_url']}?{urllib.parse.urlencode(api_params)}")
            vk_user = (vk_resp.get("response") or [{}])[0]
            username = f"{vk_user.get('first_name', '')} {vk_user.get('last_name', '')}".strip()
            avatar_url = vk_user.get("photo_200", "")

        if not oauth_id:
            return err_redirect(redirect_uri_front, "Не удалось получить данные профиля")

        if not email:
            email = f"{provider}_{oauth_id}@oauth.placeholder"
        if not username:
            username = f"{provider}_user"

    except Exception:
        return err_redirect(redirect_uri_front, "Ошибка авторизации через провайдера")

    schema = get_schema()
    conn = get_conn()
    cur = conn.cursor()
    try:
        cur.execute(
            f"SELECT id, username, email FROM {schema}.users WHERE oauth_provider=%s AND oauth_id=%s",
            (provider, oauth_id)
        )
        user = cur.fetchone()

        if not user:
            cur.execute(f"SELECT id, username, email FROM {schema}.users WHERE email=%s", (email,))
            existing_by_email = cur.fetchone()
            if existing_by_email:
                cur.execute(
                    f"UPDATE {schema}.users SET oauth_provider=%s, oauth_id=%s, avatar_url=COALESCE(avatar_url, %s) WHERE id=%s",
                    (provider, oauth_id, avatar_url, existing_by_email[0])
                )
                user = existing_by_email
            else:
                unique_username = ensure_unique_username(cur, schema, username)
                cur.execute(
                    f"""INSERT INTO {schema}.users (username, email, oauth_provider, oauth_id, avatar_url)
                        VALUES (%s, %s, %s, %s, %s) RETURNING id, username, email""",
                    (unique_username, email, provider, oauth_id, avatar_url)
                )
                user = cur.fetchone()

        token = secrets.token_hex(32)
        cur.execute(f"INSERT INTO {schema}.sessions (user_id, token) VALUES (%s, %s)", (user[0], token))
        conn.commit()

        location = f"{redirect_uri_front}?oauth_token={token}"
        return {"statusCode": 302, "headers": {**cors_headers(), "Location": location}, "body": ""}

    finally:
        cur.close()
        conn.close()


def handler(event: dict, context) -> dict:
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers(), "body": ""}

    query = event.get("queryStringParameters") or {}

    if query.get("code") and query.get("state"):
        return handle_callback(query)
    elif query.get("provider"):
        return handle_authorize(query)
    else:
        return err("Не указан provider")