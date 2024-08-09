from flask_restful import Resource
from flask import jsonify, request
from model.connection import mongo_handler


class Assignments(Resource):
    def post(self):
        pass
