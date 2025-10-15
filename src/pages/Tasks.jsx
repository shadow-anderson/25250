import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import TaskTable from '../components/TaskTable';
import useAppStore from '../store/useAppStore';

const Tasks = () => {
  const navigate = useNavigate();
  const { tasks, role } = useAppStore();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter tasks based on status and search term
  const filteredTasks = tasks.filter(task => {
    const matchesFilter = filter === 'all' || task.status.toLowerCase() === filter;
    const matchesSearch = task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.assignedTo.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const taskStats = {
    total: tasks.length,
    completed: tasks.filter(t => t.status === 'Completed').length,
    ongoing: tasks.filter(t => t.status === 'Ongoing').length,
    pending: tasks.filter(t => t.status === 'Pending').length,
    notStarted: tasks.filter(t => t.status === 'Not Started').length
  };

  const filterOptions = [
    { value: 'all', label: 'All Tasks', count: taskStats.total },
    { value: 'completed', label: 'Completed', count: taskStats.completed },
    { value: 'ongoing', label: 'Ongoing', count: taskStats.ongoing },
    { value: 'pending', label: 'Pending', count: taskStats.pending },
    { value: 'not started', label: 'Not Started', count: taskStats.notStarted }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header with Breadcrumb */}
          <div className="mb-8">
            <nav className="flex mb-4" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <button
                    onClick={() => navigate('/dashboard')}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Dashboard
                  </button>
                </li>
                <li>
                  <div className="flex items-center">
                    <span className="mx-2 text-gray-400">/</span>
                    <span className="text-gray-500 font-medium">Tasks</span>
                  </div>
                </li>
              </ol>
            </nav>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Tasks</h1>
                <p className="mt-2 text-gray-600">
                  Manage and track your assigned tasks
                </p>
              </div>
              <button
                onClick={() => navigate('/dashboard')}
                className="mt-4 sm:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition duration-200"
              >
                Back to Dashboard
              </button>
            </div>
          </div>

          {/* Task Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            {filterOptions.map((option) => (
              <div
                key={option.value}
                className={`bg-white rounded-lg p-4 shadow-sm border-2 transition-colors duration-200 ${
                  filter === option.value 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {option.count}
                  </div>
                  <div className="text-sm text-gray-600">
                    {option.label}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Filters and Search */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              {/* Search */}
              <div className="flex-1 max-w-md">
                <label htmlFor="search" className="sr-only">Search tasks</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-400">🔍</span>
                  </div>
                  <input
                    type="text"
                    id="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Search tasks..."
                  />
                </div>
              </div>

              {/* Filter Buttons */}
              <div className="flex flex-wrap gap-2">
                {filterOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setFilter(option.value)}
                    className={`px-4 py-2 rounded-lg font-medium transition duration-200 ${
                      filter === option.value
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {option.label}
                    <span className="ml-1 text-xs opacity-75">({option.count})</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Task Table */}
          <div className="mb-6">
            <TaskTable tasks={filteredTasks} showActions={true} />
          </div>

          {/* No Results Message */}
          {filteredTasks.length === 0 && (searchTerm || filter !== 'all') && (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <div className="text-gray-400 text-4xl mb-4">📋</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No tasks found
              </h3>
              <p className="text-gray-500 mb-4">
                {searchTerm 
                  ? `No tasks match "${searchTerm}"` 
                  : `No tasks with status "${filter}"`
                }
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilter('all');
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition duration-200"
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* Task Summary */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Task Summary
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {Math.round((taskStats.completed / taskStats.total) * 100)}%
                </div>
                <div className="text-sm text-gray-600">Completion Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {taskStats.ongoing}
                </div>
                <div className="text-sm text-gray-600">Active Tasks</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {taskStats.pending}
                </div>
                <div className="text-sm text-gray-600">Pending Review</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-600">
                  {taskStats.notStarted}
                </div>
                <div className="text-sm text-gray-600">Not Started</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Tasks;