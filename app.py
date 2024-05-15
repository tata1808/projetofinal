from flask import Flask, jsonify, request, redirect, render_template
import os
import requests

app = Flask(__name__)

# URL de redirecionamento configurada no painel de desenvolvedor do Spotify
REDIRECT_URI = 'https://github.com/tata1808/projetofinal.git.io.git'
# Credenciais da aplicação Spotify
CLIENT_ID = '16c56cb32bca4bb6bd93987560131fa5'
CLIENT_SECRET = 'd9a4e284150c44d19b0d7e486626c457'
SCOPE = 'user-read-playback-state user-modify-playback-state streaming'
SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token'
SPOTIFY_AUTH_URL = 'https://accounts.spotify.com/authorize'
SPOTIFY_PLAY_URL = 'https://api.spotify.com/v1/me/player/play'

# Página inicial para iniciar o fluxo de autorização do Spotify
@app.route('/')
def home():
    auth_url = f"{SPOTIFY_AUTH_URL}?response_type=code&client_id={CLIENT_ID}&scope={SCOPE}&redirect_uri={REDIRECT_URI}"
    return redirect(auth_url)

# Callback para receber o código de autorização do Spotify e obter o token de acesso
@app.route('/callback')
def callback():
    code = request.args.get('code')
    response = requests.post(SPOTIFY_TOKEN_URL, data={
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': REDIRECT_URI,
        'client_id': CLIENT_ID,
        'client_secret': CLIENT_SECRET
    })
    response_data = response.json()
    access_token = response_data.get('access_token')
    return jsonify({'access_token': access_token})

# Rota para reproduzir uma música no Spotify
@app.route('/play', methods=['POST'])
def play():
    data = request.get_json()
    track_uri = data.get('track_uri')
    access_token = data.get('access_token')

    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json'
    }
    payload = {
        'uris': [track_uri]
    }

    response = requests.put(SPOTIFY_PLAY_URL, headers=headers, json=payload)

    if response.status_code == 204:
        return jsonify({'status': 'Playing track'}), 200
    else:
        return jsonify({'error': response.json()}), response.status_code

# Renderiza o template HTML
@app.route('/index')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(port=5000, debug=True)
    app.run(host='0.0.0.0', port=port, debug=True)
