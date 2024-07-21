from instances.app import app
from instances.api import api
from flask_cors import CORS
from apis.login import UserLoginAPI
from apis.summary import StudentSummaryAPI
from apis.gen_ai import Gen_AI
from apis.video_summary import Video_Summary


def create_app():
    print("Creating app...")
    CORS(app)

    api.add_resource(UserLoginAPI, "/login")
    api.add_resource(StudentSummaryAPI, "/student_summary")

    # Adding  the Gen AI
    api.add_resource(Gen_AI, "/gen_ai")

    # Adding the notes generator API
    # api.add_resource(NotesGenerator, "/notes_generator")

    # Adding the Video Summary API
    api.add_resource(Video_Summary, "/video_summary")

    # AI chatbot
    # api.add_resource(ChatBot, "/chatbot")

    api.init_app(app)
    return app
