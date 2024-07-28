import ollama

from model.connection import mongo_handler
from datetime import datetime


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


def ChatBot(chat, model="qwen2:0.5b"):
    stream = ollama.chat(
        model=model,
        messages=chat,
        stream=True,
    )

    for chunk in stream:
        print(chunk["message"]["content"], end="", flush=True)


# ChatBot([{"role": "user", "content": "Why is the sky blue?"}])

# chats = [
#     {"role": "user", "content": "Why is the sky blue?"},
#     {"role": "assistant", "content": "The sky is blue because of Rayleigh scattering."},
# ]
