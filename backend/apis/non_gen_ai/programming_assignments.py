from flask_restful import Resource
from flask import jsonify, request, Response
from model.connection import mongo_handler, JSONEncoder
import json
from bson import ObjectId


class ProgrammingAssignment(Resource):
    def post(self):
        # "required": ["title", "testCases", "courseId"],
        data = request.get_json()
        title = data.get("title")
        testCases = data.get("testCases")
        courseId = data.get("courseId")

        if not title or not testCases or not courseId:
            return Response(
                response=json.dumps(
                    {"error": "Please provide title, testCases and courseId!"}
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

        programming_assignment_id = mongo_handler.insert_document(
            "ProgrammingAssignmentsCluster",
            {"title": title, "testCases": testCases, "courseId": ObjectId(courseId)},
        )

        # update course with programming assignment id
        course["p_assignments"].append(programming_assignment_id)
        mongo_handler.update_document(
            "CoursesCluster", "_id", ObjectId(courseId), course
        )

        return Response(
            response=json.dumps(
                {"message": "Programming Assignment added successfully!"}
            ),
            status=200,
            mimetype="application/json",
        )

    def get(self, course_id=None, programming_assignment=None):

        if course_id:
            if isinstance(course_id, str):
                course_id = ObjectId(course_id)
            course = mongo_handler.get_document_by_field(
                "CoursesCluster", "_id", course_id
            )

            if course:
                programming_assignments = []
                for p_assignment_id in course["p_assignments"]:
                    programming_assignment = mongo_handler.get_document_by_field(
                        "ProgrammingAssignmentsCluster", "_id", p_assignment_id
                    )
                    programming_assignments.append(programming_assignment)

                return Response(
                    response=json.dumps(programming_assignments, cls=JSONEncoder),
                    status=200,
                    mimetype="application/json",
                )
            return Response(
                response=json.dumps({"error": "Course not found!"}),
                status=404,
                mimetype="application/json",
            )

        if programming_assignment:
            if isinstance(programming_assignment, str):
                programming_assignment = ObjectId(programming_assignment)
            programming_assignment = mongo_handler.get_document_by_field(
                "ProgrammingAssignmentsCluster", "_id", programming_assignment
            )

            if programming_assignment:
                return Response(
                    response=json.dumps(programming_assignment, cls=JSONEncoder),
                    status=200,
                    mimetype="application/json",
                )
            return Response(
                response=json.dumps({"error": "Programming Assignment not found!"}),
                status=404,
                mimetype="application/json",
            )

        programming_assignments = mongo_handler.get_all_documents(
            "ProgrammingAssignmentsCluster"
        )
        return Response(
            response=json.dumps(programming_assignments, cls=JSONEncoder),
            status=200,
            mimetype="application/json",
        )
