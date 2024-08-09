from flask_restful import Resource
from flask import request, Response
from model.connection import mongo_handler, JSONEncoder
import json
from bson import ObjectId


class Courses(Resource):
    def post(self):
        data = request.get_json()
        title = data.get("title")
        description = data.get("description")

        if not title or not description:
            return Response(
                response=json.dumps({"error": "Please provide title and description!"}),
                status=400,
                mimetype="application/json",
            )

        course_id = mongo_handler.insert_document(
            "CoursesCluster",
            {
                "title": title,
                "description": description,
                "lectures": [],
                "assignments": [],
                "p_assignments": [],
            },
        )

        return Response(
            response=json.dumps({"message": "Lecture added successfully!"}),
            status=200,
            mimetype="application/json",
        )

    def get(self, course_id=None, lecture_id=None):
        # return jsonify({"message": "Welcome to the Chat Bot API!"})
        if course_id:
            if isinstance(course_id, str):
                course_id = ObjectId(course_id)
            course = mongo_handler.get_document_by_field(
                "CoursesCluster", "_id", course_id
            )

            if course:
                courses_json = json.dumps(course, cls=JSONEncoder)
                return Response(
                    response=courses_json, status=200, mimetype="application/json"
                )
            return Response(
                response=json.dumps({"error": "Course not found!"}),
                status=404,
                mimetype="application/json",
            )

        courses = mongo_handler.get_all_documents("CoursesCluster")
        courses_json = json.dumps(courses, cls=JSONEncoder)

        return Response(response=courses_json, status=200, mimetype="application/json")

    def delete(self, course_id):
        if isinstance(course_id, str):
            course_id = ObjectId(course_id)

        course = mongo_handler.get_document_by_field("CoursesCluster", "_id", course_id)

        if not course:
            return Response(
                response=json.dumps({"error": "Course not found!"}),
                status=404,
                mimetype="application/json",
            )

        mongo_handler.delete_document("CoursesCluster", "_id", course_id)

        return Response(
            response=json.dumps({"message": "Course deleted successfully!"}),
            status=200,
            mimetype="application/json",
        )
