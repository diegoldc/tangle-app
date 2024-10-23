import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import imgMenu from "../assets/burger.png";
import imgLogout from "../assets/logout.png";
import imgHome from "../assets/home.png";
import imgNetwork from "../assets/network.png";
import service from "../services/config";
import { Spinner } from "flowbite-react";
import { ThemeContext } from "../context/theme.context";

function Navbar() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [userImage, setUserImage] = useState(null);
  const { isLoggedIn, loggedUserId, authenticateUser } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await service.get(`/users/${loggedUserId}`);
      setUserImage(response.data.img);
    } catch (error) {
      console.log("error al traer la imagen de usuario");
    }
  };

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

  if (userImage === null) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <nav className="navBar">
      <Link to="/">
        <button className="navButton">
          <img src={imgHome} alt="menu" style={{ width: "20px" }} />
        </button>
      </Link>
      {isLoggedIn && (
        <Link to="/projects/my-network">
          <button className="navButton">
            <img src={imgNetwork} alt="menu" style={{ width: "20px" }} />
          </button>
        </Link>
      )}
      {isLoggedIn && (
        <Link to={`/profile/${loggedUserId}`}>
          <button className="navButton">
            <img
              src={userImage}
              alt="user-image"
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </button>
        </Link>
      )}
      <button className="navButton" onClick={toggleSettings}>
        <img src={imgMenu} alt="menu" style={{ width: "20px" }} />
      </button>
      <div className={`burgerMenu ${isSettingsOpen && "showBurger"}`}>
        <label className="ui-switch">
          <input
            type="checkbox"
            checked={theme === 'dark'}
            onChange={toggleTheme}
          />
          <div className="slider">
            <div className="circle"></div>
          </div>
        </label>

        {isLoggedIn ? (
          <button className="navButton" onClick={handleLogout}>
            <img src={imgLogout} alt="logout" style={{ width: "20px" }} />
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
        <button className="close" onClick={toggleSettings}></button>
      </div>
    </nav>
  );
}

export default Navbar;