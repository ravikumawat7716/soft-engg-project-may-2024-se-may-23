from flask_restful import Resource
from flask import jsonify , json
from instances import api


class StudentSummaryAPI(Resource):
    def get(self):
        try:
            # Sample summary data for student
            summary = {
                "name": "John Doe",
                "age": 30,
                "courses": ["Math", "Science", "English"],
                "grades": [90, 85, 95],
            }
            
            # Convert the data types to JSON serializable ones
            summary["courses"] = json.dumps(summary["courses"])
            summary["grades"] = json.dumps(summary["grades"])
            
            return summary, 200
        except Exception as e:
            return jsonify({"error": str(e)}), 500  # Proper error handling

# # Add the StudentSummaryAPI resource to the API
# api.add_resource(StudentSummaryAPI, '/student_summary')
