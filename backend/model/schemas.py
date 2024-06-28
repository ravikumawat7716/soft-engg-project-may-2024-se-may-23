# schemas.py

student_schema = {
    "bsonType": "object",
    "required": ["firstname", "lastname", "email", "roll_no", "profileURL"],
    "properties": {
        "firstname": {"bsonType": "string", "description": "First name of the user"},
        "lastname": {"bsonType": "string", "description": "Last name of the user"},
        "email": {"bsonType": "string", "description": "Email address of the user"},
        "roll_no": {"bsonType": "string", "description": "Roll number of the user"},
        "profileURL": {
            "bsonType": "string",
            "description": "Profile photo URL of the user",
        },
        "role": {
            "bsonType": "string",
            "description": "Role of the user",
            "default": "student",
        },
    },
}

course_schema = {
    "bsonType": "object",
    "required": ["course_title", "course_description", "lectures", "assignments", "pa"],
    "properties": {
        "course_title": {"bsonType": "string", "description": "Title of the course"},
        "course_description": {
            "bsonType": "string",
            "description": "Description of the course",
        },
        "lectures": {
            "bsonType": "array",
            "items": {
                "bsonType": "object",
                "properties": {
                    "lecture_id": {
                        "bsonType": "string",
                        "description": "ID of the lecture",
                    },
                    "lecture_title": {
                        "bsonType": "string",
                        "description": "Title of the lecture",
                    },
                },
                "required": ["lecture_id", "lecture_title"],
            },
            "description": "List of lectures",
        },
        "assignments": {
            "bsonType": "array",
            "items": {"bsonType": "string", "description": "ID of the assignment"},
            "description": "List of assignment IDs",
        },
        "pa": {
            "bsonType": "array",
            "items": {"bsonType": "string", "description": "ID of the PA"},
            "description": "List of PA IDs",
        },
    },
}


lecture_schema = {
    "bsonType": "object",
    "required": ["lecture_title", "youtube_id"],
    "properties": {
        "lecture_title": {"bsonType": "string", "description": "Title of the lecture"},
        "youtube_id": {
            "bsonType": "string",
            "description": "YouTube ID of the lecture",
        },
    },
}


llm_log_schema = {
    "bsonType": "object",
    "required": ["student_id", "lecture_id", "llm_type", "query", "response"],
    "properties": {
        "student_id": {"bsonType": "string", "description": "ID of the student"},
        "lecture_id": {"bsonType": "string", "description": "ID of the lecture"},
        "llm_type": {"bsonType": "string", "description": "Type of the LLM used"},
        "query": {"bsonType": "string", "description": "Query asked by the student"},
        "response": {"bsonType": "string", "description": "Response given by the LLM"},
    },
}
