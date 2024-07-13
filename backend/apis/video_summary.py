from flask_restful import Resource
from flask import jsonify, request
from utils.LLM import generate
from utils.caption_generator import get_youtube_transcript


class Video_Summary(Resource):
    def post(self):
        print("Video Summary API called")
        try:
            data = request.get_json()

            if data is None:
                return jsonify({"error": "Invalid JSON"}), 400

            print("Data received:", data)
            link = data.get("link")
            model = data.get("model")

            if not link or not model:
                return jsonify({"error": "Missing 'link' or 'model' in request"}), 400

            prompt = (
                get_youtube_transcript(link) + "\n \n   Summarize the video caption"
            )

            # Generate the summary using the LLM model
            summary = generate(prompt, model)

            return jsonify({"result": summary})
        except Exception as e:
            print("Error occurred:", str(e))
            return jsonify({"error": str(e)}), 500
