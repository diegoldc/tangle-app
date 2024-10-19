import { Avatar, Card, Button, Label, TextInput } from "flowbite-react";
import AddTechnologies from "../components/AddTechnologies";
import { useState , useEffect } from "react";
import { useNavigate , useParams , Link } from "react-router-dom";
import service from "../services/config";



function EditUserPage() {

  const navigate = useNavigate()
  const {userId} = useParams()

  const [username, setUsername] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [img, setImg] = useState("")
  const [github, setGithub] = useState("")
  const [linkedin, setLinkedin] = useState("")
  const [tech, setTech] = useState([])

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      const response = await service.get(`/users/${userId}`)
      console.log(response.data)
      setUsername(response.data.username)
      setFirstName(response.data.firstName)
      setLastName(response.data.lastName)
      setImg(response.data.img)
      setGithub(response.data.github)
      setLinkedin(response.data.linkedin)
      setTech(response.data.tech)
    } catch (error) {
      console.log("error al traer la info del usuario", error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const editedUser = {
      username,
      firstName,
      lastName,
      img,
      github,
      linkedin,
      tech
    }

    try {
      await service.patch(`/users/${userId}/profile`, editedUser)
      navigate(`/profile/${userId}`)
    } catch (error) {
      console.log("error al editar usuario", error)
    }
  }

  if(username === null){
    return <div>...spinner</div>
  }

  return (
    <Card className="flex flex-col justify-center justify-items-center " >
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Edit profile
      </h2>
      <form className="flex max-w-lg w-full flex-col justify-center justify-items-center gap-4 mt-10 m-auto" onSubmit={handleSubmit}>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="username" value="User name" />
        </div>
        <TextInput
          id="username"
          type="text"
          autoComplete="on"
          value={username}
          onChange={() => setUsername(event.target.value)}
          required
          shadow
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="firstName" value="First Name" />
        </div>
        <TextInput
          id="firstName"
          type="text"
          autoComplete="off"
          value={firstName}
          onChange={() => setFirstName(event.target.value)}
          required
          shadow
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="lastName" value="Last Name" />
        </div>
        <TextInput
          id="lastName"
          type="text"
          autoComplete="off"
          value={lastName}
          onChange={() => setLastName(event.target.value)}
          shadow
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="github" value="Git Hub (URL)" />
        </div>
        <TextInput
          id="github"
          type="textarea"
          autoComplete="off"
          value={github}
          onChange={() => setGithub(event.target.value)}
          addon="https://"
          shadow
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="linkedin" value="LinkedIn (URL)" />
        </div>
        <TextInput
          id="linkedin"
          type="text"
          autoComplete="off"
          value={linkedin}
          onChange={() => setLinkedin(event.target.value)}
          addon="https://"
          shadow
        />
      </div>
      
      <div>
        <div className="mb-2 block">
          <Label htmlFor="tech" value="What technologies are you familiar with?" />
        </div>
        <AddTechnologies tech={tech} setTech={setTech} />
      </div>

      <Button type="submit" className="w-2/3 m-auto mt-6">Edit your profile</Button>
      </form>
      <hr />
      <div className="flex flex-col justify-center justify-items-center">
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Change password?
      </h2>
    <Link to={`/profile/${userId}/change-password`} >
      <Button>Change Password</Button>
    </Link>
      </div>
      </Card>
  )
}

export default EditUserPage