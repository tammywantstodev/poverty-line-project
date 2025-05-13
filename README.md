# **PovertyLine**
### *Empowering equitable aid distribution through tech*

![PovertyLine Logo](https://via.placeholder.com/800x200?text=PovertyLine)

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [For Aid Recipients](#for-aid-recipients)
  - [For NGOs and Stakeholders](#for-ngos-and-stakeholders)
  - [For Administrators](#for-administrators)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [Roadmap](#roadmap)
- [Team](#team)
- [License](#license)
- [Contact](#contact)

## Introduction

PovertyLine is a web-based platform designed to address the challenge of inefficient aid distribution in Kenya. By connecting people in need directly with NGOs and stakeholders through a transparent digital platform, we're working to ensure that resources reach those who need them most.

Our platform serves as a bridge, enabling:
- Individuals to submit verifiable assistance requests
- NGOs to identify and respond to legitimate needs
- Administrators to ensure fair and transparent distribution

PovertyLine represents a paradigm shift in how aid is distributed, moving from inefficient traditional methods to a data-driven, technology-enabled approach that reduces waste and maximizes impact.

## Features

### For Aid Recipients
- **User-friendly registration and authentication**
- **Simple request submission** for various types of aid
- **Real-time status tracking** of submitted requests
- **Secure communication channel** with responding organizations
- **Mobile-responsive design** for accessibility in areas with limited resources

### For NGOs and Stakeholders
- **Comprehensive dashboard** for viewing verified cases
- **Advanced filtering and search** to identify priority needs
- **Case management system** to track ongoing assistance
- **Analytics and reporting** on impact and distribution
- **Collaboration tools** for coordinating with other organizations

### For Administrators
- **Moderation tools** to verify request authenticity
- **User management system** for overseeing all platform activities
- **Audit trails** for ensuring transparency
- **System configuration** options for adapting to changing needs

## Tech Stack

PovertyLine is built using modern, scalable technologies:

### Frontend
- **React**: For building a responsive and interactive user interface
- **Redux**: For state management
- **Material UI**: For consistent component styling
- **Chart.js**: For data visualization

### Backend
- **Flask (Python)**: For robust API development
- **SQLAlchemy**: For database ORM
- **JWT**: For secure authentication
- **Celery**: For background task processing

### Infrastructure
- **PostgreSQL**: Primary database
- **Redis**: For caching and queue management
- **Docker**: For containerization
- **AWS**: For cloud hosting and services

## Getting Started

### Prerequisites

To run PovertyLine locally, you'll need:

- Node.js (v14.0+)
- Python (v3.8+)
- PostgreSQL (v12.0+)
- Redis (v6.0+)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/povertyline/povertyline.git
   cd povertyline
   ```

2. **Set up the backend**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   pip install -r requirements.txt
   
   # Configure environment variables
   cp .env.example .env
   # Edit .env with your database credentials
   
   # Initialize the database
   flask db upgrade
   
   # Start the Flask server
   flask run
   ```

3. **Set up the frontend**
   ```bash
   cd ../frontend
   npm install
   
   # Configure environment variables
   cp .env.example .env
   # Edit .env with your API endpoint
   
   # Start the React development server
   npm start
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## Usage

### For Aid Recipients

1. **Register an account** using your phone number or email
2. **Complete your profile** with necessary verification information
3. **Submit a request** detailing your specific needs
4. **Monitor status** and respond to any follow-up questions
5. **Receive updates** when an organization commits to providing assistance

### For NGOs and Stakeholders

1. **Register as an organization** with proper documentation
2. **Browse verified cases** using filters to match your focus areas
3. **Commit to cases** that align with your resources and mission
4. **Track impact** through the reporting dashboard
5. **Collaborate** with other organizations on complex cases

### For Administrators

1. **Review and verify** new user and organization registrations
2. **Moderate request submissions** to ensure authenticity
3. **Monitor platform metrics** for system health and impact
4. **Configure system parameters** as needed for optimal operation

## API Documentation

Our API documentation is available at `/api/docs` when running the application locally, or at `https://api.povertyline.org/docs` in production.

Key endpoints include:

- `/api/auth`: Authentication and user management
- `/api/requests`: Request submission and management
- `/api/organizations`: Organization profiles and activities
- `/api/admin`: Administrative functions

## Contributing

We welcome contributions to PovertyLine! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please read our [Contributing Guidelines](CONTRIBUTING.md) for more details.

## Roadmap

- **Q2 2025**: Reach 500+ households in Kenya
- **Q4 2025**: Add machine learning for improved case matching
- **Q2 2026**: Expand to neighboring East African countries
- **2027-2030**: Scale across major African regions
- **2030-2050**: Contribute to poverty eradication goals in Africa

## Team

PovertyLine is developed by a dedicated team committed to making a difference:

- **Joshua Ngaara** - Project Lead & Backend Developer
- **Tamara Kaka** - Frontend Developer & UX Designer
- **Jeremy Bosire** - Data Scientist & Analytics Engineer
- **Faith Chepkorir** - Community Engagement & Operations

## License

PovertyLine is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Have questions or want to get involved? Reach out to us:

---

*PovertyLine - Technology for equitable resource distribution*