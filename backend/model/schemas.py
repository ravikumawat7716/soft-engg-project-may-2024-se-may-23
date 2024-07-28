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


course_schema = {
    "bsonType": "object",
    "required": ["title", "description"],
    "properties": {
        "title": {"bsonType": "string", "description": "Title of the course"},
        "description": {"bsonType": "string", "description": "Description of the course"},
        "lectures": {
            "bsonType": "array",
            "description": "List of lectures in the course",
            "items": {
                "bsonType": "object",
                "required": ["title", "youtubeId"],
                "properties": {
                    "title": {"bsonType": "string", "description": "Title of the lecture"},
                    "youtubeId": {"bsonType": "string", "description": "YouTube ID of the lecture"},
                    "createdAt": {"bsonType": "date", "description": "Creation date of the lecture"},
                    "updatedAt": {"bsonType": "date", "description": "Last update date of the lecture"}
                }
            }
        },
        "assignments": {
            "bsonType": "array",
            "description": "List of assignments in the course",
            "items": {
                "bsonType": "object",
                "required": ["title", "description", "dueDate"],
                "properties": {
                    "title": {"bsonType": "string", "description": "Title of the assignment"},
                    "description": {"bsonType": "string", "description": "Description of the assignment"},
                    "dueDate": {"bsonType": "date", "description": "Due date of the assignment"},
                    "createdAt": {"bsonType": "date", "description": "Creation date of the assignment"},
                    "updatedAt": {"bsonType": "date", "description": "Last update date of the assignment"}
                }
            }
        },
        "programmingAssignments": {
            "bsonType": "array",
            "description": "List of programming assignments in the course",
            "items": {
                "bsonType": "object",
                "required": ["title", "description", "dueDate"],
                "properties": {
                    "title": {"bsonType": "string", "description": "Title of the programming assignment"},
                    "description": {"bsonType": "string", "description": "Description of the programming assignment"},
                    "dueDate": {"bsonType": "date", "description": "Due date of the programming assignment"},
                    "createdAt": {"bsonType": "date", "description": "Creation date of the programming assignment"},
                    "updatedAt": {"bsonType": "date", "description": "Last update date of the programming assignment"}
                }
            }
        },
        "createdAt": {"bsonType": "date", "description": "Creation date of the course"},
        "updatedAt": {"bsonType": "date", "description": "Last update date of the course"}
    }
}

chatbot_log_schema = {
    "bsonType": "object",
    "required": [
        "email",
        "timestamp",
        "chat",
    ],
    "properties": {
        "email": {
            "bsonType": "string",
            "description": "Unique identifier for the user (email)",
        },
        "timestamp": {
            "bsonType": "date",
            "description": "Timestamp when the chat session started",
        },
        "chat": {
            "bsonType": "array",
            "description": "List of chat messages",
            "items": {
                "bsonType": "object",
                "required": ["timestamp", "sender", "message"],
                "properties": {
                    "timestamp": {
                        "bsonType": "date",
                        "description": "Timestamp of the interaction",
                    },
                    "sender": {
                        "bsonType": "string",
                        "description": "Sender of the message (user or bot)",
                    },
                    "message": {
                        "bsonType": "string",
                        "description": "Content of the message",
                    },
                },
            },
        },
    },
}