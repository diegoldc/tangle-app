import service from "../../services/config";
import { useState } from "react";
import { useNavigate , Link } from "react-router-dom";
// import tailwindConfig from "../../../tailwind.config";
import { Button, Label, TextInput, Card } from "flowbite-react";
import formLogo from "../../assets/forms-logo.png"
const API_URL = import.meta.env.VITE_API_URL;

function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmationChange = (e) => setConfirmation(e.target.value);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmation) {
      setErrorMessage("Passwords must coincide");
      return;
    }

    try {
      const newUser = {
        username,
        password,
      };

      await service.post(`/auth/signup`, newUser);

      navigate("/login");
    } catch (error) {
      console.log(error);

      if (error.response.status === 400) {
        setErrorMessage(error.response.data.message);
      } else {
        //!aquí debería haber redirección a /error404
      }
    }
  };

  return (
    <>
      <Card className="m-auto w-10/12 mt-0 authCard">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 visible">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
            Sign up to TANGLE
          </h2>
        </div>
        <div className="flex justify-center">
        <form className="flex max-w-lg w-full flex-col justify-center justify-items-center gap-4 mt-10" onSubmit={handleSignup}>
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
            <p className="m-auto mb-3 w-6/12 min-w-40 text-gray-500 dark:text-gray-500" >Password must have al least one lower case, one higher case letter and a number</p>
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
          <div>
            <div className="mb-2 block">
              <Label htmlFor="confirmation" value="Repeat password" />
            </div>
            <TextInput
            id="confirmation"
            type="password"
            autoComplete="off"
            value={confirmation}
            onChange={handleConfirmationChange}
            required
            shadow />
          </div>
          <Button type="submit" className="w-2/3 m-auto mt-6 !bg-deep-purple !hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none dark:focus:ring-purple-800">Register new account</Button>
          {errorMessage && <div className="text-red-500">{errorMessage}</div>}
          <hr />
          <p>Already registered? <Link to="/login"><span style={{textDecoration:"underline"}}>Click here</span></Link></p>
        </form>

        </div>
      </div>
            </Card>
    </>
  );
}

export default Signup;
