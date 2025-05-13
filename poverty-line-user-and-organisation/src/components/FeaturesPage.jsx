import '../styles/FeaturesPage.css';

function FeaturesPage() {
    return (
        <div className="features-page">
            <h1 className="features-title">What PovAware Offers</h1>

            <div className="feature-section">
                <h2>Create Your Profile</h2>
                <p>
                    Users can sign up and fill out detailed forms about their skills, location,
                    age, and other important information. This helps employers find the right people for the job.
                </p>
            </div>

            <div className="feature-section">
                <h2>Connect with Employers</h2>
                <p>
                    Employers can browse through user profiles and select workers based on their needs. 
                    Job seekers and job providers connect directly through the platform.
                </p>
            </div>

            <div className="feature-section">
                <h2>Post & Discover Job Listings</h2>
                <p>
                    Employers can post job opportunities, and users can browse and apply to jobs that match their skills and interests.
                </p>
            </div>

            <div className="feature-section">
                <h2>Raise Your Voice</h2>
                <p>
                    PovAware encourages two-way communication. Users can report local issues or challenges 
                    in their area, and receive responses or support from partner organizations or admins.
                </p>
            </div>
        </div>
    );
}

export default FeaturesPage;
