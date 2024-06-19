from flask_restful import Resource
from flask import jsonify


def student_summary():
    try:
        # sample summary data for student
        summary = {
            "name": "John Doe",
            "age": 30,
            "courses": ["Math", "Science", "English"],
            "grades": [90, 85, 95],
        }

        return (
            jsonify(summary),
            200,
        )

    except Exception as e:
        return jsonify({"error": str(e)}), 500  # Proper error handling
