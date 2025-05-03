
import React from 'react';
import { Link } from 'react-router-dom';

const AuthLayout = ({ 
  children, 
  title, 
  subtitle,
  linkText,
  linkUrl
}) => {
  return (
    <div className="flex justify-center items-center min-h-[80vh] py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          <p className="mt-2 text-sm text-gray-600">{subtitle}</p>
        </div>
        
        <div className="mt-8 bg-white py-8 px-4 shadow rounded-lg sm:px-10">
          {children}
        </div>
        
        <div className="text-center mt-4">
          <Link to={linkUrl} className="text-primary hover:text-primary/80 font-medium">
            {linkText}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
