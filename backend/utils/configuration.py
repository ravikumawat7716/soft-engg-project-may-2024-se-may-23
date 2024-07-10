from instances.app import app
from instances.api import api
from flask_cors import CORS
from apis.login import UserLoginAPI
from apis.summary import StudentSummaryAPI

def create_app():
    print("Creating app...")
    CORS(app)
    api.add_resource(UserLoginAPI, '/login')
    api.add_resource(StudentSummaryAPI, '/student_summary')
    api.init_app(app)
    return app
