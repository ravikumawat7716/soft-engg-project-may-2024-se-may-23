from flask_restful import Resource
from flask import jsonify, request
from utils.LLM import generate


class Gen_AI(Resource):
    def post(self):
        print("API called")
        try:
            data = request.get_json()

            if data is None:
                return jsonify({"error": "Invalid JSON"}), 400

            print("Data received:", data)
            prompt = data.get("prompt")
            model = data.get("model")

            if not prompt or not model:
                return jsonify({"error": "Missing 'prompt' or 'model' in request"}), 400

            print("Prompt:", prompt)
            print("Model:", model)

            # Generate the summary using the LLM model
            summary = generate(prompt, model)

            return jsonify({"result": summary})
        except Exception as e:
            print("Error occurred:", str(e))
            return jsonify({"error": str(e)}), 500

    def get(self):
        return jsonify({"message": "Welcome to the Gen AI API!"})
