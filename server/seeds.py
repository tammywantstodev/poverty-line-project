from app import app, db
from models import User, Stakeholder, Program
from werkzeug.security import generate_password_hash

def seed_data():
    with app.app_context():
        db.drop_all()
        db.create_all()

        # Create sample stakeholders with required fields
        ngo1 = Stakeholder(
            organization_name="Health Aid Org",
            contact_email="info@healthaid.org",
            password_hash=generate_password_hash("password123"),
            region="East Zone",
            sector_focus="Healthcare",
            approved=True
        )
        ngo2 = Stakeholder(
            organization_name="EduBridge",
            contact_email="contact@edubridge.org",
            password_hash=generate_password_hash("password123"),
            region="West Zone",
            sector_focus="Education",
            approved=True
        )
        db.session.add_all([ngo1, ngo2])
        db.session.commit()

        # Create sample opportunities
        opp1 = Program(
            title="Free Vaccination Camp",
            description="Covid-19 vaccines provided for free in local clinic",
            type="program",
            region="East Zone",
            posted_by_id=ngo1.id
        )
        opp2 = Program(
            title="Digital Skills Bootcamp",
            description="Intensive 2-week training in digital literacy",
            type="training",
            region="West Zone",
            posted_by_id=ngo2.id
        )
        db.session.add_all([opp1, opp2])
        db.session.commit()

        print("Database seeded successfully.")

if __name__ == '__main__':
    seed_data()
