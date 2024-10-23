import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { GiHamburgerMenu } from "react-icons/gi";
import service from "../services/config";
import { Spinner } from "flowbite-react";
import { ThemeContext } from "../context/theme.context";
import { GiSpiderWeb } from "react-icons/gi";
import { IoHomeOutline } from "react-icons/io5";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { RiLoginBoxLine } from "react-icons/ri";
import { BsPencilSquare } from "react-icons/bs";

function Navbar() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [userImage, setUserImage] = useState(null);
  const { isLoggedIn, loggedUserId, authenticateUser } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, [isLoggedIn]);

  const getData = async () => {
    if(isLoggedIn){
      try {
        const response = await service.get(`/users/${loggedUserId}`);
        setUserImage(response.data.img);
      } catch (error) {
        console.log("error al traer la imagen de usuario");
      }
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

  return (
    <nav className="navBar">
      <Link to="/">
        <button className="navButton">
        <IoHomeOutline style={{width:"40px", height:"auto"}}/>
        </button>
      </Link>
      {isLoggedIn && (
        <Link to="/projects/my-network">
          <button className="navButton">
          <GiSpiderWeb style={{width:"40px", height:"auto"}}/>
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
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          </button>
        </Link>
      )}
      <button className="navButton" onClick={toggleSettings}>
      <GiHamburgerMenu style={{width:"40px", height:"auto"}}/>
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
            <RiLogoutBoxRLine style={{width:"40px", height:"auto"}}/>
          </button>
        ) : (
          <>
            <Link to="/login">
              <button className="navButton"><RiLoginBoxLine style={{width:"40px", height:"auto"}}/></button>
            </Link>
            <Link to="/signup">
              <button className="navButton"><BsPencilSquare style={{width:"40px", height:"auto"}} /></button>
            </Link>
          </>
        )}
        <button className="close" onClick={toggleSettings}></button>
      </div>
    </nav>
  );
}

export default Navbar;