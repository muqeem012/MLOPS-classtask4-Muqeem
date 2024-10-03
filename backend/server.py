from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from flask_cors import CORS

server = Flask(__name__)
CORS(server)

# MongoDB configuration
server.config["MONGO_URI"] = "mongodb://dbservice:27017/classtask4"
mongo = PyMongo(server)

@server.route('/add_user', methods=['POST'])
def add_user():
    data = request.get_json()
    user = {
        'name': data['name'],
        'email': data['email'],
        'age': data['age']
    }
    mongo.db.users.insert_one(user)
    return jsonify({"message": "User added"}), 201

@server.route('/get_users', methods=['GET'])
def get_users():
    users = mongo.db.users.find()
    result = [{"name": user["name"], "email": user["email"], "age": user["age"]} for user in users]
    return jsonify({"users": result}), 200

if __name__ == '__main__':
    server.run(debug=True, host="0.0.0.0", port=6000)
