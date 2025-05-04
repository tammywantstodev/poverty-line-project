
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '@/components/auth/AuthLayout';

const SignIn = () => {
  const [userType, setUserType] = useState('individual');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ userType, email, password, rememberMe });
    // Would handle authentication here
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (data.access_token) {
        localStorage.setItem('jwtToken', data.access_token);
  
        const tokenPayload = JSON.parse(atob(data.access_token.split('.')[1]));
        const role = tokenPayload.user_type;
  
        if (role === 'admin') {
          window.location.href = '/adminpage';
        } else if (role === 'organization') {
          window.location.href = '/organizationpage';
        } else {
          window.location.href = '/userpage';
        }
      } else {
        alert('Invalid credentials');
      }
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to your PovertyLink account"
      linkText="Don't have an account? Sign up"
      linkUrl="/auth/signup"
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

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <div className="mt-1">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        {/* Password Field */}
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="text-sm">
              <Link to="/auth/forgot-password" className="text-primary hover:text-primary/80">
                Forgot your password?
              </Link>
            </div>
          </div>
          <div className="mt-1">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {/* Remember Me Checkbox */}
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
            Remember me
          </label>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Sign in
          </button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default SignIn;
