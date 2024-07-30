from flask import request, jsonify
from flask_restful import Resource
from datetime import datetime, timedelta
from flask_jwt_extended import create_access_token
from model.connection import mongo_handler

class UserLoginAPI(Resource):
    def post(self):
        data = request.json
        email = data.get("email")

        if not email:
            return {"error": "Email is required"}, 400

        existing_user = mongo_handler.get_document_by_field(
            "StudentCluster", "email", email
        )

        if existing_user:
            token = create_access_token(
                identity={"id": str(existing_user["_id"]), "role": existing_user.get("role", "student")},
                expires_delta=timedelta(days=90)
            )
            return {
                "_id": str(existing_user["_id"]),
                "name": existing_user.get("name", ""),
                "email": existing_user.get("email", ""),
                "roll_no": existing_user.get("roll_no", ""),
                "profileURL": existing_user.get("photo", ""),
                "role": existing_user.get("role", "student"),
                "token": token,
            }, 200
        else:
            required_fields = ["name", "email", "roll_no", "photo"]
            for field in required_fields:
                if field not in data:
                    return {"error": f"{field} is required"}, 400

            user_data = {
                "name": data["name"],
                "email": data["email"],
                "roll_no": data["roll_no"],
                "photo": data["photo"],
                "login_logs": [],
                "LLM_setting": {},
                "role": "student",
            }
            new_user_id = mongo_handler.insert_document("StudentCluster", user_data)

            if not new_user_id:
                return {"error": "Failed to insert new user"}, 500

            new_user = mongo_handler.get_document_by_field(
                "StudentCluster", "_id", new_user_id
            )

            if not new_user:
                return {"error": "Failed to retrieve new user"}, 500

            token = create_access_token(
                identity={"id": str(new_user["_id"]), "role": new_user.get("role", "student")},
                expires_delta=timedelta(days=90)
            )

            return {
                "_id": str(new_user["_id"]),
                "name": new_user.get("name", ""),
                "email": new_user.get("email", ""),
                "roll_no": new_user.get("roll_no", ""),
                "profileURL": new_user.get("photo", ""),
                "role": new_user.get("role", "student"),
                "token": token,
            }, 201
