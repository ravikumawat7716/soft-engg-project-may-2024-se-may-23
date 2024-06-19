from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/")
def homepage():
    return "<h1>Backend Server is running</h1>"


@app.route("/home")
def home():
    response = {
        "success": True,
        "message": "Successfully received data from the backend",
    }
    return jsonify(response)


@app.route("/data")
def data():
    response = {
        "success": True,
        "data": [{"name": "John Doe", "age": 30}, {"name": "Jane Doe", "age": 25}],
    }
    return jsonify(response)


if __name__ == "__main__":
    app.run(debug=True)
