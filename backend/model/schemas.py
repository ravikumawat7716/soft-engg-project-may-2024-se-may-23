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


chatbot_log_schema = {
    "bsonType": "object",
    "required": [
        "email",
        "timestamp",
        "chat",
        "model",
    ],
    "properties": {
        "email": {
            "bsonType": "string",
            "description": "Unique identifier for the user (email)",
        },
        "timestamp": {
            "bsonType": "string",
            "description": "Timestamp when the chat session started",
        },
        "chat": {
            "bsonType": "array",
            "description": "List of chat messages",
            "items": {
                "bsonType": "object",
                "required": ["timestamp", "role", "content"],
                "properties": {
                    "timestamp": {
                        "bsonType": "string",
                        "description": "Timestamp of the interaction",
                    },
                    "role": {
                        "bsonType": "string",
                        "description": "Sender of the message (user or bot)",
                    },
                    "content": {
                        "bsonType": "string",
                        "description": "Content of the message",
                    },
                },
            },
        },
        "model": {
            "bsonType": "string",
            "description": "Model used for the chat session",
        },
    },
}

assignment_schema = {
    "bsonType": "object",
    "required": ["questions", "courseId"],
    "properties": {
        "questions": {
            "bsonType": "array",
            "description": "List of questions in the assignment",
        },
        "courseId": {
            "bsonType": "objectId",
            "description": "Reference to the associated course",
        },
        "createdAt": {
            "bsonType": "date",
            "description": "Creation timestamp",
        },
        "updatedAt": {
            "bsonType": "date",
            "description": "Last update timestamp",
        },
    },
}


courses_schema = {
    "bsonType": "object",
    "required": ["title", "description"],
    "properties": {
        "title": {"bsonType": "string", "description": "Title of the course"},
        "description": {
            "bsonType": "string",
            "description": "Description of the course",
        },
        "lectures": {
            "bsonType": "array",
            "description": "List of lecture references",
            "items": {
                "bsonType": "objectId",
                "description": "Reference to a Lecture document",
            },
        },
        "assignments": {
            "bsonType": "array",
            "description": "List of assignment references",
            "items": {
                "bsonType": "objectId",
                "description": "Reference to an Assignment document",
            },
        },
        "p_assignments": {
            "bsonType": "array",
            "description": "List of programming assignment references",
            "items": {
                "bsonType": "objectId",
                "description": "Reference to a PA document",
            },
        },
        "createdAt": {"bsonType": "date", "description": "Creation timestamp"},
        "updatedAt": {"bsonType": "date", "description": "Last update timestamp"},
    },
}


lecture_schema = {
    "bsonType": "object",
    "required": ["title", "youtubeId", "courseId"],
    "properties": {
        "title": {"bsonType": "string", "description": "Title of the lecture"},
        "youtubeId": {
            "bsonType": "string",
            "description": "YouTube video ID for the lecture",
        },
        "courseId": {
            "bsonType": "objectId",
            "description": "Reference to the associated course",
        },
        "createdAt": {"bsonType": "date", "description": "Creation timestamp"},
        "updatedAt": {"bsonType": "date", "description": "Last update timestamp"},
    },
}


programming_assignment_schema = {
    "bsonType": "object",
    "required": ["title", "testCases", "courseId"],
    "properties": {
        "title": {
            "bsonType": "string",
            "description": "Title of the programming assignment",
        },
        "testCases": {
            "bsonType": "array",
            "description": "List of testCases in the assignment",
        },
        "courseId": {
            "bsonType": "objectId",
            "description": "Reference to the associated course",
        },
        "createdAt": {"bsonType": "date", "description": "Creation timestamp"},
        "updatedAt": {"bsonType": "date", "description": "Last update timestamp"},
    },
}
