from apis.student.summary import student_summary
from main import app


@app.route("/")
def homepage():
    return "<h1>Backend Server is running</h1>"


# Student Routes
app.add_url_rule("/student_summary", view_func=student_summary, methods=["GET"])
