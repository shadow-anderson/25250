import React from 'react';
import Navbar from '../components/Navbar';
import AIInsightsCard from '../components/AIInsightsCard';

const AIInsightsDemo = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-20 pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-6 rounded-xl shadow-lg">
              <h1 className="text-3xl font-bold mb-2">
                🧩 AI Insights Demo
              </h1>
              <p className="text-purple-100">
                Intelligent productivity analytics powered by artificial intelligence
              </p>
            </div>
          </div>

          {/* Demo Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Multiple AI Insights Cards for Demo */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 text-center">
                📊 Productivity Analytics
              </h2>
              <AIInsightsCard />
            </div>
            
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 text-center">
                🤖 Smart Recommendations
              </h2>
              <AIInsightsCard />
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              AI Insights Features
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-3xl mb-2">🧠</div>
                <h4 className="font-semibold text-gray-800 mb-2">Smart Analysis</h4>
                <p className="text-sm text-gray-600">
                  AI-powered analysis of productivity patterns and performance trends
                </p>
              </div>
              
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl mb-2">📈</div>
                <h4 className="font-semibold text-gray-800 mb-2">Real-time Insights</h4>
                <p className="text-sm text-gray-600">
                  Dynamic recommendations based on current task performance and deadlines
                </p>
              </div>
              
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-3xl mb-2">🎯</div>
                <h4 className="font-semibold text-gray-800 mb-2">Actionable Advice</h4>
                <p className="text-sm text-gray-600">
                  Specific suggestions for improving efficiency and meeting targets
                </p>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-purple-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              💡 How to Use AI Insights
            </h3>
            
            <div className="space-y-3 text-gray-700">
              <div className="flex items-start space-x-3">
                <span className="text-purple-600 font-bold">1.</span>
                <span>Click the <strong>"Refresh Insight"</strong> button to generate new AI analysis</span>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-purple-600 font-bold">2.</span>
                <span>Watch the <strong>trend badges</strong> change based on the insight content</span>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-purple-600 font-bold">3.</span>
                <span>Notice the <strong>smooth animations</strong> and toast notifications</span>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-purple-600 font-bold">4.</span>
                <span>The <strong>AI confidence indicator</strong> shows analysis reliability</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="mt-8 text-center space-x-4">
            <button
              onClick={() => window.location.href = '/dashboard'}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              📊 View Dashboard
            </button>
            <button
              onClick={() => window.location.href = '/task-tracker'}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              🎯 Task Tracker
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AIInsightsDemo;