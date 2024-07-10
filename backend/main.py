from utils.configuration import create_app
from instances import app


app = create_app()

@app.route("/")
def home():
    return "<h1>Backend Server is Running....</h1>"

if __name__ == "__main__":
    app.run(debug=True)
