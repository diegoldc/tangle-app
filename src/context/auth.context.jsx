import { Spinner } from "flowbite-react";
import service from "../services/config";
import { createContext, useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;
const AuthContext = createContext();

function AuthWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedUserId, setLoggedUserId] = useState(null);
  const [isValidatingToken, setIsValidatingToken] = useState(true);
  const [loggedUserImg, setLoggedUserImg] = useState(null);
  const [loggedUserName, setLoggedUserName] = useState(null);

  useEffect(() => {
    authenticateUser();
  }, []);

  const authenticateUser = async () => {
    try {
      const response = await service.get(`/auth/verify`);
      const userData = await service.get(`/users/${response.data._id}`);
      setIsLoggedIn(true);
      setLoggedUserId(response.data._id);
      setLoggedUserName(response.data.username);
      setLoggedUserImg(userData.data.img);
      setIsValidatingToken(false);
    } catch (error) {
      setIsLoggedIn(false);
      setLoggedUserId(null);
      setIsValidatingToken(false);
    }
  };

  if (isValidatingToken) {
    return (
      <h3>
        <Spinner />
      </h3>
    );
  }

  const passedContext = {
    isLoggedIn,
    loggedUserId,
    authenticateUser,
    loggedUserImg,
    loggedUserName,
    setLoggedUserImg,
    setLoggedUserName,
  };

  return (
    <AuthContext.Provider value={passedContext}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthWrapper };
