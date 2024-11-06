import service from "../services/config";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import {
  Avatar,
  Card,
  Button,
  Popover,
  Label,
  Modal,
  TextInput,
  Spinner,
  Badge,
} from "flowbite-react";
import { BiSolidLike, BiSolidDislike } from "react-icons/bi";
import imgLikes from "../assets/likes.png";
import ScreenshotsCarousel from "../components/ScreenshotsCarousel";
import { FaCalendarDays } from "react-icons/fa6";
import { AiOutlineGithub } from "react-icons/ai";
import { GrDeploy } from "react-icons/gr";
import CommentsSection from "../components/CommentsSection"
import {AuthContext} from "../context/auth.context"

function ProjectPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [projectInfo, setProjectInfo] = useState(null);

  const [likeText, setLikeText] = useState("");
  const [isLiked, setIsLiked] = useState(null);

  const { loggedUserId, isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await service.get(`/projects/${projectId}`);
      setProjectInfo(response.data);
      setLikeText(response.data.likes.length);
      if (response.data.likes.includes(loggedUserId)) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    } catch (error) {
      console.log("error al traer la data de un projecto", error);
    }
  };

  const handleLike = async () => {
    if (isLiked) {
      const newLikeArr = projectInfo.likes.filter((id) => id !== loggedUserId);
      try {
        const response = await service.patch(
          `/projects/un-likes/${projectId}`,
          { likes: newLikeArr }
        );
        setIsLiked(false);
      } catch (error) {
        console.log("error al eliminar el like", error);
      }
    } else {
      try {
        const response = await service.patch(`/projects/likes/${projectId}`, {
          userId: loggedUserId,
        });
        setIsLiked(true);
      } catch (error) {
        console.log("error al sumar un like", error);
      }
    }
    getData();
  };

  const handleDeleteProject = async () => {
    try {
      await service.delete(`/projects/${projectId}`);
      navigate("/");
    } catch (error) {
      console.log("error deleting project", error);
    }
  };

  const handleMouseOver = () => {
    if (isLiked) {
      setLikeText("Unlike");
    } else {
      setLikeText("Like");
    }
  };

  const handleMouseOut = () => {
    setLikeText(`${projectInfo.likes.length}`);
  };


  if (projectInfo === null) {
    return (
      <div>
        <Spinner />
      </div>
    );
  } else {
    const {
      name,
      github,
      deployment,
      creationDate,
      description,
      screenshots,
      tech,
      user,
      collaborators,
      likes,
    } = projectInfo;

    return (
      <div>
        <Card>
          <div className=" m-auto projectPageDisplay">
            <div className="flex flex-col justify-end px-4 pt-4 projectDetails ">
              <div className="flex flex-row justify-between">
                {user._id === loggedUserId && (
                  <Popover
                    aria-labelledby="default-popover"
                    content={
                      <div className="w-36 text-sm text-gray-500 dark:text-gray-400">
                        <div className="border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
                          <h3
                            id="default-popover"
                            className="font-semibold text-gray-900 dark:text-white"
                          >
                            Are you sure you want to delete this project?
                          </h3>
                        </div>
                        <div
                          className="px-3 py-2"
                          style={{ cursor: "pointer" }}
                          onClick={handleDeleteProject}
                        >
                          <p>Delete this project</p>
                        </div>
                      </div>
                    }
                  >
                    <Button
                      style={{
                        width: "40px",
                        height: "40px",
                        background: "transparent",
                      }}
                    >
                      <FaTrashCan color="rgb(200,200,200)" />
                    </Button>
                  </Popover>
                )}

                <div className="flex items-center gap-2">
                  <FaCalendarDays />
                  {new Date(projectInfo.creationDate).toLocaleDateString()}
                </div>
              </div>
              <h1
                style={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  overflow: "hidden",
                }}
              >
                {name.toUpperCase()}
              </h1>
              <Link to={`/profile/${user._id}`}>
                <Card className="m-7 p-0">
                  <div className="p-0 flex flex-row justify-center gap-5 items-center">
                    <Avatar size="md" img={user.img} rounded />
                    <h5 style={{ fontSize: "1.5rem", overflow: "hidden" }}>
                      {user.username}
                    </h5>
                  </div>
                </Card>
              </Link>
              <div className="flex flex-row justify-center items-center gap-5 mb-7">
                <Link to={`https://${projectInfo.github}`}>
                  <Button className="!bg-deep-purple !focus:bg-deep-purple hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">
                    <div className="flex flex-row gap-3 justify-around items-center">
                      <AiOutlineGithub />
                      <p>Git Hub Repo</p>
                    </div>
                  </Button>
                </Link>
                <Link to={`https://${projectInfo.deployment}`}>
                  <Button className="!bg-deep-purple !focus:bg-deep-purple hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">
                    <div className="flex flex-row gap-3 justify-around items-center">
                      <GrDeploy />
                      <p>Deployed Project</p>
                    </div>
                  </Button>
                </Link>
              </div>
              <h4
                style={{
                  marginBottom: "10px",
                  fontWeight: "bold",
                }}
              >
                Description:
              </h4>
              <p
                style={{
                  backgroundColor: "rgb(231, 212, 240,0.2)",
                  marginBottom: "30px",
                  padding: "10px",
                  borderRadius: "10px",
                }}
              >
                {description}
              </p>

              <p style={{ fontWeight: "bold", marginBottom: "10px" }}>
                Technologies:
              </p>
              <div className="mb-10 flex flex-row flex-wrap gap-3 bg-purple-200 dark:bg-logo-purple w-auto min-w-60 h-auto p-2 justify-center rounded-lg">
                {tech.map((tech, index) => (
                  <Badge key={index} color="purple" size="small">
                    {tech}
                  </Badge>
                ))}
              </div>

              {projectInfo.screenshots.length > 1 ? (
                <ScreenshotsCarousel projectInfo={projectInfo} />
              ) : (
                projectInfo.screenshots.length > 0 && (
                  <img src={projectInfo.screenshots[0]} />
                )
              )}

              {collaborators.length > 0 ? (
                <div
                  style={{
                    margin: "40px auto",
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ fontWeight: "bold" }}>Collaborators:</div>
                  <Avatar.Group>
                    {collaborators.map((collab, index) => {
                      return (
                        index < 4 && (
                          <Link to={`/profile/${collab._id}`}>
                            <Avatar
                              key={collab._id}
                              img={collab.img}
                              rounded
                              stacked
                            />
                          </Link>
                        )
                      );
                    })}
                    {collaborators.length > 4 && (
                      <Avatar.Counter total={collaborators.length - 4} />
                    )}
                  </Avatar.Group>
                </div>
              ) : null}

              <div className="mt-4 flex space-x-3 lg:mt-6 m-auto items-center mb-4 ">
                <Button
                  className="!bg-deep-purple !focus:bg-deep-purple hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800 p-0"
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                  onClick={handleLike}
                >
                  <div className=" flex flex-row w-12 h-6 items-center justify-around">
                    {isLiked ? (
                      <BiSolidDislike
                        className={`!h-4 w-auto ${
                          likeText === "Unlike" && "hidden"
                        } `}
                      />
                    ) : (
                      <BiSolidLike className="!h-4 w-auto" />
                    )}

                    <span>{likeText}</span>
                  </div>
                </Button>

                {user._id === loggedUserId && (
                  <Link to={`/projects/${projectId}/update`}>
                    <Button className="!bg-deep-purple !focus:bg-deep-purple hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">
                      Edit
                    </Button>
                  </Link>
                )}
              </div>
            </div>
            <CommentsSection />
            </div>
            </Card>
      </div>
    );
  }
}

export default ProjectPage;
