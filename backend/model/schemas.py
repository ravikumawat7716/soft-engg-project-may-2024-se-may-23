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


llm_log_schema = {
    "bsonType": "object",
    "required": [
        "email",
        "model",
        "prompt",
        "prompt_data",
        "response",
        "method",
        "timestamp",
    ],
    "properties": {
        "email": {"bsonType": "string", "description": "ID of the student"},
        "model": {"bsonType": "string", "description": "Type of the LLM used"},
        "prompt": {"bsonType": "string", "description": "Prompt given to the LLM"},
        "prompt_data": {"bsonType": "string", "description": "Data given to the LLM"},
        "response": {"bsonType": "string", "description": "Response given by the LLM"},
        "method": {
            "bsonType": "string",
            "description": "Method used to generate the response",
        },
        "timestamp": {"bsonType": "date", "description": "Timestamp of the log"},
    },
}
