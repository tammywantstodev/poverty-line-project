from flask_jwt_extended import get_jwt_identity
from flask import jsonify
from functools import wraps

def role_required(required_role):
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            identity = get_jwt_identity()
            if identity["role"] != required_role:
                return jsonify(msg="Access denied"), 403
            return fn(*args, **kwargs)
        return decorator
    return wrapper
