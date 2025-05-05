from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from utils.decorators import role_required

admin_bp = Blueprint('admin_bp', __name__)

# Example of a protected route for admins
@admin_bp.route('/dashboard', methods=['GET'])
@jwt_required()
@role_required("admin")
def admin_dashboard():
    current_user = get_jwt_identity()  # Get user data from the JWT token
    if current_user['user_type'] != 'admin':
        return jsonify({"msg": "Access forbidden for this user type!"}), 403
    return jsonify(msg="Welcome to the admin dashboard")
