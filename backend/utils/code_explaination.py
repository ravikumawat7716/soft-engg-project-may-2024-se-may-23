# Code Explanation Generator
import os
from langchain_community.llms import Ollama
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from IPython.display import display, HTML
import ipywidgets as widgets

# Initialize the Ollama LLM with the qwen2:0.5b model
llm = Ollama(model="qwen2:0.5b")

# Create a prompt template for code explanation
code_explanation_prompt = PromptTemplate(
    input_variables=["code", "language"],
    template="""
    You are an expert programmer and teacher. Your task is to explain the following {language} code in detail:

    ```{language}
    {code}
    ```

    Please provide a comprehensive explanation, including:
    1. The overall purpose of the code
    2. A breakdown of each significant part or function
    3. Any important programming concepts or patterns used
    4. Potential improvements or alternative approaches, if applicable
    5. Any potential edge cases or limitations

    Explanation:
    """
)