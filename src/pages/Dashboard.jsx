import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import KPICard from '../components/KPICard';
import useAppStore from '../store/useAppStore';

const Dashboard = () => {
  const navigate = useNavigate();
  const { role, getPerformanceByRole, tasks } = useAppStore();
  const performance = getPerformanceByRole();

  // Calculate some real-time stats from tasks
  const userTasks = tasks.filter(task => {
    // Simple filtering - in real app would filter by actual user
    return true;
  });

  const completedTasks = userTasks.filter(task => task.status === 'Completed').length;
  const totalTasks = userTasks.length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const ProductivityScoreBar = ({ score }) => (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Overall Productivity Score
      </h3>
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Current Score</span>
            <span>{score}/100</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className={`h-4 rounded-full transition-all duration-500 ${
                score >= 80 ? 'bg-green-500' : 
                score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${score}%` }}
            ></div>
          </div>
        </div>
        <div className={`text-2xl font-bold ${
          score >= 80 ? 'text-green-500' : 
          score >= 60 ? 'text-yellow-500' : 'text-red-500'
        }`}>
          {score}
        </div>
      </div>
      <div className="mt-3 text-sm text-gray-600">
        {score >= 80 ? 'Excellent performance! Keep it up.' :
         score >= 60 ? 'Good performance. Room for improvement.' :
         'Performance needs attention. Consider reviewing workflow.'}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Dashboard
            </h1>
            <p className="mt-2 text-gray-600">
              Welcome back! Here's your productivity overview.
            </p>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <KPICard
              title="Task Completion Rate"
              value={performance.completion || completionRate}
              unit="%"
              icon="✅"
              color="green"
              subtitle={`${completedTasks} of ${totalTasks} tasks completed`}
            />
            <KPICard
              title="Average Turnaround Time"
              value={performance.turnaround}
              unit="days"
              icon="⏱️"
              color="blue"
              subtitle="Average time to complete tasks"
            />
            <KPICard
              title="Quality Score"
              value={performance.quality}
              unit="/100"
              icon="⭐"
              color="purple"
              subtitle="Based on task reviews and feedback"
            />
          </div>

          {/* Productivity Score */}
          <div className="mb-8">
            <ProductivityScoreBar score={performance.score} />
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Recent Tasks Overview */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Recent Tasks
              </h3>
              <div className="space-y-3">
                {userTasks.slice(0, 3).map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {task.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        Due: {new Date(task.deadline).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        task.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        task.status === 'Ongoing' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {task.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => navigate('/tasks')}
                className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition duration-200"
              >
                View All Tasks
              </button>
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Quick Statistics
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tasks Completed This Month</span>
                  <span className="text-xl font-bold text-green-600">
                    {performance.tasksCompleted || completedTasks}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tasks In Progress</span>
                  <span className="text-xl font-bold text-blue-600">
                    {performance.tasksInProgress || userTasks.filter(t => t.status === 'Ongoing').length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Average Response Time</span>
                  <span className="text-xl font-bold text-purple-600">
                    {performance.avgResponseTime || '2.1 days'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="text-center">
            <button
              onClick={() => navigate('/tasks')}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-lg font-medium text-lg shadow-lg hover:shadow-xl transition duration-200"
            >
              Go to Tasks
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;