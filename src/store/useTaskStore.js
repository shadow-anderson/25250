import { create } from 'zustand';

const useTaskStore = create((set, get) => ({
  // Sample tasks data
  tasks: [
    {
      id: 1,
      task: "Draft department annual report",
      assignedTo: "Officer Rajesh Kumar",
      deadline: "2025-10-20",
      progress: 60,
      score: 0,
      completedDate: null
    },
    {
      id: 2,
      task: "Review file disposal guidelines",
      assignedTo: "Officer Priya Sharma",
      deadline: "2025-10-25",
      progress: 30,
      score: 0,
      completedDate: null
    },
    {
      id: 3,
      task: "Update water quality database",
      assignedTo: "Officer Amit Singh",
      deadline: "2025-10-18",
      progress: 100,
      score: 0,
      completedDate: "2025-10-17"
    },
    {
      id: 4,
      task: "Conduct staff training program",
      assignedTo: "Officer Neha Gupta",
      deadline: "2025-10-30",
      progress: 85,
      score: 0,
      completedDate: null
    },
    {
      id: 5,
      task: "Infrastructure maintenance audit",
      assignedTo: "Officer Suresh Reddy",
      deadline: "2025-10-15",
      progress: 20,
      score: 0,
      completedDate: null
    }
  ],

  // Actions
  updateTaskProgress: (id, newProgress) => {
    set((state) => {
      const updatedTasks = state.tasks.map(task => 
        task.id === id 
          ? { 
              ...task, 
              progress: Math.min(100, Math.max(0, newProgress)),
              completedDate: newProgress === 100 ? new Date().toISOString().split('T')[0] : null
            }
          : task
      );
      
      return {
        tasks: updatedTasks.map(task => ({
          ...task,
          score: get().calculateTaskScore(task)
        }))
      };
    });
  },

  markTaskComplete: (id) => {
    set((state) => {
      const updatedTasks = state.tasks.map(task => 
        task.id === id 
          ? { 
              ...task, 
              progress: 100,
              completedDate: new Date().toISOString().split('T')[0]
            }
          : task
      );
      
      return {
        tasks: updatedTasks.map(task => ({
          ...task,
          score: get().calculateTaskScore(task)
        }))
      };
    });
  },

  // Calculate individual task score
  calculateTaskScore: (task) => {
    const today = new Date();
    const deadline = new Date(task.deadline);
    const completedDate = task.completedDate ? new Date(task.completedDate) : null;
    
    let score = 0;
    
    if (task.progress === 100) {
      // Base points for completion
      score = 20;
      
      // Bonus for completing before deadline
      if (completedDate && completedDate <= deadline) {
        score += 10;
      }
      
      // Penalty for late completion
      if (completedDate && completedDate > deadline) {
        score -= 5;
      }
    } else {
      // Partial completion points
      score = (task.progress / 100) * 20;
      
      // Additional penalty for overdue incomplete tasks
      if (today > deadline) {
        score -= 2;
      }
    }
    
    return Math.max(0, Math.round(score));
  },

  // Calculate total productivity score
  calculateTotalScore: () => {
    const { tasks } = get();
    return tasks.reduce((total, task) => total + task.score, 0);
  },

  // Get task status for badge coloring
  getTaskStatus: (task) => {
    const today = new Date();
    const deadline = new Date(task.deadline);
    
    if (task.progress === 100) {
      return 'completed';
    } else if (today > deadline) {
      return 'overdue';
    } else {
      return 'in-progress';
    }
  },

  // Initialize scores on first load
  initializeScores: () => {
    set((state) => ({
      tasks: state.tasks.map(task => ({
        ...task,
        score: get().calculateTaskScore(task)
      }))
    }));
  }
}));

export default useTaskStore;