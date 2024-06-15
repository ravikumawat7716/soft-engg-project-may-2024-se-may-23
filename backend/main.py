from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  

@app.route('/')
def homepage():
    return "<h1>Backend Server is running</h1>"

@app.route('/home')
def home():
    response = {
        "success": True,
        "message": "Successfully received data from the backend"
    }
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
