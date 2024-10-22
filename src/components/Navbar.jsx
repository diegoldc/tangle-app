import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import imgMenu from "../assets/burger.png"

function Navbar() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const { isLoggedIn, loggedUserId, authenticateUser } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const toggleSettings = () => setIsSettingsOpen(!isSettingsOpen);

  const handleLogout = async () => {
    try {
      localStorage.removeItem("authToken");

      await authenticateUser();

      navigate("/");
    } catch (error) {
      console.log("error al cerrar sesión", error);
    }
  };

  return (
    <nav className="navBar">
      <Link to="/">
        <button className="navButton">Home</button>
      </Link>
      {isLoggedIn && (
        <Link to="/projects/my-network">
          <button className="navButton">Network</button>
        </Link>
      )}
      {isLoggedIn && (
        <Link to={`/profile/${loggedUserId}`}>
          <button className="navButton">Profile</button>
        </Link>
      )}
      <button className="navButton" onClick={toggleSettings}>
        <img src={imgMenu} alt="menu" style={{width:"20px"}} />
      </button>
      <div className={`burgerMenu ${isSettingsOpen && "showBurger"}`}>
      <label className="ui-switch">
  <input type="checkbox"/>
  <div className="slider">
    <div className="circle"></div>
  </div>
</label>

        {isLoggedIn ? (
          <button className="navButton" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <>
            <Link to="/login">
              <button className="navButton">Log in</button>
            </Link>
            <Link to="/signup">
              <button className="navButton">Sign up</button>
            </Link>
          </>
        )}
        <Link to="/about">
          <button className="navButton">About Us</button>
        </Link>
        <a href="https://github.com/diegoldc/tangle-app">
          <button className="navButton">Client Repo</button>
        </a>
        <a href="https://github.com/diegoldc/tangle-server">
          <button className="navButton">Server Repo</button>
        </a>
        <button className="close" onClick={toggleSettings}></button>
      </div>
    </nav>
  );
}

export default Navbar;
