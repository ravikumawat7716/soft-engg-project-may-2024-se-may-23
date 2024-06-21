# schemas.py

student_schema = {
    "bsonType": "object",
    "required": ["name", "email", "roll_no", "photo", "login_logs", "LLM_setting"],
    "properties": {
        "name": {"bsonType": "string", "description": "Name of the student"},
        "email": {"bsonType": "string", "description": "Email address of the student"},
        "roll_no": {"bsonType": "string", "description": "Roll number of the student"},
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

teacher_schema = {
    "bsonType": "object",
    "required": ["name", "email", "employee_id", "photo", "courses"],
    "properties": {
        "name": {"bsonType": "string", "description": "Name of the teacher"},
        "email": {"bsonType": "string", "description": "Email address of the teacher"},
        "employee_id": {
            "bsonType": "string",
            "description": "Employee ID of the teacher",
        },
        "photo": {
            "bsonType": "string",
            "description": "Photo URL or base64 string of the teacher",
        },
        "courses": {
            "bsonType": "array",
            "items": {"bsonType": "string"},
            "description": "Courses taught by the teacher",
        },
    },
}
