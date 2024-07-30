from flask_restful import Resource
from flask import jsonify, request
from utils.LLM import LLMChatBot
from model.connection import mongo_handler
from datetime import datetime


class ChatBot(Resource):
    def post(self):
        print("ChatBot API called")
        try:
            data = request.get_json()

            chat = data.get("chat")
            email = data.get("email")
            print("Chat:", chat)
            chat_id = data.get("chat_id")

            print("Chat ID:", chat_id)
            print("Email:", email)

            if not chat or not email:
                return jsonify({"error": "Missing 'chat' or 'email' in request"}), 400

            chats = LLMChatBot(chat=chat, email=email, chat_id=chat_id)
            print("Chat response:", chats)

            return chats, 200

        except Exception as e:
            print("Error occurred:", str(e))
            return jsonify({"error": str(e)}), 500

    def get(self):
        return jsonify({"message": "Welcome to the Chat Bot API!"})
