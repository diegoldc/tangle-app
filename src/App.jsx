import { useState , useContext } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { AuthContext } from './context/auth.context'
import Navbar from './components/Navbar'
import Signup from './pages/auth/Signup'
import Login from './pages/auth/Login'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import ProjectPage from './pages/ProjectPage'
import AddProjectPage from './pages/AddProjectPage'
import EditProjectPage from './pages/EditProjectPage'
import FavouriteProjectsPage from './pages/FavouriteProjectsPage'
import MyNetworkPage from './pages/MyNetworkProjectsPage'
import AboutPage from './pages/AboutPage'
import NotFoundPage from './pages/NotFoundPage'

function App() {

  const {isLoggedIn, loggedUserId} = useContext(AuthContext)

  const [count, setCount] = useState(0)

  return (
    <div>
      {isLoggedIn && loggedUserId}
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile/:userId" element={<ProfilePage />} />
        <Route path="/projects/new-project" element={<AddProjectPage />} />
        <Route path="/projects/:projectId" element={<ProjectPage />} />
        <Route path="/projects/:projectId/update" element={<EditProjectPage />} />
        <Route path="/projects/favourites" element={<FavouriteProjectsPage />} />
        <Route path="/projects/my-network" element={<MyNetworkPage />} />
        <Route path='/about' element={<AboutPage />} />


        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}

export default App
