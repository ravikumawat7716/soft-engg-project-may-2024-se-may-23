from flask_jwt_extended import JWTManager
from instances.app import app
from instances.api import api
from flask_cors import CORS
from apis.courses import Course, AllCourses, CourseById
from apis.login import UserLoginAPI
from apis.assignments import CreateAssignmentAPI
from apis.assignments import GetCourseAssignmentsAPI
from apis.assignments import GetAssignmentAPI
from apis.gen_ai.video_summary import Video_Summary
from apis.gen_ai.notes_generator import NotesGenerator
from apis.gen_ai.code_explanation import CodeExplantion
from apis.gen_ai.chatbot import ChatBot
from model.connection import create_collection

def create_app():
    print("Creating app...")
    CORS(app)
    create_collection()  # Create collections in the database

    # Configure your secret key for JWT
    app.config['JWT_SECRET_KEY'] = 'YOUR_SECRET_KEY'  # Replace with your actual secret key
    jwt = JWTManager(app)

    # Authentication API
    api.add_resource(UserLoginAPI, "/login")

    # Course APIs
    api.add_resource(Course, "/course")
    api.add_resource(AllCourses, "/courses")
    api.add_resource(CourseById, "/course")

    # Assignment APIs
    api.add_resource(CreateAssignmentAPI, "/create_assignment")
    api.add_resource(GetCourseAssignmentsAPI, "/get_course_assignments/<string:courseId>")
    api.add_resource(GetAssignmentAPI, "/get_assignment/<string:courseId>/<string:assignmentId>")

    # Gen AI APIs
    api.add_resource(Video_Summary, "/video_summary")  # Video Summary API
    api.add_resource(CodeExplantion, "/code_explanation")  # Code Explanation API
    api.add_resource(NotesGenerator, "/notes_generator")  # Notes Generator API
    api.add_resource(ChatBot, "/chatbot")  # under construction

    api.init_app(app)
    return app


