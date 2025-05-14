import LogoutButton from '../../components/layout/LogoutButton'
import React, { useState } from 'react';
import { MapPin, Filter, Users, Search, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data for organization profile
const organizationProfile = {
  name: "Community Support Network",
  sector: "Social Services",
  location: "Brooklyn, NY",
  contactEmail: "contact@csnetwork.org",
  contactPhone: "(212) 555-7890",
  website: "www.csnetwork.org",
  description: "Providing essential services and resources to underserved communities across Brooklyn since 2005."
};

// Mock data for user needs
const userNeeds = [
  {
    id: 1,
    username: "Maria G.",
    age: 42,
    location: "Brownsville, Brooklyn",
    distance: "1.2 miles",
    urgentNeed: "Housing Security",
    description: "Facing eviction next month. Looking for legal assistance and emergency housing options for a family of 4.",
    riskLevel: "high",
    date: "1 day ago"
  },
  {
    id: 2,
    username: "Robert T.",
    age: 68,
    location: "East New York, Brooklyn",
    distance: "2.5 miles",
    urgentNeed: "Food Access",
    description: "Senior with limited mobility seeking food delivery assistance. Cannot travel to food pantries.",
    riskLevel: "medium",
    date: "2 days ago"
  },
  {
    id: 3,
    username: "Aisha K.",
    age: 29,
    location: "Bedford-Stuyvesant, Brooklyn",
    distance: "1.8 miles",
    urgentNeed: "Healthcare",
    description: "Unable to afford medication for chronic condition. Looking for prescription assistance programs.",
    riskLevel: "medium",
    date: "3 days ago"
  },
  {
    id: 4,
    username: "James W.",
    age: 35,
    location: "Crown Heights, Brooklyn",
    distance: "3.1 miles",
    urgentNeed: "Employment",
    description: "Recently lost job and seeking employment assistance, resume help, and potential job leads in construction.",
    riskLevel: "medium",
    date: "4 days ago"
  },
  {
    id: 5,
    username: "Elena M.",
    age: 31,
    location: "Canarsie, Brooklyn",
    distance: "4.2 miles",
    urgentNeed: "Childcare",
    description: "Single parent of 3 children seeking affordable childcare options to maintain full-time employment.",
    riskLevel: "high",
    date: "5 days ago"
  }
];

// Mock data for organization programs
const initialPrograms = [
  {
    id: 1,
    title: "Housing First Initiative",
    description: "Emergency housing assistance and eviction prevention services for families at risk.",
    targetArea: "Brooklyn-wide",
    participants: 48,
    status: "active"
  },
  {
    id: 2,
    title: "Mobile Food Pantry",
    description: "Weekly distribution of groceries in underserved neighborhoods with emphasis on senior support.",
    targetArea: "East Brooklyn",
    participants: 125,
    status: "active"
  }
];

// Filter options
const needTypeOptions = [
  "All Needs", "Housing Security", "Food Access", "Healthcare", 
  "Employment", "Education", "Childcare", "Mental Health", 
  "Transportation", "Legal Aid"
];

const regionOptions = [
  "All Regions", "Brownsville", "East New York", "Bedford-Stuyvesant", 
  "Crown Heights", "Canarsie", "Flatbush", "Park Slope"
];

const riskLevelOptions = [
  "All Risk Levels", "High", "Medium", "Low"
];

const OrganizationDashboard: React.FC = () => {
  // State
  const [programs, setPrograms] = useState(initialPrograms);
  const [filters, setFilters] = useState({
    region: "All Regions",
    needType: "All Needs",
    riskLevel: "All Risk Levels",
    searchQuery: ""
  });
  const [newProgram, setNewProgram] = useState({
    title: "",
    description: "",
    targetArea: ""
  });
  const [showNewProgramForm, setShowNewProgramForm] = useState(false);
  
  // Handle filter changes
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle search query
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, searchQuery: e.target.value }));
  };
  
  // Filter users based on criteria
  const filteredUsers = userNeeds.filter(user => {
    // Filter by search query
    if (
      filters.searchQuery &&
      !user.username.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
      !user.description.toLowerCase().includes(filters.searchQuery.toLowerCase())
    ) {
      return false;
    }
    
    // Filter by region
    if (filters.region !== "All Regions" && !user.location.includes(filters.region)) {
      return false;
    }
    
    // Filter by need type
    if (filters.needType !== "All Needs" && user.urgentNeed !== filters.needType) {
      return false;
    }
    
    // Filter by risk level
    if (
      filters.riskLevel !== "All Risk Levels" && 
      user.riskLevel !== filters.riskLevel.toLowerCase()
    ) {
      return false;
    }
    
    return true;
  });
  
  // Handle new program form
  const handleProgramInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProgram(prev => ({ ...prev, [name]: value }));
  };
  
  // Submit new program
  const submitNewProgram = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newProgram.title && newProgram.description && newProgram.targetArea) {
      const program = {
        id: Date.now(),
        title: newProgram.title,
        description: newProgram.description,
        targetArea: newProgram.targetArea,
        participants: 0,
        status: "active"
      };
      
      setPrograms([...programs, program]);
      setNewProgram({ title: "", description: "", targetArea: "" });
      setShowNewProgramForm(false);
    }
  };
   const handleClick = () => {
    window.location.href = 'http://localhost:5000/account'; 
  };
  
  return (
    <div className="page-container">
      <button className="text-sm border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100 transition m-2"
            onClick={handleClick}>Account</button>
      <LogoutButton/>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Organization Profile & Programs */}
        <div className="lg:col-span-1">
          {/* Organization Profile */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Organization Profile</h2>
              <button className="text-primary hover:text-primary/80 text-sm">
                Edit
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-lg">{organizationProfile.name}</h3>
                <span className="text-sm text-gray-500">{organizationProfile.sector}</span>
              </div>
              
              <div className="flex items-start space-x-2">
                <MapPin size={18} className="text-gray-500 mt-0.5 flex-shrink-0" />
                <span>{organizationProfile.location}</span>
              </div>
              
              <div>
                <div className="text-sm text-gray-500">Contact Information</div>
                <div>{organizationProfile.contactEmail}</div>
                <div>{organizationProfile.contactPhone}</div>
                <div className="text-primary">{organizationProfile.website}</div>
              </div>
              
              <div>
                <div className="text-sm text-gray-500">About</div>
                <p className="text-gray-700">{organizationProfile.description}</p>
              </div>
            </div>
          </div>
          
          {/* Programs */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Your Programs</h2>
              <button 
                className="text-sm text-primary hover:text-primary/80"
                onClick={() => setShowNewProgramForm(!showNewProgramForm)}
              >
                {showNewProgramForm ? "Cancel" : "+ Add Program"}
              </button>
            </div>
            
            {/* New Program Form */}
            {showNewProgramForm && (
              <form onSubmit={submitNewProgram} className="mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="title" className="form-label">Program Title</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={newProgram.title}
                      onChange={handleProgramInputChange}
                      className="input-field"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                      id="description"
                      name="description"
                      value={newProgram.description}
                      onChange={handleProgramInputChange}
                      className="input-field min-h-[100px]"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="targetArea" className="form-label">Target Area</label>
                    <input
                      type="text"
                      id="targetArea"
                      name="targetArea"
                      value={newProgram.targetArea}
                      onChange={handleProgramInputChange}
                      className="input-field"
                      required
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <button type="submit" className="btn-primary">
                      Create Program
                    </button>
                  </div>
                </div>
              </form>
            )}
            
            {/* Program List */}
            <div className="space-y-4">
              {programs.length === 0 ? (
                <p className="text-gray-500 text-center py-6">No programs yet. Add your first program to get started.</p>
              ) : (
                programs.map(program => (
                  <div key={program.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-800">{program.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{program.description}</p>
                        
                        <div className="flex items-center mt-3">
                          <div className="bg-blue-100 text-secondary text-xs rounded-full py-1 px-2 mr-2">
                            {program.targetArea}
                          </div>
                          <div className="bg-gray-100 text-gray-800 text-xs rounded-full py-1 px-2">
                            {program.participants} participants
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          program.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {program.status === 'active' ? 'Active' : 'Draft'}
                        </span>
                        
                        <button className="text-primary hover:text-primary/80 text-xs mt-4">
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        
        {/* Right Column: User Needs */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Community Needs</h2>
            
            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label htmlFor="region" className="form-label">Filter by Region</label>
                <select 
                  id="region" 
                  name="region" 
                  className="input-field"
                  value={filters.region}
                  onChange={handleFilterChange}
                >
                  {regionOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="needType" className="form-label">Filter by Need</label>
                <select 
                  id="needType" 
                  name="needType" 
                  className="input-field"
                  value={filters.needType}
                  onChange={handleFilterChange}
                >
                  {needTypeOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="riskLevel" className="form-label">Filter by Risk Level</label>
                <select 
                  id="riskLevel" 
                  name="riskLevel" 
                  className="input-field"
                  value={filters.riskLevel}
                  onChange={handleFilterChange}
                >
                  {riskLevelOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Search */}
            <div className="flex relative mb-8">
              <input 
                type="text" 
                placeholder="Search needs by keyword..."
                className="input-field pl-10"
                value={filters.searchQuery}
                onChange={handleSearchChange}
              />
              <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            
            {/* Results */}
            <div className="flex items-center justify-between mb-4">
              <div className="text-gray-500 text-sm">
                Showing {filteredUsers.length} community needs
              </div>
              
              <div className="flex items-center text-sm">
                <Filter size={16} className="mr-1 text-gray-500" />
                <span>Sort by: </span>
                <select className="ml-2 border-none bg-transparent text-primary font-medium focus:outline-none focus:ring-0">
                  <option value="recent">Most Recent</option>
                  <option value="urgent">Most Urgent</option>
                  <option value="near">Nearest</option>
                </select>
              </div>
            </div>
            
            {/* User needs list */}
            <div className="space-y-6">
              {filteredUsers.map(user => (
                <div key={user.id} className="border border-gray-200 rounded-lg p-5 hover:border-primary/20 hover:bg-blue-50/10 transition-colors">
                  <div className="flex justify-between items-start">
                    <div className="flex items-start space-x-3">
                      <div className="bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center">
                        <Users size={20} className="text-gray-500" />
                      </div>
                      
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-medium text-gray-800">{user.username}</h3>
                          <span className="mx-2 text-gray-300">•</span>
                          <span className="text-gray-500 text-sm">{user.age} years old</span>
                        </div>
                        
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <MapPin size={14} className="mr-1" />
                          <span>{user.location}</span>
                          <span className="mx-1">•</span>
                          <span>{user.distance} away</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.riskLevel === 'high'
                        ? 'bg-red-100 text-red-800'
                        : user.riskLevel === 'medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {user.riskLevel === 'high' ? 'High Risk' : 
                       user.riskLevel === 'medium' ? 'Medium Risk' : 'Low Risk'}
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="bg-gray-100 inline-block px-3 py-1 rounded-full text-sm font-medium mb-3">
                      {user.urgentNeed}
                    </div>
                    <p className="text-gray-800">{user.description}</p>
                  </div>
                  
                  <div className="flex justify-between items-center mt-5 pt-4 border-t border-gray-100">
                    <span className="text-sm text-gray-500">Posted {user.date}</span>
                    
                    <div className="space-x-2">
                      <button className="btn-outline py-1.5 text-sm">
                        Send Message
                      </button>
                      <button className="btn-primary py-1.5 text-sm">
                        Offer Support
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              {filteredUsers.length === 0 && (
                <div className="text-center py-10">
                  <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Search size={24} className="text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-800 mb-1">No results found</h3>
                  <p className="text-gray-500">Try adjusting your filters or search query</p>
                </div>
              )}
            </div>
            
            {filteredUsers.length > 0 && (
              <div className="text-center mt-8">
                <button className="text-primary hover:text-primary/80 font-medium flex items-center mx-auto">
                  View more community needs
                  <ArrowRight size={16} className="ml-1" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationDashboard;
