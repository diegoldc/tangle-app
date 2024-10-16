import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
const API_URL = import.meta.env.VITE_API_URL;

function Login() {

  const navigate = useNavigate()
  const {authenticateUser} = useContext(AuthContext)

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null)

  const handleUsernameChange = (e) => setUsername(e.target.value)
  const handlePasswordChange = (e) => setPassword(e.target.value)

  const handleLogin = async (e) => {
    e.preventDefault()
    
    const credentials = {
      username,
      password
    }
    
    try {


      const response = await axios.post(`${API_URL}/api/auth/login`, credentials)
      console.log(response.data.authToken)
      localStorage.setItem("authToken",response.data.authToken)
      await authenticateUser()
      navigate("/")

    } catch (error) {
      console.log(error)
    }
  }

  return (
  <form className="w-full max-w-sm" onSubmit={handleLogin}>

    <div className="flex items-center border-b border-teal-500 py-2">

      <input 
      className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
      type="text"
      placeholder="Username"
      name="username"
      id="username"
      value={username}
      onChange={handleUsernameChange}
      autoComplete="on"
      />
      <br />
      <input
      className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
      type="password"
      placeholder="Password"
      name="password"
      id="password"
      value={password}
      onChange={handlePasswordChange}
      autoComplete="off"
      />
      <br />
      <button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="submit">
        Log in
      </button>
      {errorMessage && <p>{errorMessage}</p> }
    </div>
  </form>
  )
}

export default Login