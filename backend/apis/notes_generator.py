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
            model = data.get("model")

            if not topic or not model:
                return jsonify({"error": "Missing 'topic' or 'model' in request"}), 400

            prompt = f"Generate detailed notes on the following topic: {topic}"

            # Generate the notes using the LLM model
            notes = generate(prompt, model)

            return jsonify({"result": notes})
        except Exception as e:
            print("Error occurred:", str(e))
            return jsonify({"error": str(e)}), 500
