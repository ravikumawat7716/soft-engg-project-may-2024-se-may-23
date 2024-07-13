from instances.app import app
from instances.api import api
from flask_cors import CORS
from apis.login import UserLoginAPI
from apis.summary import StudentSummaryAPI
from apis.gen_ai import Gen_AI


def create_app():
    print("Creating app...")
    CORS(app)
    api.add_resource(UserLoginAPI, "/login")
    api.add_resource(StudentSummaryAPI, "/student_summary")

    # Adding  the Gen AI
    api.add_resource(Gen_AI, "/gen_ai")

    api.init_app(app)
    return app
