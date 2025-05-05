from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from utils.decorators import role_required

individual_bp = Blueprint("user", __name__)

# Example of a protected route for individuals
@individual_bp.route("/dashboard", methods=["GET"])
@jwt_required()
@role_required("user")
def user_dashboard():
    current_user = get_jwt_identity()  # Get user data from the JWT token
    if current_user['user_type'] != 'individual':
        return jsonify({"msg": "Access forbidden for this user type!"}), 403
    return jsonify(msg="Welcome to the user dashboard")
