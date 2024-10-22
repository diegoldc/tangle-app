import { FileInput, Button, Label, TextInput, Textarea, Card } from "flowbite-react";
import AddTechnologies from "../components/AddTechnologies";
import AddCollaborators from "../components/AddCollaborators";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import service from "../services/config";
import { AuthContext } from "../context/auth.context";
import AddScreenshots from "../components/AddScreenshots";

function AddProjectPage() {
  const { loggedUserId } = useContext(AuthContext);

  const navigate = useNavigate();
  const dateDefault = new Date(Date.now()).toISOString().split("T")[0];

  const [name, setName] = useState("");
  const [github, setGithub] = useState("");
  const [deployment, setDeployment] = useState("");
  const [creationDate, setCreationDate] = useState(dateDefault);
  const [description, setDescription] = useState("");
  const [screenshots, setScreenshots] = useState([]);
  const [tech, setTech] = useState([]);
  const [collaboratorsObj, setCollaboratorsObj] = useState([]);



  const handleSubmit = async (e) => {
    e.preventDefault();

    const collaborators = collaboratorsObj.map((obj) => obj._id);

    try {
      const newProject = {
        name,
        github,
        deployment,
        creationDate,
        description,
        screenshots,
        tech,
        user: loggedUserId,
        collaborators,
        likes: [],
      };

      const response = await service.post(`/projects`, newProject);
      console.log(response.data);
      navigate(`/projects/${response.data._id}`);
    } catch (error) {
      console.log("error al crear proyecto", error);
    }
  };
  return (
    <Card className="m-auto w-11/12 mt-10 authCard">
      <div className=" visible">
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Post a new project
      </h2>
      <form
        className="flex max-w-lg w-full flex-col justify-center justify-items-center gap-4 mt-10"
        >
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
            addon="https://"
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
          addon="https://"
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
          <Textarea
            id="description"
            type="textarea"
            autoComplete="off"
            value={description}
            onChange={() => setDescription(event.target.value)}
            shadow
            className="h-40"
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
          <AddCollaborators
            collaborators={collaboratorsObj}
            setCollaborators={setCollaboratorsObj}
            />
        </div>
        <Button onClick={handleSubmit} className="w-2/3 m-auto mt-6 !bg-deep-purple !focus:bg-deep-purple hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">
          Upload your project
        </Button>
      </form>
      </div>
    </Card>
  );
}

export default AddProjectPage;
