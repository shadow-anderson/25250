# eOffice Productivity Tracker

A Government Productivity Tracker web application built with React 18, providing task management and performance monitoring for government employees, managers, and administrators.

## 🚀 Features

- **Role-based Authentication**: Login as Employee, Manager, or Admin
- **Dashboard**: KPI cards showing completion rates, turnaround times, and quality scores
- **Task Management**: View, filter, and manage tasks with progress tracking
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Updates**: Mark tasks as complete and see immediate updates

## 🛠️ Tech Stack

- **Frontend**: React 18 with Vite
- **Routing**: React Router v6
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **Build Tool**: Vite

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Top navigation bar
│   ├── Sidebar.jsx         # Side navigation (responsive)
│   ├── KPICard.jsx         # Key Performance Indicator cards
│   └── TaskTable.jsx       # Task table with actions
├── pages/
│   ├── Login.jsx           # Login page with role selection
│   ├── Dashboard.jsx       # Main dashboard with KPIs
│   └── Tasks.jsx           # Task management page
├── store/
│   └── useAppStore.js      # Zustand store for state management
├── data/
│   ├── users.json          # Mock user data
│   ├── tasks.json          # Mock task data
│   └── performance.json    # Mock performance metrics
├── App.jsx                 # Main app component with routing
└── main.jsx               # Application entry point
```

## 🎯 Pages and Navigation

### Login (`/login`)
- Role selection: Employee, Manager, Admin
- Automatic redirect to dashboard after login
- Demo application - no real authentication

### Dashboard (`/dashboard`)
- **KPI Cards**: Task completion rate, average turnaround time, quality score
- **Productivity Score Bar**: Visual representation of overall performance
- **Recent Tasks**: Quick overview of latest tasks
- **Quick Statistics**: Summary of task metrics
- **Navigation**: Direct link to tasks page

### Tasks (`/tasks`)
- **Task Table**: Complete list of tasks with status, progress, and deadlines
- **Filtering**: Filter by task status (All, Completed, Ongoing, Pending, Not Started)
- **Search**: Search tasks by name or assigned person
- **Actions**: Mark tasks as complete
- **Statistics**: Task summary with completion rates
- **Breadcrumb Navigation**: Easy return to dashboard

## 🔄 State Management

The application uses Zustand for state management with the following structure:

```javascript
{
  role: null,              // Current user role
  user: null,              // Current user data
  tasks: [],              // Array of tasks
  performance: {},        // Performance metrics
  
  // Actions
  setRole: (role) => {},
  setUser: (user) => {},
  updateTask: (id, updates) => {},
  markTaskComplete: (id) => {},
  logout: () => {}
}
```

## 🎨 Design System

- **Colors**: Blue accent theme with status-based color coding
- **Typography**: Inter font family for clean, professional look
- **Components**: Reusable card-based design
- **Responsive**: Mobile-first design with responsive grid layouts
- **Accessibility**: Focus states and semantic HTML

## 📊 Mock Data

The application includes realistic mock data:

- **6 sample tasks** with different statuses and priorities
- **Performance metrics** for each role (Employee, Manager, Admin)
- **User profiles** with names, departments, and roles

## 🚦 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone or extract the project**
   ```bash
   cd eoffice-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Testing the Application

1. **Login Flow**:
   - Select any role (Employee/Manager/Admin)
   - Click "Login to eOffice"
   - Verify redirect to dashboard

2. **Dashboard Features**:
   - View KPI cards with different metrics
   - Check productivity score bar
   - Navigate to tasks using the button

3. **Tasks Management**:
   - Filter tasks by status
   - Search for specific tasks
   - Mark tasks as complete
   - Use breadcrumb to return to dashboard

4. **Navigation**:
   - Test navbar links
   - Verify logout functionality
   - Check protected route behavior

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌟 Key Features Demonstrated

### Authentication Simulation
- Role-based login without backend
- Protected routes with automatic redirects
- Persistent user session during navigation

### State Management
- Centralized state with Zustand
- Real-time updates when marking tasks complete
- Role-based data filtering

### User Experience
- Intuitive navigation flow
- Responsive design for all devices
- Loading states and smooth transitions
- Comprehensive task filtering and search

### Code Quality
- Component-based architecture
- Reusable UI components
- Clean separation of concerns
- Consistent styling with Tailwind CSS

## 🎯 Future Enhancements

- Real backend integration
- User authentication with JWT
- Real-time notifications
- Advanced reporting features
- File upload capabilities
- Team collaboration features

## 📝 Notes

- This is a frontend-only MVP demonstration
- All data is mock data stored in JSON files
- No real backend or database connectivity
- Designed for local development and testing

---

**Demo Application** - Government Productivity Tracker eOffice MVP  
Built with React 18, Vite, Zustand, and Tailwind CSS