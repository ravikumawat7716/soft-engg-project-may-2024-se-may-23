# -*- coding: utf-8 -*-

from flask_restful import Resource
from flask import jsonify, request
from instances import api


class CreateAssignmentAPI(Resource):
    def post(self):
        try:
            return jsonify({"message":"Create a new assignment"})

        except Exception as e:
            return jsonify({"error": str(e)}), 500  # Proper error handling
        
        
class GetCourseAssignmentsAPI(Resource):
    def get(self, courseId):
        try:
            return jsonify({"message":"Returns all assignments for a given course"})

        except Exception as e:
            return jsonify({"error": str(e)}), 500  # Proper error handling
        
    
class GetAssignmentAPI(Resource):
    def get(self, courseId, assignmentId):
        try:
            return jsonify({"message":"Returns specific assignment for the given course"})

        except Exception as e:
            return jsonify({"error": str(e)}), 500  # Proper error handling
