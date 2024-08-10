from flask_restful import Resource
from flask import jsonify, request, Response
from model.connection import mongo_handler, JSONEncoder
import json
from bson import ObjectId


class Assignments(Resource):
    def post(self):
        data = request.get_json()

        # "required": ["questions", "courseId"],

        questions = data.get("questions")
        courseId = data.get("courseId")

        if not questions or not courseId:
            return Response(
                response=json.dumps(
                    {"error": "Please provide questions and courseId!"}
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
        assignment_id = mongo_handler.insert_document(
            "AssignmentsCluster",
            {"questions": questions, "courseId": ObjectId(courseId)},
        )

        # update course with assignment id
        course["assignments"].append(assignment_id)
        mongo_handler.update_document(
            "CoursesCluster", "_id", ObjectId(courseId), course
        )

        return Response(
            response=json.dumps({"message": "Assignment added successfully!"}),
            status=200,
            mimetype="application/json",
        )

    def get(self, course_id=None, assignment_id=None):

        if course_id:
            if isinstance(course_id, str):
                course_id = ObjectId(course_id)
            course = mongo_handler.get_document_by_field(
                "CoursesCluster", "_id", course_id
            )

            if course:
                assignments = []
                for assignment_id in course["assignments"]:
                    assignment = mongo_handler.get_document_by_field(
                        "AssignmentsCluster", "_id", assignment_id
                    )
                    assignments.append(assignment)
                return Response(
                    response=json.dumps(assignments, cls=JSONEncoder),
                    status=200,
                    mimetype="application/json",
                )
            return Response(
                response=json.dumps({"error": "Course not found!"}),
                status=404,
                mimetype="application/json",
            )

        if assignment_id:
            if isinstance(assignment_id, str):
                assignment_id = ObjectId(assignment_id)
            assignment = mongo_handler.get_document_by_field(
                "AssignmentsCluster", "_id", assignment_id
            )

            if assignment:
                return Response(
                    response=json.dumps(assignment, cls=JSONEncoder),
                    status=200,
                    mimetype="application/json",
                )
            return Response(
                response=json.dumps({"error": "Assignment not found!"}),
                status=404,
                mimetype="application/json",
            )

        assignments = mongo_handler.get_all_documents("AssignmentsCluster")
        return Response(
            response=json.dumps(assignments, cls=JSONEncoder),
            status=200,
            mimetype="application/json",
        )
