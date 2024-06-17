from flask import Flask, jsonify, request
from flask_cors import CORS

app= Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

@app.route('/')
def root():
    return 'Home'

@app.route("/users/<user_id>")
def get_user(user_id):
    user = {'id':user_id, "name": "test", "telefono": "999-123-333"}

    query = request.args.get('query')
    if query:
        user["query"] = query
    return jsonify(user), 200

@app.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    data ["status"] = "user created"
    return jsonify(data), 201

if __name__ == "__main__":
    app.run(debug=True)