import { Button, Label, TextInput } from "flowbite-react";
import AddTechnologies from "../components/AddTechnologies";
import AddCollaborators from "../components/AddCollaborators";
import { useState , useContext , useEffect } from "react";
import { useNavigate , useParams } from "react-router-dom";
import service from "../services/config";
import AddScreenshots from "../components/AddScreenshots";


function EditProjectPage() {

  const navigate = useNavigate()

  const {projectId} = useParams()

  const [name, setName] = useState("")
  const [github, setGithub] = useState("")
  const [deployment, setDeployment] = useState("")
  const [creationDate, setCreationDate] = useState(null)
  const [description, setDescription] = useState("")
  const [screenshots, setScreenshots] = useState([])
  const [tech, setTech] = useState([])
  const [collaboratorsObj, setCollaboratorsObj] = useState([])
  const [likes, setLikes] = useState([])
  const [user, setUser] = useState("")

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      const response = await service.get(`/projects/${projectId}`)
      console.log("lo que llega",response.data)
      setName(response.data.name)
      setGithub(response.data.github)
      setDeployment(response.data.deployment)
      setCreationDate(response.data.creationDate.toString().split("T")[0])
      setDescription(response.data.description)
      setScreenshots(response.data.screenshots)
      setTech(response.data.tech)
      setCollaboratorsObj(response.data.collaborators)
      setLikes(response.data.likes)
      setUser(response.data.user)
    } catch (error) {
      console.log("error al traer la info del proyecto",error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const collaborators = collaboratorsObj.map((obj) => obj._id)

    const editedProject = {
      name,
      github,
      deployment,
      creationDate,
      description,
      screenshots,
      tech,
      user:user._id,
      collaborators:collaborators,
      likes
    }

    try {
      await service.put(`/projects/${projectId}`,editedProject)
      console.log("lo que se va",editedProject)
      navigate(`/projects/${projectId}`)
    } catch (error) {
      console.log("error al postear la edicion de proyecto",error)
    }
  }
  
  if(creationDate === null){
    return <div>...spinner</div>
  }

  return (
    <>
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Edit project
      </h2>
      <form className="flex max-w-lg w-full flex-col justify-center justify-items-center gap-4 mt-10" >
      <div>
        <div className="mb-2 block">
          <Label htmlFor="name" value="Project name" />
        </div>
        <TextInput
          id="name"
          type="text"
          autoComplete="on"
          value={name}
          onChange={() => setName(event.target.value)}
          required
          shadow
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="github" value="Git Hub repo URL" />
        </div>
        <TextInput
          id="github"
          type="text"
          autoComplete="off"
          value={github}
          onChange={() => setGithub(event.target.value)}
          required
          shadow
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="deployment" value="Project's deployed URL" />
        </div>
        <TextInput
          id="deployment"
          type="text"
          autoComplete="off"
          value={deployment}
          onChange={() => setDeployment(event.target.value)}
          shadow
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="date" value="Creation date" />
        </div>
        <TextInput
          id="date"
          type="date"
          autoComplete="off"
          value={creationDate}
          onChange={() => setCreationDate(event.target.value)}
          required
          shadow
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="description" value="Decription" />
        </div>
        <TextInput
          id="description"
          type="textarea"
          autoComplete="off"
          value={description}
          onChange={() => setDescription(event.target.value)}
          shadow
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="screenshots" value="Add screenshots" />
        </div>
          <AddScreenshots screenshots={screenshots} setScreenshots={setScreenshots} />
      </div>


      
      <div>
        <div className="mb-2 block">
          <Label htmlFor="tech" value="What technologies did you use?" />
        </div>
        <AddTechnologies tech={tech} setTech={setTech} />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="collaborators" value="Add colaborators" />
        </div>
        <AddCollaborators collaborators={collaboratorsObj} setCollaborators={setCollaboratorsObj} />
      </div>
      <Button onClick={handleSubmit} className="w-2/3 m-auto mt-6">Upload your project</Button>
      </form>
    </>
  )
}

export default EditProjectPage