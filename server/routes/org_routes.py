from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from utils.decorators import role_required

org_bp = Blueprint('org_bp', __name__)

# Example of a protected route for organizations
@org_bp.route("/dashboard", methods=["GET"])
@jwt_required()
@role_required("organization")
def org_dashboard():
    current_user = get_jwt_identity()  # Get user data from the JWT token
    if current_user['user_type'] != 'organization':
        return jsonify({"msg": "Access forbidden for this user type!"}), 403
    return jsonify(msg="Welcome to the organization dashboard")
