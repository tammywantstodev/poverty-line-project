from flask import Blueprint, jsonify
from models import User

user_routes = Blueprint('user_routes', __name__)

# Get user profile by ID
@user_routes.route('/api/users/<int:user_id>', methods=['GET'])
def get_user_profile(user_id):
    user = User.query.get_or_404(user_id)
    user_profile = {
        "id": user.id,
        "name": user.name,
        "age": user.age,
        "location": user.location,
        "poverty_risk": user.poverty_risk
    }
    return jsonify(user_profile)
