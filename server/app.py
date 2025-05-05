from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from config import Config
from flask_migrate import Migrate
from models import db

# We initialize the extensions to be used
jwt = JWTManager()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
 
    # Then iniialize the extensions with app
    CORS(app, resources={r"/api/*": {"origins": "http://localhost:8080"}}, 
         supports_credentials=True, 
         allow_headers=["Content-Type", "Authorization"])
    db.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db)

   # Import and register blueprints
    from routes.auth_routes import auth_bp
    from routes.user_routes import individual_bp
    from routes.org_routes import org_bp
    from routes.admin_routes import admin_bp

    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(individual_bp, url_prefix='/api/user')
    app.register_blueprint(org_bp, url_prefix='/api/org')
    app.register_blueprint(admin_bp, url_prefix='/api/admin')

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)

# # Initialize the DB and Migrations
# db.init_app(app)
# migrate = Migrate(app, db)

# # This is a simple landing route to test the server.
# @app.route('/')
# def index():
#     return "Welcome to the Poverty Line Project!"

# # These create the tables
# with app.app_context():
#     db.create_all()

# if __name__ == '__main__':
#     # Turn on debug mode for dev; turn off in production
#     app.run(debug=True)