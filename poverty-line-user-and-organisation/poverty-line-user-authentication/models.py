from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin

db = SQLAlchemy()

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    image_file = db.Column(db.String(28), nullable=False, default='default.jpg')
    password = db.Column(db.String(60), nullable=False)
    role = db.Column(db.String(20), default='user')


    def __repr__(self):
        return f"User('{self.username}', '{self.email}', '{self.image_file}')"

class UserProfile(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    gender = db.Column(db.String(10))
    location = db.Column(db.String(100))
    age = db.Column(db.Integer)
    skills = db.Column(db.String(500))
    employment_status = db.Column(db.String(20))
