import ollama

from model.connection import mongo_handler
from datetime import datetime

from bson import ObjectId

model = "qwen2:0.5b"


def generate(method, prompt, prompt_data, email):

    prompt_query = f"{prompt + prompt_data}"

    result = ollama.generate(
        model=model,
        prompt=prompt_query,
    )

    log = {
        "email": email,
        "model": model,
        "prompt": prompt,
        "prompt_data": prompt_data,
        "response": result["response"],
        "method": method,
        "timestamp": datetime.now(),
    }

    mongo_handler.insert_document("LLMLogs", log)

    return result["response"]


def format_timestamp(dt):
    return dt.strftime("%Y-%m-%dT%H:%M:%S.%fZ")


def LLMChatBot(chat, email, chat_id=None):
    current_timestamp = format_timestamp(datetime.now())

    user_chat = {
        "role": "user",
        "content": chat,
        "timestamp": current_timestamp,
    }

    if chat_id is None:
        chat_log = {
            "email": email,
            "chat": [user_chat],
            "timestamp": current_timestamp,
            "model": model,
        }
        chat_id = mongo_handler.insert_document("ChatbotLogs", chat_log)
    else:
        if isinstance(chat_id, str):
            chat_id = ObjectId(chat_id)
        chat_log = mongo_handler.get_document_by_field("ChatbotLogs", "_id", chat_id)
        chat_log["chat"].append(user_chat)

    # Get AI response based on the accumulated chat log
    response = ollama.chat(model=model, messages=chat_log["chat"])

    ai_response = {
        "role": "assistant",
        "content": response["message"]["content"],
        "timestamp": format_timestamp(datetime.now()),
    }

    # Append the AI response to the chat log
    chat_log["chat"].append(ai_response)

    # Update the chat log in the database only once
    mongo_handler.update_document("ChatbotLogs", "_id", chat_id, chat_log)

    chat_log["_id"] = str(chat_log["_id"])

    return chat_log
