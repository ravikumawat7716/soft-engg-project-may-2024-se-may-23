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
