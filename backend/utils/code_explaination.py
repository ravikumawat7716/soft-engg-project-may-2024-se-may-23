# Code Explanation Generator

import os
from langchain_community.llms import Ollama
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from IPython.display import display, HTML
import ipywidgets as widgets

# Initialize the Ollama LLM with the orca-mini model
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

# Create an LLMChain for code explanation
code_explanation_chain = LLMChain(llm=llm, prompt=code_explanation_prompt)

def explain_code(code, language="python"):
    """
    Generate an explanation for the given code snippet.
    
    Args:
    code (str): The code snippet to explain.
    language (str): The programming language of the code.
    
    Returns:
    str: The generated explanation.
    """
    response = code_explanation_chain.run(code=code, language=language)
    return response

# Create a dictionary to store code snippets and their explanations
code_database = {}

def save_explanation(name, code, explanation, language):
    """Save the code snippet and its explanation to the database."""
    code_database[name] = {
        "code": code,
        "explanation": explanation,
        "language": language
    }

def load_explanation(name):
    """Load a saved code snippet and its explanation from the database."""
    return code_database.get(name, None)

# Create widgets for the user interface
code_input = widgets.Textarea(
    value='',
    placeholder='Enter your code here...',
    description='Code:',
    disabled=False,
    layout={'width': '100%', 'height': '200px'}
)

language_input = widgets.Dropdown(
    options=['python', 'javascript', 'java', 'c++', 'rust', 'go'],
    value='python',
    description='Language:',
    disabled=False,
)

name_input = widgets.Text(
    value='',
    placeholder='Enter a name for this code snippet',
    description='Name:',
    disabled=False
)

explain_button = widgets.Button(description="Explain Code")
save_button = widgets.Button(description="Save Explanation")
load_button = widgets.Button(description="Load Explanation")

output = widgets.Output()

def on_explain_button_clicked(b):
    with output:
        output.clear_output()
        print("Generating explanation...")
        explanation = explain_code(code_input.value, language_input.value)
        display(HTML(f"<pre>{explanation}</pre>"))

def on_save_button_clicked(b):
    with output:
        output.clear_output()
        if name_input.value and code_input.value:
            explanation = explain_code(code_input.value, language_input.value)
            save_explanation(name_input.value, code_input.value, explanation, language_input.value)
            print(f"Saved explanation for '{name_input.value}'")
        else:
            print("Please enter a name and code before saving.")

def on_load_button_clicked(b):
    with output:
        output.clear_output()
        if name_input.value:
            saved_data = load_explanation(name_input.value)
            if saved_data:
                code_input.value = saved_data["code"]
                language_input.value = saved_data["language"]
                display(HTML(f"<pre>{saved_data['explanation']}</pre>"))
            else:
                print(f"No saved explanation found for '{name_input.value}'")
        else:
            print("Please enter a name to load.")

explain_button.on_click(on_explain_button_clicked)
save_button.on_click(on_save_button_clicked)
load_button.on_click(on_load_button_clicked)

# Display the user interface
display(code_input, language_input, name_input, 
        widgets.HBox([explain_button, save_button, load_button]), 
        output)

# Example usage
example_code = """
def quicksort(arr):
    if len(arr) <= 1:
        return arr
    else:
        pivot = arr[0]
        less = [x for x in arr[1:] if x <= pivot]
        greater = [x for x in arr[1:] if x > pivot]
        return quicksort(less) + [pivot] + quicksort(greater)
"""

code_input.value = example_code