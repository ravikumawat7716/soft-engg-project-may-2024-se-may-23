from utils.configuration import create_app
from instances import app


app = create_app()


if __name__ == "__main__":
    app.run(debug=True, port=5000)
