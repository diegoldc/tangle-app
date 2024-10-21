import { FileInput, Button, Label, TextInput } from "flowbite-react";
import AddTechnologies from "../components/AddTechnologies";
import AddCollaborators from "../components/AddCollaborators";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import service from "../services/config";
import { AuthContext } from "../context/auth.context";

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
  const [uploadPic, setUploadPic] = useState("");
  const [file, setFile] = useState("");

  const handleImgChange = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
    previewFiles(e.target.files[0]);
    console.log(uploadPic);
  };

  const previewFiles = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setUploadPic(reader.result);
    };
  };

  const handlePicUpload = async () => {
    try {
      const response = await service.post(
        "/upload-img",
        { image: uploadPic },
        {}
      );
      if (screenshots.length === 0) {
        setScreenshots([response.data.url]);
      } else {
        setScreenshots((current) => [...current, response.data.url]);
      }
      console.log(response.data);
    } catch (error) {
      console.log("error al subir una imagen a la nube", error);
    }
  };

  const handleDeleteSrceenshot = (imgToDelete) => {
    setScreenshots(screenshots.filter((img) => img !== imgToDelete));
  };

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
    <>
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Post a new project
      </h2>
      <form
        className="flex max-w-lg w-full flex-col justify-center justify-items-center gap-4 mt-10"
        onSubmit={handleSubmit}
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
          <input
            id="screenshots"
            type="file"
            autoComplete="off"
            // value={screenshots}
            onChange={handleImgChange}
            accept="image/png, image/jpeg, image/jpg"
          />
          <Button type="button" onClick={handlePicUpload}>
            Add
          </Button>
        </div>
        <ul
          style={{
            display: "flex",
            flexWrap: "wrap",
            width: "100%",
            gap: "10px",
          }}
        >
          {screenshots.length > 0 &&
            screenshots.map((img, index) => {
              return (
                <li key={index} style={{ position: "relative" }}>
                  <img src={img} style={{ height: "80px", width: "auto" }} />
                  <button
                    onClick={() => {
                      handleDeleteSrceenshot(img);
                    }}
                    style={{
                      position: "absolute",
                      color: "red",
                      left: "90%",
                      top: "0px",
                    }}
                  >
                    x
                  </button>
                </li>
              );
            })}
        </ul>

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
        <Button type="submit" className="w-2/3 m-auto mt-6">
          Upload your project
        </Button>
      </form>
    </>
  );
}

export default AddProjectPage;
