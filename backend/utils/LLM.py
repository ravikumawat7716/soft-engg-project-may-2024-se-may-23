import ollama


def generate(prompt, model="qwen2:0.5b"):

    result = ollama.generate(
        model=model,
        prompt=prompt,
    )
    return result["response"]


def ChatBot(chat, model="qwen2:0.5b"):
    stream = ollama.chat(
        model=model,
        messages=chat,
        stream=True,
    )

    for chunk in stream:
        print(chunk["message"]["content"], end="", flush=True)


ChatBot([{"role": "user", "content": "Why is the sky blue?"}])

chats = [
    {"role": "user", "content": "Why is the sky blue?"},
    {"role": "assistant", "content": "The sky is blue because of Rayleigh scattering."},
]


l
