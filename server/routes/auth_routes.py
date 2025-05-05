from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required
from models import db, User
import bcrypt  

auth_bp = Blueprint('auth_bp', __name__)

# The signup Route
@auth_bp.route('/signup', methods=['POST', 'OPTIONS'])
def signup():
    if request.method == 'OPTIONS':
        return jsonify({"status": "ok"}), 200
    try:
        data = request.get_json()
        print("Received data:", data)

        # Basic validation
        if not data.get('email') or not data.get('password'):
            return jsonify({"msg": "Email and password are required!"}), 400

        # Check if user exists
        if User.query.filter_by(email=data['email']).first():
            return jsonify({"msg": "User already exists!"}), 400

        # Hash the password using bcrypt
        hashed_password = bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt())

        # Create new user
        new_user = User(
            email=data['email'],
            password_hash=hashed_password.decode('utf-8'),  # store as string
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

    if not data.get('email') or not data.get('password'):
        return jsonify({"msg": "Email and password are required!"}), 400

    # Find user by email
    user = User.query.filter_by(email=data['email']).first()

    if user and bcrypt.checkpw(data['password'].encode('utf-8'), user.password_hash.encode('utf-8')):
        access_token = create_access_token(identity={'email': user.email, 'user_type': user.user_type})
        return jsonify(access_token=access_token), 200
    else:
        return jsonify({"msg": "Invalid email or password!"}), 401

# Protected route
@auth_bp.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    return jsonify(message="This route is protected!")
