from flask_restful import Resource
from flask import jsonify, request
from utils.LLM import ChatBot


class Video_Summary(Resource):
    def post(self):
        print("ChatBot API called")
        try:
            data = request.get_json()

            if data is None:
                return jsonify({"error": "Invalid JSON"}), 400

            print("Data received:", data)
            chat = data.get("chats")
            model = data.get("model")
            # [{'role': 'user', 'content': 'Why is the sky blue?'}]

            if not chat or not model:
                return jsonify({"error": "Missing 'chat' or 'model' in request"}), 400

            # Generate the summary using the LLM model
            summary = generate(prompt, model)

            return jsonify({"result": summary})
        except Exception as e:
            print("Error occurred:", str(e))
            return jsonify({"error": str(e)}), 500
