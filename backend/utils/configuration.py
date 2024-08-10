from flask_jwt_extended import JWTManager
from instances.app import app
from instances.api import api
from flask_cors import CORS
from apis.login import UserLoginAPI

from apis.gen_ai.video_summary import Video_Summary
from apis.gen_ai.notes_generator import NotesGenerator
from apis.gen_ai.code_explanation import CodeExplantion
from apis.gen_ai.chatbot import ChatBot

from apis.non_gen_ai.lectures import Lectures
from apis.non_gen_ai.assignment import Assignments
from apis.non_gen_ai.courses import Courses
from apis.non_gen_ai.programming_assignments import ProgrammingAssignment

from model.connection import create_collection


def create_app():
    print("Creating app...")
    CORS(app)
    create_collection()  # Create collections in the database

    # Configure your secret key for JWT
    app.config["JWT_SECRET_KEY"] = (
        "YOUR_SECRET_KEY"  # Replace with your actual secret key
    )
    jwt = JWTManager(app)

    # Authentication API
    api.add_resource(UserLoginAPI, "/login")

    # Gen AI APIs
    api.add_resource(Video_Summary, "/video_summary")  # Video Summary API
    api.add_resource(CodeExplantion, "/code_explanation")  # Code Explanation API
    api.add_resource(NotesGenerator, "/notes_generator")  # Notes Generator API
    api.add_resource(ChatBot, "/chatbot")  # Chatbot API

    # Non-Gen AI APIs

    api.add_resource(
        Lectures,
        "/lectures",
        "/lectures/<string:course_id>",
        "/lecture/<string:lecture_id>",  # New route to get a lecture by lecture_id
    )  # Lectures API

    api.add_resource(
        Assignments,
        "/assignments",
        "/assignments/<string:course_id>",
        "/assignment/<string:assignment_id>",
    )  # Assignments API

    api.add_resource(Courses, "/courses", "/courses/<string:course_id>")  # Courses API

    api.add_resource(
        ProgrammingAssignment,
        "/programming_assignments",
        "/programming_assignments/<string:course_id>",
        "/programming_assignment/<string:programming_assignment>",
    )  # Programming Assignments API

    api.init_app(app)
    return app
