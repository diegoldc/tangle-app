import { useState, useContext } from "react";
import service from "../../services/config";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import { Button, Label, TextInput, Card } from "flowbite-react";
import formLogo from "../../assets/forms-logo.png"


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


      const response = await service.post(`/auth/login`, credentials)
      console.log(response.data.authToken)
      localStorage.setItem("authToken",response.data.authToken)
      await authenticateUser()
      navigate("/")

    } catch (error) {
      console.log(error)
      setErrorMessage(error.response.data.message)
    }
  }

  return (
    <>
      <Card className="m-auto w-10/12 mt-10 authCard">

    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 visible">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          alt="Your Company"
          src={formLogo}
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Log in to your TANGLE account
        </h2>
      </div>
      <div className="flex justify-center">
      <form className="flex max-w-lg w-full flex-col justify-center justify-items-center gap-4 mt-10" onSubmit={handleLogin}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="username" value="Username" />
          </div>
          <TextInput
            id="username"
            type="text"
            autoComplete="on"
            value={username}
            onChange={handleUsernameChange}
            required
            shadow
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" value="Password" />
          </div>
          <TextInput
          id="password"
          type="password"
          autoComplete="off"
          value={password}
          onChange={handlePasswordChange}
          required
          shadow />
        </div>
        <Button type="submit" className="w-2/3 m-auto mt-6 !bg-deep-purple !hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none dark:focus:ring-purple-800">Enter your Web
        
        </Button>
        {errorMessage && <div className="text-red-500">{errorMessage}</div>}
        <hr />
        <p>Don't have an account? <Link to="/signup">Click here</Link></p>
      </form>

      </div>
    </div>
    </Card>
  </>
  )
}

export default Login