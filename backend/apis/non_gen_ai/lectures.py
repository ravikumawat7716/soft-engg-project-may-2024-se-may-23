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
            return Response(
                response=json.dumps({"error": "Course not found!"}),
                status=404,
                mimetype="application/json",
            )

        lecture_id = mongo_handler.insert_document(
            "LecturesCluster",
            {"title": title, "youtubeId": youtubeId, "courseId": ObjectId(courseId)},
        )

        # update course with lecture id
        course["lectures"].append(lecture_id)
        mongo_handler.update_document(
            "CoursesCluster", "_id", ObjectId(courseId), course
        )

        return Response(
            response=json.dumps({"message": "Lecture added successfully!"}),
            status=200,
            mimetype="application/json",
        )

    def get(self, lecture_id=None, course_id=None):
        if lecture_id:
            if isinstance(lecture_id, str):
                lecture_id = ObjectId(lecture_id)
            lecture = mongo_handler.get_document_by_field(
                "LecturesCluster", "_id", lecture_id
            )

            if lecture:
                return Response(
                    response=json.dumps(lecture, cls=JSONEncoder),
                    status=200,
                    mimetype="application/json",
                )
            return Response(
                response=json.dumps({"error": "Lecture not found!"}),
                status=404,
                mimetype="application/json",
            )

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
