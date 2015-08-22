from requests_oauthlib import OAuth2Session
from flask import Flask, request, render_template, redirect, session, url_for
from werkzeug.contrib.fixers import ProxyFix
from flask.json import jsonify
import os
import json

app = Flask(__name__)
app.config.from_object('config')


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/robots.txt')
def robots():
    return app.send_static_file('robots.txt')


@app.route("/login")
def login():
    github = OAuth2Session(app.config['CLIENT_ID'],
                           scope=['public_repo', 'write:org'])
    authorization_url, state = github.authorization_url(
        app.config['AUTH_BASE_URL'])

    session['oauth_state'] = state
    return redirect(authorization_url)


@app.route("/callback", methods=["GET"])
def callback():
    github = OAuth2Session(app.config['CLIENT_ID'],
                           state=session['oauth_state'])
    token = github.fetch_token(app.config['TOKEN_URL'],
                               client_secret=app.config['CLIENT_SECRET'],
                               authorization_response=request.url)

    session['oauth_token'] = token
    return redirect(url_for('.ssmmfm'))


@app.route("/ssmmfm", methods=["GET"])
def ssmmfm():
    if not session:
        return redirect(url_for('.login'))
    else:
        return render_template('app.html')


@app.route("/user", methods=["GET"])
def user_data():
    github = OAuth2Session(app.config['CLIENT_ID'],
                           token=session['oauth_token'])
    results = github.get('https://api.github.com/user').json()

    return jsonify(results)


@app.route("/reviews", methods=["GET", "POST"])
def create_issue():
    github = OAuth2Session(app.config['CLIENT_ID'],
                           token=session['oauth_token'])
    token = 'token:{0}'.format(github.token['access_token'])
    headers = {'Authorization': token,
               'Accept': 'application/vnd.github.moondragon+json'}

    if request.method == 'POST':
        body = render_template('issue.md',
                               fingerprint=request.json['body']['fingerprint'],
                               desc=request.json['body']['description'],
                               links=request.json['body']['links'])
        issue = {'title': request.json['title'], 'body': body}

        response = github.post(
            'https://api.github.com/repos/public-fare/data/issues',
            data=json.dumps(issue),
            headers=headers
        )

        return jsonify(response.json())
    elif request.method == 'GET':
        response = github.get(
            'https://api.github.com/repos/public-fare/data/issues').json()
        return jsonify({'issues': response})
    else:
        return redirect(url_for('.server_error'))


@app.errorhandler(404)
def not_found(error):
    return render_template('404.html')


@app.errorhandler(500)
def server_error(error):
    return "{0}".format(error)


app.wsgi_app = ProxyFix(app.wsgi_app)

if __name__ == '__main__':
    app.run()
