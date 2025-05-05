
import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users, BarChart, TrendingUp, Award, MessageCircle, ArrowRight } from 'lucide-react';

const Home: React.FC = () => {
  // Mock data for stats
  const stats = {
    profilesCreated: 15742,
    atRiskPercentage: 68,
    mostReportedNeed: 'Housing Security'
  };

  // Mock testimonials data
  const testimonials = [
    {
      id: 1,
      quote: "PovertyLink helped me find resources for my family when we needed them most.",
      name: "Maria G.",
      role: "Community Member",
      location: "Bronx, NY"
    },
    {
      id: 2,
      quote: "We've been able to connect with individuals who truly need our services through this platform.",
      name: "James T.",
      role: "Program Director",
      organization: "Community Outreach NGO"
    },
    {
      id: 3,
      quote: "The data insights have helped us allocate resources more effectively in underserved areas.",
      name: "Dr. Patrice W.",
      role: "Research Director",
      organization: "Urban Policy Institute"
    }
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-secondary to-primary text-white py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Map Poverty. Empower Lives.
          </h1>
          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Connecting communities in need with organizations that can help. Together, we build pathways out of poverty.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/auth/signup" className="bg-white text-primary hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition duration-200 ease-in-out text-lg">
              Join Now
            </Link>
            <Link to="/#data" className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold py-3 px-8 rounded-lg transition duration-200 ease-in-out text-lg">
              Search Data
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Summary Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Profiles Created */}
            <div className="card flex flex-col items-center text-center p-8">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <Users size={32} className="text-secondary" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {stats.profilesCreated.toLocaleString()}
              </h3>
              <p className="text-lg font-semibold text-gray-600 mb-3">Profiles Created</p>
              <p className="text-gray-500">
                Community members connected with resources and support organizations.
              </p>
            </div>
            
            {/* At Risk Percentage */}
            <div className="card flex flex-col items-center text-center p-8">
              <div className="bg-red-100 p-4 rounded-full mb-4">
                <BarChart size={32} className="text-danger" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {stats.atRiskPercentage}%
              </h3>
              <p className="text-lg font-semibold text-gray-600 mb-3">At Risk</p>
              <p className="text-gray-500">
                Of profiles indicating high-risk factors requiring immediate support.
              </p>
            </div>
            
            {/* Most Reported Need */}
            <div className="card flex flex-col items-center text-center p-8">
              <div className="bg-green-100 p-4 rounded-full mb-4">
                <TrendingUp size={32} className="text-success" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {stats.mostReportedNeed}
              </h3>
              <p className="text-lg font-semibold text-gray-600 mb-3">Most Reported Need</p>
              <p className="text-gray-500">
                Based on community reports across all profiles in the system.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">How PovertyLink Works</h2>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Our platform connects individuals in need with organizations that can help, while providing valuable data insights for community action.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4 relative">
                <Users size={28} className="text-secondary" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary rounded-full text-white font-bold flex items-center justify-center">
                  1
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">Create Profile</h3>
              <p className="text-gray-600">
                Individuals and families create profiles identifying their needs and circumstances. Organizations register their services and resources.
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mb-4 relative">
                <Award size={28} className="text-primary" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full text-white font-bold flex items-center justify-center">
                  2
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">Get Insights</h3>
              <p className="text-gray-600">
                Our platform analyzes data to identify patterns, urgent needs, and service gaps in communities, allowing for better resource allocation.
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4 relative">
                <MessageCircle size={28} className="text-success" />
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-success rounded-full text-white font-bold flex items-center justify-center">
                  3
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">Community Action</h3>
              <p className="text-gray-600">
                Organizations connect with individuals to provide services while collaborating with others to address systematic issues.
              </p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link to="/about" className="inline-flex items-center text-primary hover:text-primary/80 font-semibold">
              Learn more about our approach
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-gray-50" id="testimonials">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Voices from Our Community</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="card p-6">
                <div className="mb-4">
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.667 13.333H5.33366C5.33366 13.333 5.33366 10.667 5.33366 8.00033C5.33366 5.33366 8.00033 5.33366 8.00033 5.33366H10.667C10.667 5.33366 10.667 2.66699 10.667 2.66699C10.667 2.66699 9.20033 2.66699 8.00033 2.66699C3.33366 2.66699 2.66699 6.00033 2.66699 8.00033C2.66699 10.667 2.66699 16 2.66699 16C2.66699 16 2.66699 18.667 5.33366 18.667H10.667C13.333 18.667 13.333 16 13.333 16V16C13.333 16 13.333 13.333 10.667 13.333Z" fill="#0D9488"/>
                    <path d="M26.6663 13.333H21.333C21.333 13.333 21.333 10.667 21.333 8.00033C21.333 5.33366 23.9997 5.33366 23.9997 5.33366H26.6663C26.6663 5.33366 26.6663 2.66699 26.6663 2.66699C26.6663 2.66699 25.1997 2.66699 23.9997 2.66699C19.333 2.66699 18.6663 6.00033 18.6663 8.00033C18.6663 10.667 18.6663 16 18.6663 16C18.6663 16 18.6663 18.667 21.333 18.667H26.6663C29.333 18.667 29.333 16 29.333 16V16C29.333 16 29.333 13.333 26.6663 13.333Z" fill="#0D9488"/>
                  </svg>
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.quote}"</p>
                <div className="mt-auto">
                  <p className="font-bold text-gray-800">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}{testimonial.organization ? `, ${testimonial.organization}` : ''}</p>
                  {testimonial.location && (
                    <div className="flex items-center mt-1 text-sm text-gray-500">
                      <MapPin size={14} className="mr-1" />
                      <span>{testimonial.location}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-white">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Make an Impact?</h2>
          <p className="text-lg mb-8">
            Join our community today to help map poverty and create meaningful change in your area.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/auth/signup" className="bg-white text-primary hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition duration-200 ease-in-out text-lg">
              Join Now
            </Link>
            <Link to="/about" className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold py-3 px-8 rounded-lg transition duration-200 ease-in-out text-lg">
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
