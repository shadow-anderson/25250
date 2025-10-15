import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Navbar from '../components/Navbar';
import KPICard from '../components/KPICard';
import AIInsightsCard from '../components/AIInsightsCard';
import useAppStore from '../store/useAppStore';

const Dashboard = () => {
  const navigate = useNavigate();
  const { role, getPerformanceByRole, tasks } = useAppStore();
  const performance = getPerformanceByRole();

  // Mock performance data for weekly trend chart
  const performanceData = [
    { week: "Week 1", score: 70, tasks: 12, quality: 75 },
    { week: "Week 2", score: 75, tasks: 15, quality: 78 },
    { week: "Week 3", score: 78, tasks: 18, quality: 80 },
    { week: "Week 4", score: 82, tasks: 20, quality: 85 },
    { week: "Week 5", score: 85, tasks: 22, quality: 87 },
    { week: "Week 6", score: 88, tasks: 25, quality: 90 },
  ];

  // Mock weights for productivity index calculation
  const weights = {
    timeliness: 85,
    quality: 82,
    innovation: 75,
    teamwork: 90
  };

  // Calculate dynamic productivity index
  const productivityIndex = (
    weights.timeliness * 0.4 +
    weights.quality * 0.3 +
    weights.innovation * 0.2 +
    weights.teamwork * 0.1
  ).toFixed(1);

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

  const ProductivityIndexCard = () => (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl shadow-lg p-8 border border-blue-200">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          Your Productivity Index
        </h3>
        <div className="flex items-center justify-center space-x-2 mb-4">
          <span className="text-5xl font-bold text-blue-600">
            {productivityIndex}
          </span>
          <span className="text-2xl text-gray-500 font-medium">/100</span>
        </div>
        <div className="flex items-center justify-center space-x-2 mb-6">
          <span className="text-green-600 font-semibold">↗️ +3.5%</span>
          <span className="text-gray-600">since last week</span>
        </div>
        
        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <div 
            className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-1000"
            style={{ width: `${productivityIndex}%` }}
          ></div>
        </div>

        {/* Breakdown */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-white bg-opacity-50 rounded-lg p-3">
            <div className="font-semibold text-gray-700">Timeliness</div>
            <div className="text-lg font-bold text-blue-600">{weights.timeliness}%</div>
          </div>
          <div className="bg-white bg-opacity-50 rounded-lg p-3">
            <div className="font-semibold text-gray-700">Quality</div>
            <div className="text-lg font-bold text-blue-600">{weights.quality}%</div>
          </div>
          <div className="bg-white bg-opacity-50 rounded-lg p-3">
            <div className="font-semibold text-gray-700">Innovation</div>
            <div className="text-lg font-bold text-blue-600">{weights.innovation}%</div>
          </div>
          <div className="bg-white bg-opacity-50 rounded-lg p-3">
            <div className="font-semibold text-gray-700">Teamwork</div>
            <div className="text-lg font-bold text-blue-600">{weights.teamwork}%</div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Dashboard Header */}
          <div className="mb-8">
            <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6 rounded-xl shadow-lg">
              <h1 className="text-3xl font-bold">
                Government Productivity Tracker – eOffice
              </h1>
              <p className="mt-2 text-blue-100">
                Welcome back, {role}! Here's your comprehensive productivity overview.
              </p>
            </div>
          </div>

          {/* KPI Cards - 5 cards in responsive grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
            <KPICard
              title="Task Completion Rate"
              value={performance.completion || completionRate}
              unit="%"
              icon="✅"
              color="green"
              subtitle={`${completedTasks} of ${totalTasks} tasks`}
              trend="up"
              trendValue="+5.2%"
            />
            <KPICard
              title="Avg Turnaround Time"
              value="2.3"
              unit="days"
              icon="⏱️"
              color="blue"
              subtitle="Average task completion time"
              trend="down"
              trendValue="-0.4 days"
            />
            <KPICard
              title="Quality Score"
              value="82"
              unit="/100"
              icon="⭐"
              color="purple"
              subtitle="Based on peer reviews"
              trend="up"
              trendValue="+2.1%"
            />
            <KPICard
              title="Digital Adoption"
              value="65"
              unit="%"
              icon="💻"
              color="yellow"
              subtitle="Technology utilization"
              trend="up"
              trendValue="+8.3%"
            />
            <KPICard
              title="Team Collaboration"
              value="74"
              unit="%"
              icon="🤝"
              color="green"
              subtitle="Cross-department projects"
              trend="up"
              trendValue="+1.7%"
            />
          </div>

          {/* Performance Chart Section */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Weekly Productivity Trend
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="week" 
                    tick={{ fontSize: 12 }}
                    tickLine={{ stroke: '#e0e0e0' }}
                  />
                  <YAxis 
                    domain={[60, 100]}
                    tick={{ fontSize: 12 }}
                    tickLine={{ stroke: '#e0e0e0' }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e0e0e0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, fill: '#1d4ed8' }}
                    isAnimationActive={true}
                    animationDuration={1500}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Productivity Index Card */}
          <div className="mb-8">
            <ProductivityIndexCard />
          </div>

          {/* Additional Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Task Distribution Chart */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Task Distribution
              </h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { category: 'Completed', count: completedTasks, color: '#10b981' },
                    { category: 'Ongoing', count: userTasks.filter(t => t.status === 'Ongoing').length, color: '#3b82f6' },
                    { category: 'Pending', count: userTasks.filter(t => t.status === 'Pending').length, color: '#f59e0b' },
                    { category: 'Not Started', count: userTasks.filter(t => t.status === 'Not Started').length, color: '#ef4444' }
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="category" tick={{ fontSize: 12 }} />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Recent Activities
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Task completed</p>
                    <p className="text-xs text-gray-500">Water Quality Database updated</p>
                  </div>
                  <span className="text-xs text-gray-400">2h ago</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">New task assigned</p>
                    <p className="text-xs text-gray-500">Infrastructure Report due</p>
                  </div>
                  <span className="text-xs text-gray-400">5h ago</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Deadline approaching</p>
                    <p className="text-xs text-gray-500">DPR preparation due in 2 days</p>
                  </div>
                  <span className="text-xs text-gray-400">1d ago</span>
                </div>
              </div>
            </div>

            {/* AI Insights Card */}
            <div className="flex justify-center">
              <AIInsightsCard />
            </div>
          </div>

          {/* Action Button */}
          <div className="text-center">
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => navigate('/tasks')}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-lg font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
              >
                View All Tasks →
              </button>
              <button
                onClick={() => navigate('/task-tracker')}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3 rounded-lg font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
              >
                🎯 Task Tracker →
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;