import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AdminJobs from "./components/employee/AdminJobs"
import Applicants from './components/employee/Applicants'
import Companies from './components/employee/Companies'
import CompanyCreate from './components/employee/CompanyCreate'
import CompanySetup from './components/employee/CompanySetup'
import PostJob from './components/employee/PostJob'
import ProtectedRoute from './components/employee/ProtectedRoute'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import JobDescription from './components/JobDescription'
import Browse from './pages/BrowsePage'
import Home from './pages/HomePage'
import Jobs from './pages/JobsPage'
import Profile from './pages/StudentProfilePage'
import Navbar from './components/Navbar'
import AdminDashboard from './components/admin/AdminDashboard'

const appRouter = createBrowserRouter([
  <Navbar/>,
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: "/jobs",
    element: <Jobs />
  },
  {
    path: "/description/:id",
    element: <JobDescription />
  },
  {
    path: "/browse",
    element: <Browse />
  },
  {
    path: "/profile",
    element: <Profile />
  },
  // Recruiter
  {
    path:"/companies",
    element: <ProtectedRoute><Companies/></ProtectedRoute>
  },
  {
    path:"/companies/create",
    element: <ProtectedRoute><CompanyCreate/></ProtectedRoute> 
  },
  {
    path:"/companies/:id",
    element:<ProtectedRoute><CompanySetup/></ProtectedRoute> 
  },
  {
    path:"/addjob",
    element:<ProtectedRoute><AdminJobs/></ProtectedRoute> 
  },
  {
    path:"/addjob/create",
    element:<ProtectedRoute><PostJob/></ProtectedRoute> 
  },
  {
    path:"/jobs/:id/applicants",
    element:<ProtectedRoute><Applicants/></ProtectedRoute> 
  },
    // Admin
  
  {
     path:"/admin/dashboard",
     element:<AdminDashboard/>
  },
  {
     path:"/admin/dashboard/company/:id",
     element:<AdminDashboard/>
  },

])
function App() {

  return (
    <div className='min-h-screen   relative overflow-hidden '>
		{/* Background gradient */}
		<div className='absolute inset-0 overflow-hidden'>
			<div className='absolute inset-0'>
				<div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full ' />
			</div>
 
		</div>
    
			<div className='relative z-50 '>
      
      <RouterProvider router={appRouter} />
    </div>
    </div>
    
  )
}

export default App
