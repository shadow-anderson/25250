import { create } from 'zustand';
import tasksData from '../data/tasks.json';
import performanceData from '../data/performance.json';

const useAppStore = create((set, get) => ({
      // Authentication state
      role: null,
      user: null,
      
      // Tasks state
      tasks: tasksData,
      
      // Performance data
      performance: performanceData,
      
      // Actions
      setRole: (role) => set({ role }),
      
      setUser: (user) => set({ user }),
      
      setTasks: (tasks) => set({ tasks }),
      
      updateTask: (id, updates) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, ...updates } : task
          ),
        })),
      
      markTaskComplete: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id 
              ? { ...task, status: 'Completed', progress: 100 } 
              : task
          ),
        })),
      
      // Get tasks filtered by current user role
      getTasksByRole: () => {
        const { tasks, role } = get();
        if (role === 'admin') {
          return tasks; // Admin sees all tasks
        }
        // Filter tasks for employee/manager (basic filtering)
        return tasks;
      },
      
      // Get performance data for current role
      getPerformanceByRole: () => {
        const { performance, role } = get();
        return performance[role] || performance.employee;
      },
      
      // Logout action
      logout: () => set({ role: null, user: null }),
      
      // Check if user is authenticated
      isAuthenticated: () => {
        const { role } = get();
        return role !== null;
      },
    })
);

export default useAppStore;