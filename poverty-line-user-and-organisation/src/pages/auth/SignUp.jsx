
import React, { useState } from 'react';
import AuthLayout from '@/components/auth/AuthLayout';

const SignUp = () => {
  const [userType, setUserType] = useState('individual');
  const [formData, setFormData] = useState({
    // Common fields
    email: '',
    password: '',
    confirmPassword: '',
    
    // Individual fields
    firstName: '',
    lastName: '',
    
    // Organization fields
    orgName: '',
    orgType: '',
    website: '',
    contactPerson: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ userType, formData });
    // Would handle user registration here
  };

  return (
    <AuthLayout
      title="Create an Account"
      subtitle="Join PovertyLink to connect with resources or provide support"
      linkText="Already have an account? Sign in"
      linkUrl="/auth/signin"
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* User Type Toggle */}
        <div className="flex rounded-md shadow-sm p-1 bg-gray-100">
          <button
            type="button"
            className={`flex-1 text-sm py-2 px-4 rounded-md font-medium transition-colors ${
              userType === 'individual' 
                ? 'bg-white shadow-sm text-gray-800' 
                : 'text-gray-500 hover:text-gray-800'
            }`}
            onClick={() => setUserType('individual')}
          >
            Individual
          </button>
          <button
            type="button"
            className={`flex-1 text-sm py-2 px-4 rounded-md font-medium transition-colors ${
              userType === 'organization' 
                ? 'bg-white shadow-sm text-gray-800' 
                : 'text-gray-500 hover:text-gray-800'
            }`}
            onClick={() => setUserType('organization')}
          >
            Organization
          </button>
        </div>

        {userType === 'individual' ? (
          // Individual Registration Fields
          <>
            <div className="grid grid-cols-1 gap-6">
              {/* Name Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="form-label">
                    First name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    required
                    className="input-field"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="form-label">
                    Last name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    required
                    className="input-field"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  required
                  className="input-field"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              {/* Password Fields */}
              <div>
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="new-password"
                  required
                  className="input-field"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  autoComplete="new-password"
                  required
                  className="input-field"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>
          </>
        ) : (
          // Organization Registration Fields
          <>
            <div className="grid grid-cols-1 gap-6">
              {/* Organization Name */}
              <div>
                <label htmlFor="orgName" className="form-label">
                  Organization Name
                </label>
                <input
                  type="text"
                  name="orgName"
                  id="orgName"
                  required
                  className="input-field"
                  value={formData.orgName}
                  onChange={handleChange}
                />
              </div>

              {/* Organization Type */}
              <div>
                <label htmlFor="orgType" className="form-label">
                  Organization Type
                </label>
                <select
                  id="orgType"
                  name="orgType"
                  className="input-field"
                  value={formData.orgType}
                  onChange={handleChange}
                >
                  <option value="">Select a type...</option>
                  <option value="ngo">Non-Governmental Organization (NGO)</option>
                  <option value="nonprofit">Non-Profit</option>
                  <option value="government">Government Agency</option>
                  <option value="religious">Religious Organization</option>
                  <option value="community">Community Group</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Website */}
              <div>
                <label htmlFor="website" className="form-label">
                  Website (optional)
                </label>
                <input
                  type="url"
                  name="website"
                  id="website"
                  className="input-field"
                  value={formData.website}
                  onChange={handleChange}
                />
              </div>

              {/* Contact Person */}
              <div>
                <label htmlFor="contactPerson" className="form-label">
                  Contact Person
                </label>
                <input
                  type="text"
                  name="contactPerson"
                  id="contactPerson"
                  required
                  className="input-field"
                  value={formData.contactPerson}
                  onChange={handleChange}
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  required
                  className="input-field"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              {/* Password Fields */}
              <div>
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="new-password"
                  required
                  className="input-field"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  autoComplete="new-password"
                  required
                  className="input-field"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>
          </>
        )}

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Create Account
          </button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default SignUp;
