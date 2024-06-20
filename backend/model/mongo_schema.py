from pymongo import MongoClient
from pymongo.errors import DuplicateKeyError
from bson.objectid import ObjectId


class MongoDBHandler:
    def __init__(self, uri: str, db_name: str):
        self.client = MongoClient(uri)
        self.db = self.client[db_name]
        self.collection = self.db["StudentCluster"]

    def create_student_cluster(self):
        student_cluster_schema = {
            "bsonType": "object",
            "required": [
                "name",
                "email",
                "roll_no",
                "photo",
                "login_logs",
                "LLM_setting",
            ],
            "properties": {
                "name": {"bsonType": "string", "description": "Name of the student"},
                "email": {
                    "bsonType": "string",
                    "description": "Email address of the student",
                },
                "roll_no": {
                    "bsonType": "string",
                    "description": "Roll number of the student",
                },
                "photo": {
                    "bsonType": "string",
                    "description": "Photo URL or base64 string of the student",
                },
                "login_logs": {
                    "bsonType": "array",
                    "items": {
                        "bsonType": "object",
                        "properties": {
                            "login_time": {
                                "bsonType": "date",
                                "description": "Timestamp of the login",
                            },
                            "logout_time": {
                                "bsonType": "date",
                                "description": "Timestamp of the logout",
                            },
                            "ip_address": {
                                "bsonType": "string",
                                "description": "IP address used for login",
                            },
                        },
                        "required": ["login_time"],
                    },
                    "description": "Logs of student login activities",
                },
                "LLM_setting": {
                    "bsonType": "object",
                    "description": "Settings for the student's language model",
                    "additionalProperties": True,
                },
            },
        }

        # Check if the collection already exists
        if "StudentCluster" not in self.db.list_collection_names():
            self.db.create_collection(
                "StudentCluster", validator={"$jsonSchema": student_cluster_schema}
            )
            print("Collection created with schema validation.")
        else:
            print("Collection already exists.")

    def create_student(self, student_data: dict):
        try:
            self.collection.insert_one(student_data)
            print("Student created successfully.")
        except DuplicateKeyError:
            print("Student with this email already exists.")

    def get_student_by_email(self, email: str):
        student = self.collection.find_one({"email": email})
        if student:
            return student
        else:
            print("Student not found.")
            return None

    def update_student(self, email: str, update_data: dict):
        result = self.collection.update_one({"email": email}, {"$set": update_data})
        if result.matched_count > 0:
            print("Student updated successfully.")
        else:
            print("Student not found.")

    def close_connection(self):
        self.client.close()
