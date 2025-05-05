
import React, { useState } from 'react';
import { ArrowRight, Pencil } from 'lucide-react';

// Mock data for user profile
const initialProfile = {
  name: "Jane Doe",
  age: 34,
  gender: "Female",
  location: "Bronx, NY",
  educationLevel: "Some college",
  employmentStatus: "Part-time employed",
  urgentNeed: "Housing",
  completedFields: 6,
  totalFields: 8
};

// Mock data for community posts
const initialPosts = [
  {
    id: 1,
    text: "Our apartment building has mold issues affecting many families, and the landlord isn't responding to maintenance requests.",
    date: "2 days ago",
    responses: [
      {
        id: 101,
        organization: "Housing Rights Coalition",
        text: "We can help with landlord mediation and provide resources about tenant rights. Please call our hotline at 555-123-4567.",
        date: "1 day ago"
      },
      {
        id: 102,
        organization: "Community Health Network",
        text: "Mold exposure can cause health issues. Our mobile clinic will be in your area this Thursday offering free respiratory checkups.",
        date: "1 day ago"
      }
    ]
  },
  {
    id: 2,
    text: "The food pantry in our neighborhood closed last month. Many seniors in the building are struggling to access affordable food options.",
    date: "1 week ago",
    responses: [
      {
        id: 201,
        organization: "Urban Relief Initiative",
        text: "We've just launched a senior meal delivery program in your area. Please fill out our form at www.uri.org/meals to enroll.",
        date: "5 days ago"
      }
    ]
  }
];

// Available options for form selections
const urgentNeedOptions = [
  "Housing", "Food Security", "Healthcare", "Employment", "Education", 
  "Childcare", "Mental Health", "Transportation", "Legal Aid", "Other"
];

const educationLevelOptions = [
  "Less than high school", "Some high school", "High school diploma/GED", 
  "Some college", "Associate degree", "Bachelor's degree", "Graduate degree"
];

const employmentStatusOptions = [
  "Unemployed", "Part-time employed", "Full-time employed", 
  "Self-employed", "Unable to work", "Retired", "Student"
];

