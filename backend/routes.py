from apis.student.summary import student_summary
from main import app


@app.route("/")
def homepage():
    return "<h1>Backend Server is running</h1>"


# test route
@app.route("/test")
def test():
    return "<h1>Test route for the gmeet✌️</h1>"


# Student Routes
app.add_url_rule("/student_summary", view_func=student_summary, methods=["GET"])
