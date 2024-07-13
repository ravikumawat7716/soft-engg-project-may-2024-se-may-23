import ollama


def generate(prompt, model="qwen2:0.5b"):

    result = ollama.generate(
        model=model,
        prompt=prompt,
    )
    return result["response"]
