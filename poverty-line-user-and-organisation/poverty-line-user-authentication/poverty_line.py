from flask import Flask, render_template, redirect, url_for, flash, request, jsonify, session
from flask_bcrypt import Bcrypt
from flask_login import LoginManager, login_user, current_user, logout_user, login_required
from flask_cors import CORS
from flask_migrate import Migrate


from models import db, User, UserProfile, Job, JobApplication
from forms import RegistrationForm, LoginForm, UpdateAccountForm

app = Flask(__name__)
migrate = Migrate(app, db)
CORS(app, supports_credentials=True,  origins=['http://localhost:8080','http://localhost:5000'])

app.config['SECRET_KEY'] = '860161b45d69b1c3a46aef53a0342eabd737bbcf997812f6252a3759defc084b'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['SESSION_COOKIE_SAMESITE'] = "None"
app.config['SESSION_COOKIE_SECURE'] = True


# Initialize extensions
db.init_app(app)
bcrypt = Bcrypt(app)
login_manager = LoginManager(app)
login_manager.login_view = 'login'

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('home'))
    form = RegistrationForm()
    if form.validate_on_submit():
        hashed_pw = bcrypt.generate_password_hash(form.password.data).decode('utf-8')
        user = User(username=form.username.data, email=form.email.data, password=hashed_pw, role=form.account_type.data)
        db.session.add(user)
        db.session.commit()
        flash('Account created successfully.', 'success')
        return redirect(url_for('login'))
    return render_template('register.html', form=form)

@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user and bcrypt.check_password_hash(user.password, form.password.data):
            login_user(user, remember=form.remember.data)
            
            session['user_id'] = user.id
            # Check the user's role and redirect accordingly
            if user.role == 'user':
                return redirect('http://localhost:8080/dashboard/user')  # Redirect to user-specific page
            elif user.role == 'org':
                return redirect('http://localhost:8080/dashboard/organization')  # Redirect to organization-specific page
            else:
                return redirect('http://localhost:8080/')  # Default landing page if role doesn't match
        else:
            flash('Login unsuccessful. Check your email and password.', 'danger')
    
    return render_template('login.html', form=form)

@app.route('/api/current_user')
def get_current_user():
    if current_user.is_authenticated:
        return jsonify(user=current_user.to_dict())  # Your user serializer
    else:
        return jsonify(user=None), 200 

@app.route('/logout', methods=['POST'])
def logout():
    logout_user()
    return jsonify({'message': 'Logged out'}), 200



@app.route('/account', methods=['GET', 'POST'])
@login_required
def account():
    form=UpdateAccountForm()
    if form.validate_on_submit():
        current_user.username=form.username.data
        current_user.email=form.email.data
        db.session.commit()
        flash('Account info updated')
        return redirect(url_for('account'))
    elif request.method=='GET':
        form.username.data=current_user.username
        form.email.data=current_user.email

    image_file=url_for('static', filename='profile_pics/'+ current_user.image_file)
    return render_template('account.html', image_file=image_file, form=form)

@app.route('/add_user', methods=['POST'])
def add_user():
    data = request.get_json()

    # Extract data
    gender = data.get('gender')
    location = data.get('location')
    age = data.get('age')
    skills = ",".join(data.get('skills', []))  # Turn skills array into a string
    employment_status = data.get('employment_status')

    # Create a new User instance
    new_user_profile = UserProfile(
        gender=gender,
        location=location,
        age=age,
        skills=skills,
        employment_status=employment_status
    )

    # Save to database
    db.session.add(new_user_profile)
    db.session.commit()
    

    return jsonify({"message": "User added successfully!"}), 201

@app.route('/get_organization_data')
def get_organization_data():
    users = db.session.query(User, UserProfile).join(UserProfile, User.id == UserProfile.id).all()

    result = []
    for user, profile in users:
        result.append({
            'username': user.username,
            'email': user.email,
            'gender': profile.gender,
            'location': profile.location,
            'age': profile.age,
            'skills': profile.skills,
            'employment_status': profile.employment_status,
        })
    return jsonify({"profiles": result}) 


@app.route('/post_job', methods=['POST'])
def post_job():
    data = request.get_json()
    job = Job(
        title=data.get('title'),
        description=data.get('description'),
        location=data.get('location'),
        salary=data.get('salary'),
    )
    db.session.add(job)
    db.session.commit()

    return jsonify({'message': 'Job posted successfully'}), 201

@app.route('/get_jobs', methods=['GET'])
def get_jobs():
    jobs = Job.query.all()
    job_list = []
    for job in jobs:
        job_list.append({
            'id': job.id,
            'title': job.title,
            'description': job.description,
            'location': job.location,
            'salary': job.salary,
        })
    return jsonify(job_list)

    
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)


@app.route('/apply', methods=['POST', 'OPTIONS'])  # ← add 'OPTIONS'
def apply_job():
    if request.method == 'OPTIONS':
        response = jsonify({'message': 'Preflight request accepted'})
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5173') 
        response.headers.add('Access-Control-Allow-Credentials', 'true')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
        return '', 204
    if not current_user.is_authenticated:
        return jsonify({'error': 'Authentication required'}), 401

    data = request.get_json()
    job_id = data.get('jobId')

    if not job_id:
        return jsonify({'error': 'Job ID is required'}), 400

    existing_application = JobApplication.query.filter_by(user_id=current_user.id, job_id=job_id).first()
    if existing_application:
        return jsonify({'message': 'Already applied'}), 400

    application = JobApplication(user_id=current_user.id, job_id=job_id)
    db.session.add(application)
    db.session.commit()

    return jsonify({'message': 'Application submitted successfully'}), 201


@app.route('/get_applications', methods=['GET'])
def get_applications():
    applications = JobApplication.query.all()
    result = []
    for application in applications:
        result.append({
            'id': application.id,
            'username': application.user.username,
            'email': application.user.email,
            'job_title': application.job.title,
            'job_id': application.job.id,
            'timestamp': application.timestamp.strftime('%Y-%m-%d %H:%M:%S'),
        })
    return jsonify(result)
