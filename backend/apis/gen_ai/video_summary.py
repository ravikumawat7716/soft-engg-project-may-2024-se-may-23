from flask_restful import Resource
from flask import jsonify, request
from utils.LLM import generate
from youtube_transcript_api import YouTubeTranscriptApi


# Function to get transcript from YouTube video
def get_youtube_transcript(video_url):
    try:
        video_id = video_url.split("v=")[-1]  # Extract the video ID from the URL
        transcript_list = YouTubeTranscriptApi.list_transcripts(video_id)

        # Iterate over available transcripts to find the one in English (or another desired language)
        transcript = transcript_list.find_transcript(["en"])
        captions = transcript.fetch()

        # Combine the captions into a single string
        full_text = " ".join([caption["text"] for caption in captions])
        return full_text
    except Exception as e:
        return f"An error occurred: {e}"


class Video_Summary(Resource):
    def post(self):
        print("Video Summary API called")
        try:
            data = request.get_json()

            if data is None:
                return jsonify({"error": "Invalid JSON"}), 400

            link = data.get("link")
            email = data.get("email")

            if not link:
                return jsonify({"error": "Missing 'link' in request"}), 400

            prompt_data = get_youtube_transcript(link)
            prompt = "Summarize the video caption  \n \n "

            # Generate the summary using the LLM model
            summary = generate(
                prompt=prompt,
                prompt_data=prompt_data,
                method="video_summary",
                email=email,
            )

            return jsonify({"result": summary})

        except Exception as e:
            print("Error occurred:", str(e))
            return jsonify({"error": str(e)}), 500

    def get(self):
        return jsonify({"message": "Welcome to the Video Summary API!"})
