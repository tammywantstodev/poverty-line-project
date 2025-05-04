from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, User 

auth_bp = Blueprint('auth_bp', __name__)

# The signup Route@auth_bp.route('/signup', methods=['POST'])
def signup():
    try:
        data = request.get_json()
        print("Received data:", data)

        # Basic validation
        if not data.get('email') or not data.get('password'):
            return jsonify({"msg": "Email and password are required!"}), 400

        # Check if user exists
        if User.query.filter_by(email=data['email']).first():
            return jsonify({"msg": "User already exists!"}), 400

        # Create user
        hashed_password = generate_password_hash(data['password'], method='sha256')
        new_user = User(
            email=data['email'],
            password=hashed_password,
            user_type=data.get('user_type', 'individual')
        )
        db.session.add(new_user)
        db.session.commit()

        # Create JWT token
        access_token = create_access_token(identity={'email': new_user.email, 'user_type': new_user.user_type})
        return jsonify(access_token=access_token), 201

    except Exception as e:
        print("Signup ERROR:", e)
        return jsonify({"error": "Signup failed", "details": str(e)}), 500

# The login Route
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    
    # Check if email and password are provided
    if not data.get('email') or not data.get('password'):
        return jsonify({"msg": "Email and password are required!"}), 400
    
    # Find the user by email
    user = User.query.filter_by(email=data['email']).first()

    # Validate user and password
    if user and check_password_hash(user.password, data['password']):
        # Create a JWT token
        access_token = create_access_token(identity={'email': user.email, 'user_type': user.user_type})
        return jsonify(access_token=access_token), 200
    else:
        return jsonify({"msg": "Invalid email or password!"}), 401

# Protecting other routes
@auth_bp.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    # This route is protected, and only accessible with a valid JWT token
    return jsonify(message="This route is protected!")
