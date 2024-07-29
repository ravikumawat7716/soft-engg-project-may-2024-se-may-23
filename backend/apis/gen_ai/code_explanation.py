from flask_restful import Resource
from flask import jsonify, request
from utils.LLM import generate


class CodeExplantion(Resource):
    def post(self):
        print("Code ExplantionAPI called")
        try:
            code = request.data.decode("utf-8")
            email = request.args.get("email", "Not provided")

            print("email: ", email)
            prompt = "Explain the given code line by line:  \n \n "

            # Generate the coesummary using the LLM model
            summary = generate(
                prompt=prompt,
                prompt_data=code,
                method="Code_Explanation",
                email=email,
            )

            return jsonify({"result": summary})
        except Exception as e:
            print("Error occurred:", str(e))
            return jsonify({"error": str(e)}), 500

    def get(self):
        return jsonify({"message": "Welcome to the Code Explantion API!"})
