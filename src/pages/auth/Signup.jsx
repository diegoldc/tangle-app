import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import tailwindConfig from "../../../tailwind.config";
const API_URL = import.meta.env.VITE_API_URL;

function Signup() {

  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState(null)

  const handleUsernameChange = (e) => setUsername(e.target.value)
  const handlePasswordChange = (e) => setPassword(e.target.value)

  const handleSignup = async (e) => {
    e.preventDefault()
    
    try {
      
      const newUser = {
        username,
        password
      }

      await axios.post(`${API_URL}/api/auth/signup`, newUser)

      navigate("/login")

    } catch (error) {
      console.log(error)

      if (error.response.status === 400) {
        setErrorMessage(error.response.data.message)
      } else {
        //!aquí debería haber redirección a /error404
      }
    }
  }

  return (
    // <div>

    //   <h1>Registro</h1>

    //   <form onSubmit={handleSignup}>

    //     <label>Username</label>
    //   </form>
    // </div>


    <form className="w-full max-w-sm" onSubmit={handleSignup}>

    <div className="flex items-center border-b border-teal-500 py-2">

      <input 
      className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
      type="text"
      placeholder="Username"
      name="username"
      id="username"
      value={username}
      onChange={handleUsernameChange}
      autoComplete="off"
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
        Sign Up
      </button>
      {errorMessage && <p>{errorMessage}</p> }
    </div>
  </form>
  )
}

export default Signup