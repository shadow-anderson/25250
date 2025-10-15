import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import useAppStore from './store/useAppStore';
import { Toaster } from '@/components/ui/toaster';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import TaskTracker from './pages/TaskTracker';
import AIInsightsDemo from './pages/AIInsightsDemo';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { role } = useAppStore();
  
  if (!role) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

// Public Route component (redirects to dashboard if already logged in)
const PublicRoute = ({ children }) => {
  const { role } = useAppStore();
  
  if (role) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route 
            path="/login" 
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } 
          />
          
          {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/tasks" 
            element={
              <ProtectedRoute>
                <Tasks />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/task-tracker" 
            element={
              <ProtectedRoute>
                <TaskTracker />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/ai-insights" 
            element={
              <ProtectedRoute>
                <AIInsightsDemo />
              </ProtectedRoute>
            } 
          />
          
          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;