const UserDashboard: React.FC = () => {
  const [profile, setProfile] = useState(initialProfile);
  const [posts, setPosts] = useState(initialPosts);
  const [isEditing, setIsEditing] = useState(false);
  const [newPost, setNewPost] = useState("");
  
  // Form state for editing profile
  const [formData, setFormData] = useState({
    name: profile.name,
    age: profile.age,
    gender: profile.gender,
    location: profile.location,
    educationLevel: profile.educationLevel,
    employmentStatus: profile.employmentStatus,
    urgentNeed: profile.urgentNeed
  });
  
  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const saveProfileChanges = () => {
    setProfile({
      ...profile,
      ...formData
    });
    setIsEditing(false);
  };
  
  const handleNewPostChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewPost(e.target.value);
  };
  
  const submitNewPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPost.trim()) {
      const post = {
        id: Date.now(),
        text: newPost,
        date: "Just now",
        responses: []
      };
      setPosts([post, ...posts]);
      setNewPost("");
    }
  };

  // Calculate profile completeness percentage
  const completionPercentage = (profile.completedFields / profile.totalFields) * 100;
  
  return (
    <div className="page-container">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left column: User Profile */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Your Profile</h2>
              {!isEditing && (
                <button 
                  className="text-primary hover:text-primary/80 flex items-center text-sm"
                  onClick={() => setIsEditing(true)}
                >
                  <Pencil size={16} className="mr-1" />
                  Edit
                </button>
              )}
            </div>
            
            {/* Profile Completion */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">Profile Completion</span>
                <span className="text-sm font-medium text-gray-700">{profile.completedFields}/{profile.totalFields}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-primary h-2.5 rounded-full" 
                  style={{ width: `${completionPercentage}%` }}
                ></div>
              </div>
              <p className="mt-2 text-xs text-gray-500">
                Complete your profile to help organizations better understand your needs.
              </p>
            </div>
            
            {isEditing ? (
              /* Editable Profile Form */
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleProfileChange}
                    className="input-field"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="age" className="form-label">Age</label>
                    <input
                      type="number"
                      id="age"
                      name="age"
                      value={formData.age}
                      onChange={handleProfileChange}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label htmlFor="gender" className="form-label">Gender</label>
                    <input
                      type="text"
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleProfileChange}
                      className="input-field"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="location" className="form-label">Location</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleProfileChange}
                    className="input-field"
                  />
                </div>
                
                <div>
                  <label htmlFor="educationLevel" className="form-label">Education Level</label>
                  <select
                    id="educationLevel"
                    name="educationLevel"
                    value={formData.educationLevel}
                    onChange={handleProfileChange}
                    className="input-field"
                  >
                    {educationLevelOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="employmentStatus" className="form-label">Employment Status</label>
                  <select
                    id="employmentStatus"
                    name="employmentStatus"
                    value={formData.employmentStatus}
                    onChange={handleProfileChange}
                    className="input-field"
                  >
                    {employmentStatusOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="urgentNeed" className="form-label">Most Urgent Need</label>
                  <select
                    id="urgentNeed"
                    name="urgentNeed"
                    value={formData.urgentNeed}
                    onChange={handleProfileChange}
                    className="input-field"
                  >
                    {urgentNeedOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </div>
                
                <div className="flex justify-end space-x-4 pt-4">
                  <button 
                    type="button"
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                  <button 
                    type="button"
                    className="btn-primary"
                    onClick={saveProfileChanges}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            ) : (
              /* Profile Display */
              <div className="space-y-4">
                <div>
                  <span className="block text-sm font-medium text-gray-500">Name</span>
                  <span className="block mt-1">{profile.name}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="block text-sm font-medium text-gray-500">Age</span>
                    <span className="block mt-1">{profile.age}</span>
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-gray-500">Gender</span>
                    <span className="block mt-1">{profile.gender}</span>
                  </div>
                </div>
                
                <div>
                  <span className="block text-sm font-medium text-gray-500">Location</span>
                  <span className="block mt-1">{profile.location}</span>
                </div>
                
                <div>
                  <span className="block text-sm font-medium text-gray-500">Education Level</span>
                  <span className="block mt-1">{profile.educationLevel}</span>
                </div>
                
                <div>
                  <span className="block text-sm font-medium text-gray-500">Employment Status</span>
                  <span className="block mt-1">{profile.employmentStatus}</span>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
                  <span className="block text-sm font-medium text-gray-500">Most Urgent Need</span>
                  <span className="block mt-1 font-medium text-primary">{profile.urgentNeed}</span>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Right column: Community Feed */}
        <div className="md:col-span-2">
          {/* New Post Form */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">What's happening in your area?</h2>
            <form onSubmit={submitNewPost}>
              <textarea
                className="w-full border border-gray-300 rounded-lg p-4 h-32 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                placeholder="Share a community need or issue that needs attention..."
                value={newPost}
                onChange={handleNewPostChange}
              ></textarea>
              <div className="flex justify-end mt-4">
                <button 
                  type="submit" 
                  className="btn-primary"
                  disabled={!newPost.trim()}
                >
                  Post
                </button>
              </div>
            </form>
          </div>
          
          {/* Community Feed */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">Community Feed</h2>
            
            {posts.map(post => (
              <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* User Post */}
                <div className="p-6 border-b">
                  <div className="flex items-start space-x-3">
                    <div className="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center">
                      <span className="text-gray-500 font-semibold">JD</span>
                    </div>
                    <div>
                      <div className="flex items-center">
                        <span className="font-semibold">You</span>
                        <span className="mx-2 text-gray-300">•</span>
                        <span className="text-gray-500 text-sm">{post.date}</span>
                      </div>
                      <p className="mt-2 text-gray-800">{post.text}</p>
                    </div>
                  </div>
                </div>
                
                {/* Organization Responses */}
                {post.responses.length > 0 && (
                  <div className="bg-gray-50 p-4">
                    <h3 className="text-sm font-medium text-gray-500 mb-3">
                      {post.responses.length === 1 ? "1 Organization Response" : `${post.responses.length} Organization Responses`}
                    </h3>
                    
                    <div className="space-y-4">
                      {post.responses.map(response => (
                        <div key={response.id} className="bg-white p-4 rounded-md shadow-sm">
                          <div className="flex items-center mb-2">
                            <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center mr-2">
                              <span className="text-secondary font-semibold text-sm">
                                {response.organization.split(' ').map(word => word[0]).join('')}
                              </span>
                            </div>
                            <div>
                              <div className="font-medium">{response.organization}</div>
                              <div className="text-xs text-gray-500">{response.date}</div>
                            </div>
                          </div>
                          <p className="text-gray-800 text-sm">{response.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            <div className="text-center pt-4">
              <button className="text-primary hover:text-primary/80 font-medium flex items-center mx-auto">
                Load more posts
                <ArrowRight size={16} className="ml-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
