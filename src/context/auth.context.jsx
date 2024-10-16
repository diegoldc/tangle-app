import axios from "axios";
import { createContext, useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;
const AuthContext = createContext()

function AuthWrapper (props) {


  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loggedUserId, setLoggedUserId] = useState(null)
  const [isValidatingToken, setIsValidatingToken] = useState(true)

  useEffect(() => {

    authenticateUser()
  
  }, [])
  
  const authenticateUser = async () => {
    
    
    try {
      const authToken = localStorage.getItem("authToken")
      const response = await axios.get(`${API_URL}/api/auth/verify`,{
        headers:{
          authorization: `Bearer ${authToken}`
        }
      })
      console.log(response)
      setIsLoggedIn(true)
      setLoggedUserId(response.data._id)
      setIsValidatingToken(false)

    } catch (error) {
      setIsLoggedIn(false)
      setLoggedUserId(null)
      setIsValidatingToken(true)
    }

  }
  const passedContext = {
    isLoggedIn,
    loggedUserId,
    authenticateUser
  }

  if(isValidatingToken) {
    return <h3>...Validando</h3>
  }

  return (
    <AuthContext.Provider value={passedContext}>
      {props.children}
    </AuthContext.Provider>
  )

}

export {
  AuthContext,
  AuthWrapper
}

