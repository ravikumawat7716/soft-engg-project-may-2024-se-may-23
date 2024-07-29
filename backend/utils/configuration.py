from instances.app import app
from instances.api import api
from flask_cors import CORS
from apis.login import UserLoginAPI
from apis.gen_ai.video_summary import Video_Summary
from apis.gen_ai.notes_generator import NotesGenerator
from apis.gen_ai.code_explanation import CodeExplantion
from apis.gen_ai.chatbot import ChatBot
from model.connection import create_collection


def create_app():
    print("Creating app...")
    CORS(app)
    create_collection()  # Create collections in the database

    api.add_resource(UserLoginAPI, "/login")

    # Gen AI APIs
    api.add_resource(Video_Summary, "/video_summary")  # Video Summary API
    api.add_resource(CodeExplantion, "/code_explanation")  # Code Explanation API
    api.add_resource(NotesGenerator, "/notes_generator")  # Notes Generator API
    api.add_resource(ChatBot, "/chatbot")  # under construction

    api.init_app(app)
    return app
