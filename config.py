import os

SECRET_KEY = os.environ['SSMMFM_SECRET_KEY']
CLIENT_ID = os.environ['CLIENT_ID']
CLIENT_SECRET = os.environ['CLIENT_SECRET']
AUTH_BASE_URL = 'https://github.com/login/oauth/authorize'
TOKEN_URL = 'https://github.com/login/oauth/access_token'