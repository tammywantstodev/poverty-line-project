
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Partner Logos (using placeholder data)
const partners = [
  {
    id: 1,
    name: "Urban Relief Initiative",
    logo: "https://placehold.co/150x80?text=URI",
    description: "Providing emergency housing and food assistance in urban centers.",
  },
  {
    id: 2,
    name: "Global Poverty Action",
    logo: "https://placehold.co/150x80?text=GPA", 
    description: "International organization focused on systemic poverty solutions.",
  },
  {
    id: 3,
    name: "Community Health Network",
    logo: "https://placehold.co/150x80?text=CHN",
    description: "Connecting underserved communities with healthcare resources.",
  },
  {
    id: 4,
    name: "Educational Access Alliance",
    logo: "https://placehold.co/150x80?text=EAA",
    description: "Ensuring educational opportunities for children in poverty.",
  },
  {
    id: 5,
    name: "Housing First Coalition",
    logo: "https://placehold.co/150x80?text=HFC",
    description: "Advocating for affordable housing and homelessness solutions.",
  },
  {
    id: 6,
    name: "Rural Support Network",
    logo: "https://placehold.co/150x80?text=RSN",
    description: "Specialized support for poverty issues in rural communities.",
  },
];

const About: React.FC = () => {
  const [activeTooltip, setActiveTooltip] = useState<number | null>(null);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">About PovertyLink</h1>
          <p className="text-lg text-gray-600 mb-6">
            We're building a platform that connects individuals experiencing poverty with the organizations that can help them.
            Through data and community, we're creating pathways toward greater opportunity and dignity for all.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4" id="mission">
        <div className="container mx-auto max-w-4xl">
          <h2 className="section-title text-center">Our Mission</h2>
          <div className="card p-8 mb-12">
            <p className="text-xl text-gray-700 mb-6">
              PovertyLink exists to create direct connections between individuals experiencing poverty and the organizations with resources to help.
              By mapping poverty patterns and needs, we aim to enable more efficient, targeted, and dignified support systems.
            </p>
            <p className="text-xl text-gray-700">
              We believe that through better data collection, transparency, and direct connections, we can help communities overcome systemic barriers
              and create lasting pathways out of poverty.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="card p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">For Individuals</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="inline-block w-5 h-5 mr-2 rounded-full bg-primary text-white flex-shrink-0 flex items-center justify-center text-sm">✓</span>
                  <span>Direct connection to support services</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-5 h-5 mr-2 rounded-full bg-primary text-white flex-shrink-0 flex items-center justify-center text-sm">✓</span>
                  <span>Dignified way to express needs</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-5 h-5 mr-2 rounded-full bg-primary text-white flex-shrink-0 flex items-center justify-center text-sm">✓</span>
                  <span>Community support and resources</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-5 h-5 mr-2 rounded-full bg-primary text-white flex-shrink-0 flex items-center justify-center text-sm">✓</span>
                  <span>Greater visibility for overlooked needs</span>
                </li>
              </ul>
            </div>

            <div className="card p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">For Organizations</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="inline-block w-5 h-5 mr-2 rounded-full bg-secondary text-white flex-shrink-0 flex items-center justify-center text-sm">✓</span>
                  <span>Better targeting of resources</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-5 h-5 mr-2 rounded-full bg-secondary text-white flex-shrink-0 flex items-center justify-center text-sm">✓</span>
                  <span>Data-driven program design</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-5 h-5 mr-2 rounded-full bg-secondary text-white flex-shrink-0 flex items-center justify-center text-sm">✓</span>
                  <span>Collaboration opportunities</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-block w-5 h-5 mr-2 rounded-full bg-secondary text-white flex-shrink-0 flex items-center justify-center text-sm">✓</span>
                  <span>Direct impact measurement</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 px-4 bg-secondary text-white" id="vision">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Our Vision</h2>
          <p className="text-xl mb-6">
            We envision a world where poverty is no longer defined by isolation and invisibility, but instead met with community support, dignity, and pathways to opportunity.
          </p>
          <p className="text-xl mb-8">
            Through technology and human connection, we believe we can transform how communities respond to poverty – shifting from fragmented, reactive interventions to coordinated, 
            preventative, and empowering support systems.
          </p>
          
          <div className="bg-white/10 rounded-xl p-6 md:p-8 backdrop-blur-sm">
            <h3 className="text-2xl font-semibold mb-4 text-center">By 2030, we aim to:</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">1M+</div>
                <p>Individuals connected with support resources</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">5K+</div>
                <p>Partner organizations across the country</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">100+</div>
                <p>Communities with reduced poverty rates</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Goals Section */}
      <section className="py-16 px-4" id="goals">
        <div className="container mx-auto max-w-4xl">
          <h2 className="section-title text-center">Our Goals</h2>
          <p className="section-subtitle text-center mx-auto">
            We're committed to creating measurable impact through these key objectives:
          </p>
          
          <div className="space-y-8 mt-12">
            {/* Goal 1 */}
            <div className="card p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="bg-blue-100 rounded-full p-4 w-16 h-16 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-secondary">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Connect & Support</h3>
                  <p className="text-gray-600">
                    Create direct connections between individuals experiencing poverty and organizations with resources to help,
                    facilitating faster response times and more targeted assistance.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Goal 2 */}
            <div className="card p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="bg-green-100 rounded-full p-4 w-16 h-16 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Map & Understand</h3>
                  <p className="text-gray-600">
                    Build comprehensive data maps of poverty indicators, service availability, and outcome trends to enable
                    evidence-based interventions and policy advocacy.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Goal 3 */}
            <div className="card p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="bg-purple-100 rounded-full p-4 w-16 h-16 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-secondary">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Coordinate & Amplify</h3>
                  <p className="text-gray-600">
                    Foster collaboration between organizations to prevent duplication, identify service gaps, and amplify 
                    collective impact through shared resources and knowledge.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Goal 4 */}
            <div className="card p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="bg-orange-100 rounded-full p-4 w-16 h-16 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-primary">4</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Empower & Sustain</h3>
                  <p className="text-gray-600">
                    Focus on sustainable solutions that empower individuals and communities to build pathways out of poverty
                    through education, employment, health, and community support.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16 px-4 bg-gray-50" id="partners">
        <div className="container mx-auto max-w-5xl">
          <h2 className="section-title text-center">Our Partners</h2>
          <p className="section-subtitle text-center mx-auto">
            We collaborate with these organizations to expand our impact and reach.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-12">
            {partners.map(partner => (
              <div 
                key={partner.id} 
                className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center justify-center relative"
                onMouseEnter={() => setActiveTooltip(partner.id)}
                onMouseLeave={() => setActiveTooltip(null)}
              >
                <img src={partner.logo} alt={partner.name} className="h-16 object-contain" />
                <p className="mt-4 text-center font-medium text-gray-800">{partner.name}</p>
                
                {/* Tooltip */}
                {activeTooltip === partner.id && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 bg-gray-900 text-white text-sm rounded-lg p-3 shadow-lg z-10">
                    <p>{partner.description}</p>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-8 border-transparent border-t-gray-900"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary text-white">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Mission Today</h2>
          <p className="text-xl mb-8">
            Be part of the solution. Create an account to join our community of changemakers.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/auth/signup" className="bg-white text-primary hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition duration-200 ease-in-out text-lg">
              Create an Account
            </Link>
            <Link to="/auth/signin" className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold py-3 px-8 rounded-lg transition duration-200 ease-in-out text-lg">
              Sign In
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
