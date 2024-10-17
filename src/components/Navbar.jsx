import { useContext , useState } from "react"
import { useNavigate , Link } from "react-router-dom"
import { AuthContext } from "../context/auth.context"

function Navbar() {

  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const { isLoggedIn, loggedUserId , authenticateUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const toggleSettings = () => setIsSettingsOpen(!isSettingsOpen);
  
  const handleLogout = async () => {
    try {
      localStorage.removeItem("authToken")

      await authenticateUser()

      navigate("/")
      
    } catch (error) {
      console.log("error al cerrar sesión", error)
    }
  }

  return (
    <nav>
    <Link to="/" >Home</Link>
    {isLoggedIn && <Link to="/projects/my-network" >Network</Link>}
    {isLoggedIn && <Link to={`/profile/${loggedUserId}`} >Profile</Link>}
      <button onClick={toggleSettings}>Settings</button>
      <div className={`burgerMenu ${isSettingsOpen && 'showBurger'}`}>
        <span>Theme</span>
        {isLoggedIn ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
        <>
        <Link to="/login" >Log in</Link>
        <Link to="/signup" >Sign up</Link>
        </>
        )}
        <Link to="/about" >About Us</Link>
        <a href="https://github.com/diegoldc/tangle-app">Client Repo</a>
        <a href="https://github.com/diegoldc/tangle-server">Server Repo</a>
        <button onClick={toggleSettings}>X</button>
      </div>
    </nav>
  )
}

export default Navbar


