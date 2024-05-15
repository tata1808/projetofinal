from flask import Flask, jsonify, request, redirect
import requests

app = Flask(__name__)

# Credenciais da aplicação Spotify
CLIENT_ID = '16c56cb32bca4bb6bd93987560131fa5'
CLIENT_SECRET = 'd9a4e284150c44d19b0d7e486626c457'
REDIRECT_URI = 'http://localhost:5000/callback'
SCOPE = 'user-read-playback-state user-modify-playback-state streaming'
SPOTIFY_TOKEN_URL = 'https://accounts.spotify.com/api/token'
SPOTIFY_AUTH_URL = 'https://accounts.spotify.com/authorize'

# Página inicial para autenticação
@app.route('/')
def home():
    auth_url = f"{SPOTIFY_AUTH_URL}?response_type=code&client_id={CLIENT_ID}&scope={SCOPE}&redirect_uri={REDIRECT_URI}"
    return redirect(auth_url)

# Callback para pegar o token de acesso
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

# Endpoint para tocar música
@app.route('/play', methods=['POST'])
def play():
    data = request.get_json()
    track_id = data.get('track_id')
    device_id = data.get('device_id')
    access_token = data.get('access_token')

    play_url = f"https://api.spotify.com/v1/me/player/play?device_id={device_id}"
    response = requests.put(play_url, headers={
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json'
    }, json={
        'uris': [f'spotify:track:{track_id}']
    })

    if response.status_code == 204:
        return jsonify({'status': 'Playing track'}), 200
    else:
        return jsonify({'error': response.json()}), response.status_code

if __name__ == '__main__':
    app.run(port=5000, host='localhost', debug=True)
