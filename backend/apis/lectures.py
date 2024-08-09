from flask import request, jsonify
from flask_restful import Resource
from bson.objectid import ObjectId
from datetime import datetime
from model.connection import mongo_handler

class AddLectureAPI(Resource):
    def post(self):
        try:
            # Get the JSON data from the request
            data = request.json

            # Extract the course ID, lecture title, and YouTube ID from the data
            course_id = data.get('courseId')
            lecture_title = data.get('lectureTitle')
            youtube_id = data.get('youtubeId')  # Changed to youtubeId
            print(course_id, lecture_title, youtube_id)

            if not all([course_id, lecture_title, youtube_id]):
                return jsonify({"error": "Missing data in request"}), 400

            # Create the lecture object
            lecture = {
                "title": lecture_title,
                "youtubeId": youtube_id,  # Changed to youtubeId
                "createdAt": datetime.utcnow()
            }

            # Update the document by pushing the new lecture into the lectures array
            result = mongo_handler.db["CourseCluster"].update_one(
                {"_id": ObjectId(course_id)},
                {"$push": {"lectures": lecture}}
            )

            print("it is working fine..................")
            # print(result)
            # print(type(result))
            # print(result.acknowledged)
            # print(result.nModified)

            if result.matched_count > 0 and result.modified_count > 0:
                return {"message": "Lecture added successfully"}, 200
            elif result.matched_count > 0:
                return {"error": "Lecture not added, no changes made"}, 304
            else:
                return {"error": "Course not found"}, 404

        except Exception as e:
            # Returning the error message as a JSON response
            return {"error": str(e)}, 500

# class GetLectureAPI(Resource):
#     def get(self, course_id, youtube_id):
#         try:
#             # Fetch the course document from the collection
#             course = mongo_handler.db["CourseCluster"].find_one(
#                 {"_id": ObjectId(course_id), "lectures.youtubeId": youtube_id},
#                 {"lectures.$": 1, "_id": 0}  # Project only the specific lecture matching the youtubeId
#             )
            
#             # if course and course.get("lectures"):
#             #     return {"lecture": course["lectures"][0]}, 200
#             # else:
#             #     return {"error": "Lecture not found"}, 404

#         except Exception as e:
#             # Returning the error message as a JSON response
#             return {"error": str(e)}, 500
