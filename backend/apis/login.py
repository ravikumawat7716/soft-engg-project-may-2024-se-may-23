from flask import request
from instances import api
from flask_restful import Resource
import requests

class UserLoginAPI(Resource):
    def post(self):
        data = request.get_json()
        if data.get('gcode'):
            authorization_code = data['gcode']
            print(authorization_code)

            token_url = "https://oauth2.googleapis.com/token"
            client_id = "1043737632690-hogp7qi303vimd5tflakfhvduodkfjjh.apps.googleusercontent.com ==> change this"
            client_secret = "GSas;hfOCSPX-uO5ywo7h-nxZXOfB0OSSaZzJVj5X ===>change this"
            redirect_uri = "http://127.0.0.1:5000/"

            payload = {
                "code": authorization_code,
                "client_id": client_id,
                "client_secret": client_secret,
                "redirect_uri": redirect_uri,
                "grant_type": "authorization_code",
            }

            try:
                # Send a POST request to exchange the authorization code for an access token
                response = requests.post(token_url, data=payload)
                response_data = response.json()
                print("Google OAuth Response:", response_data)

                # Fetch user details using the access token
                access_token = response_data.get("access_token", "")
                print(access_token)
                user_info_url = "https://www.googleapis.com/oauth2/v3/userinfo"
                user_response = requests.get(
                    user_info_url, headers={"Authorization": f"Bearer {access_token}"}
                )
                user_data = user_response.json()
                print("User data---------------------")
                print(user_data)

                # Assuming 'name' and 'role' are retrieved from user_data
                name = user_data.get('name', '')
                role = user_data.get('role', '')

                return {'access_token': access_token, 'username': name, 'userrole': role}, 200
            except Exception as e:
                print(f"Error: {e}")
                return {'message': 'Incorrect Credentials'}, 401
        return {'message': 'Bad Request'}, 400

# api.add_resource(UserLoginAPI, '/login')
