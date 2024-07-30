from flask import jsonify, request
from flask_restful import Resource
from datetime import datetime
from model.connection import mongo_handler
from bson.json_util import dumps, ObjectId

class Course(Resource):
    def post(self):
        data = request.get_json()
        title = data.get('title')
        description = data.get('description')

        if not title or not description:
            return {"message": "Title and description are required"}, 400

        new_course = {
            "title": title,
            "description": description,
            "lectures": [],
            "assignments": [],
            "programmingAssignments": [],
            "createdAt": datetime.utcnow(),
            "updatedAt": datetime.utcnow()
        }
        course_id = mongo_handler.insert_document("CourseCluster", new_course)
        return jsonify({"course_id": str(course_id)})

    def put(self):
        data = request.get_json()
        course_id = data.get('course_id')
        title = data.get('title')
        description = data.get('description')

        if not course_id or not title or not description:
            return {"message": "Course ID, title, and description are required"}, 400

        update_data = {
            "title": title,
            "description": description,
            "updatedAt": datetime.utcnow()
        }

        updated_course = mongo_handler.update_document("CourseCluster", "_id", ObjectId(course_id), update_data)
        if updated_course:
            return {"message": "Course updated successfully"}, 200
        return {"message": "Course not found"}, 404

class AllCourses(Resource):
    def get(self):
        courses = mongo_handler.get_all_documents("CourseCluster")
        for course in courses:
            course["_id"] = str(course["_id"])
        return jsonify(courses)

class CourseById(Resource):
    def get(self, course_id):
        # data = request.get_json()
        # course_id = data.get('course_id')
        print(course_id)
        
        if not course_id:
            return {"message": "Course ID is required"}, 400

        try:
            course = mongo_handler.get_document_by_field("CourseCluster", "_id", ObjectId(course_id))
            course["_id"] = str(course["_id"])
            print(course)

            # course = mongo_handler.get_document_by_field("CourseCluster", "_id", course_id)
        except Exception as e:
            return {"message": "Invalid course ID format"}, 400
        
        if course:
            return jsonify(course)
        return {"message": "Course not found"}, 404
