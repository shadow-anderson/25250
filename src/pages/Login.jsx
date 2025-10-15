import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAppStore from '../store/useAppStore';

const Login = () => {
  const [selectedRole, setSelectedRole] = useState('');
  const navigate = useNavigate();
  const { setRole, setUser } = useAppStore();

  const roles = [
    { value: 'employee', label: 'Employee' },
    { value: 'manager', label: 'Manager' },
    { value: 'admin', label: 'Admin' }
  ];

  const handleLogin = () => {
    if (selectedRole) {
      setRole(selectedRole);
      // Set mock user data based on role
      const userData = {
        name: selectedRole === 'employee' ? 'John Doe' : 
              selectedRole === 'manager' ? 'Sarah Manager' : 'Admin User',
        role: selectedRole,
        department: selectedRole === 'admin' ? 'IT Administration' : 'Water Resources'
      };
      setUser(userData);
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            eOffice Productivity Portal
          </h1>
          <p className="text-gray-600">Government Productivity Tracker</p>
          <div className="w-16 h-1 bg-blue-500 mx-auto mt-4 rounded"></div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Select Your Role
            </label>
            <div className="space-y-3">
              {roles.map((role) => (
                <label key={role.value} className="flex items-center">
                  <input
                    type="radio"
                    name="role"
                    value={role.value}
                    checked={selectedRole === role.value}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-3 text-gray-700 font-medium">
                    {role.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <button
            onClick={handleLogin}
            disabled={!selectedRole}
            className={`w-full py-3 px-4 rounded-lg font-medium transition duration-200 ${
              selectedRole
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Login to eOffice
          </button>

          <div className="text-center text-sm text-gray-500 mt-4">
            <p>Demo Application - Select any role to continue</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;