# -*- coding: utf-8 -*-

from flask_restful import Resource
from flask import jsonify, request
from instances import api
from model.connection import mongo_handler
from datetime import datetime
from bson.json_util import dumps, ObjectId



class CreateAssignmentAPI(Resource):
    def post(self):
        data = request.get_json()
        courseId = data.get('courseId')
        assignmentName = data.get('assignmentName')
        description = data.get('description')

        if not assignmentName or not description or not courseId :
            return {"message": "assignmentName, description and courseId are required"}, 400

        new_assignment = {
            "assignmentName": assignmentName,
            "description": description,
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        }
               
        try:
            course = mongo_handler.get_document_by_field("CourseCluster", "_id", ObjectId(courseId))
            if course:
                updated_assignments = course["assignments"]
                updated_assignments.add(new_assignment)
                update_data = {
                    "assignments": updated_assignments,
                    "updatedAt": datetime.utcnow()
                }
                mongo_handler.update_document("CourseCluster", "_id", ObjectId(courseId), update_data)
                return jsonify({"message": "Assignment created successfully."})
            else:
                return {"message": "Invalid course ID format"}, 400

        except Exception as e:
            return {"message": "Invalid course ID format"}, 400
      
        
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
