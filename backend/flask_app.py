from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/')
def home():
    return 'Hello, World!'

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()

    # Data Validation and Extraction
    if not data:
        return jsonify({"error": "No data provided"}), 400     
    if 'firstName' not in data:
        return jsonify({"error": "First name is required"}), 400
    if 'lastName' not in data:
        return jsonify({"error": "Last name is required"}), 400
    if 'email' not in data:
        return jsonify({"error": "Email is required"}), 400

    # Database logic to create user
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)