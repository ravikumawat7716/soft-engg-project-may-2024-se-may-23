from flask_restful import Resource
from flask import jsonify, request
from utils.LLM import generate


class NotesGenerator(Resource):
    def post(self):
        print("Notes generator API called")
        try:
            data = request.get_json()

            if data is None:
                return jsonify({"error": "Invalid JSON"}), 400

            print("Data received:", data)
            topic = data.get("topic")
            email = data.get("email")

            prompt = f"Generate detailed notes on the following topic:"

            # Generate the notes using the LLM model
            notes = generate(
                prompt=prompt,
                prompt_data=topic,
                method="notes_generator",
                email=email,
            )

            return jsonify({"result": notes})
        except Exception as e:
            print("Error occurred:", str(e))
            return jsonify({"error": str(e)}), 500

    def get(self):
        return jsonify({"message": "Welcome to the Notes Generator API!"})
