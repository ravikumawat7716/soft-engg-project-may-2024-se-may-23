from flask_restful import Resource
from flask import jsonify, request, Response
from model.connection import mongo_handler, JSONEncoder
import json
from bson import ObjectId


class Lectures(Resource):
    def post(self):
        # "required": ["title", "youtubeId", "courseId"]

        data = request.get_json()
        title = data.get("title")
        youtubeId = data.get("youtubeId")
        courseId = data.get("courseId")

        if not title or not youtubeId or not courseId:
            return Response(
                response=json.dumps(
                    {"error": "Please provide title, youtubeId and courseId!"}
                ),
                status=400,
                mimetype="application/json",
            )

        # check if course exists

        course = mongo_handler.get_document_by_field(
            "CoursesCluster", "_id", ObjectId(courseId)
        )
        if not course:
            print("Line 32 Course not found!")
            return Response(
                response=json.dumps({"error": "Course not found!"}),
                status=404,
                mimetype="application/json",
            )

        print("Line 38 Course found!")

        lecture_id = mongo_handler.insert_document(
            "LecturesCluster",
            {"title": title, "youtubeId": youtubeId, "courseId": ObjectId(courseId)},
        )

        print("Line 44 Lecture added successfully!")
        # update course with lecture id
        course["lectures"].append(lecture_id)
        mongo_handler.update_document(
            "CoursesCluster", "_id", ObjectId(courseId), course
        )

        print("Line 50 Course updated with lecture id!")
        return Response(
            response=json.dumps({"message": "Lecture added successfully!"}),
            status=200,
            mimetype="application/json",
        )

    def get(self, course_id=None, lecture_id=None):

        if course_id:
            if isinstance(course_id, str):
                course_id = ObjectId(course_id)
            course = mongo_handler.get_document_by_field(
                "CoursesCluster", "_id", course_id
            )

            if course:
                lectures = []
                for lecture_id in course["lectures"]:
                    lecture = mongo_handler.get_document_by_field(
                        "LecturesCluster", "_id", lecture_id
                    )
                    lectures.append(lecture)
                return Response(
                    response=json.dumps(lectures, cls=JSONEncoder),
                    status=200,
                    mimetype="application/json",
                )
            return Response(
                response=json.dumps({"error": "Course not found!"}),
                status=404,
                mimetype="application/json",
            )

        lectures = mongo_handler.get_all_documents("LecturesCluster")
        return Response(
            response=json.dumps(lectures, cls=JSONEncoder),
            status=200,
            mimetype="application/json",
        )
