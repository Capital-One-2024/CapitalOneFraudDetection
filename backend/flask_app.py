from flask import Flask, request

app = Flask(__name__)

@app.route('/')
def home():
    return 'Hello, World!'

@app.post('/signup')
def signup():
    data = request.get_json()

    # Data Validation and Extraction
    if not data:
        return {"error": "No data provided"}, 400     
    if 'firstName' not in data:
        return {"error": "First name is required"}, 400
    if 'lastName' not in data:
        return {"error": "Last name is required"}, 400
    if 'email' not in data:
        return {"error": "Email is required"}, 400

    # USer creation in database
    if True: # Success
        return {"message": "Registration successful!"}, 200
    else: # Error
        return {"error": "Unable to create user"}, 500

@app.post('/login')
def login():
    data = request.get_json()

    # Validate credentials (dummy validation for example)
    if True:
        return {"message": "Login successful!"}, 200
    else:
        return {"error": "Invalid login"}, 401

@app.post('/logout')
def logout():
    data = request.get_json()

if __name__ == '__main__':
    app.run(debug=True)