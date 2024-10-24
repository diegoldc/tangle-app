import service from "../services/config";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
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
import { FaTrashCan } from "react-icons/fa6";
import { FiEdit3 } from "react-icons/fi";
import { BiSolidLike, BiSolidDislike } from "react-icons/bi";
import imgLikes from "../assets/likes.png";
import ScreenshotsCarousel from "../components/ScreenshotsCarousel";
import { FaCalendarDays } from "react-icons/fa6";
import { AiOutlineGithub } from "react-icons/ai";
import { GrDeploy } from "react-icons/gr";

function ProjectPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [projectInfo, setProjectInfo] = useState(null);
  const [allComments, setAllComments] = useState(null);
  const [likeText, setLikeText] = useState("");
  const [isLiked, setIsLiked] = useState(null);
  const [commentContent, setCommentContent] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [editedContent, setEditedContent] = useState("");
  const [editCommentId, setEditCommentId] = useState("");

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
      const commentsList = await service.get(`/comments/${projectId}`);
      setAllComments(commentsList.data);
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

  const handleAddComment = async (e) => {
    e.preventDefault();
    const newComment = {
      content: commentContent,
      user: loggedUserId,
      project: projectId,
    };
    try {
      const response = await service.post(`/comments`, newComment);
      getData();
      setCommentContent("");
    } catch (error) {
      console.log("error al postear un comentario", error);
    }
  };

  const handleDeleteComment = async (id) => {
    try {
      await service.delete(`/comments/${id}`);
      getData();
    } catch (error) {
      console.log("error al eliminar comentario", error);
    }
  };

  const handleOpenEditor = (commentToEdit, id) => {
    setOpenModal(true);
    setEditedContent(commentToEdit);
    setEditCommentId(id);
  };

  const handleEditComment = async (e) => {
    e.preventDefault();
    const commentToEditObj = {
      user: loggedUserId,
      project: projectId,
      content: editedContent,
    };

    try {
      await service.put(`/comments/${editCommentId}`, commentToEditObj);
      getData();
    } catch (error) {
      console.log("error al editar el comentario", error);
    }

    setOpenModal(false);
  };

  if (projectInfo === null || allComments === null) {
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

            <div className="bg-white dark:bg-gray-900 pb-8 lg:pb-16 antialiased projectComments">
              <div className="max-w-2xl mx-auto px-4">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                    Discussion
                  </h2>
                </div>
                {isLoggedIn && (
                  <form className="mb-6" onSubmit={handleAddComment}>
                    <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                      <label htmlFor="comment" className="sr-only">
                        Your comment
                      </label>
                      <textarea
                        id="comment"
                        rows="6"
                        className="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                        placeholder="Write a comment..."
                        required
                        value={commentContent}
                        onChange={() => {
                          setCommentContent(event.target.value);
                        }}
                      ></textarea>
                    </div>
                    <Button
                      className="!bg-deep-purple !focus:bg-deep-purple hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
                      type="submit"
                    >
                      Post comment
                    </Button>
                  </form>
                )}
                {allComments.length === 0 && <p>No comments posted yet.</p>}
                {allComments.map((comment, index) => {
                  return (
                    <>
                      {index !== 0 && <hr />}
                      <article
                        key={index}
                        className="p-6 text-base bg-white rounded-lg dark:bg-gray-900"
                        style={{ overflow: "hidden" }}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex justify-start items-start">
                            <div className="flex justify-start mr-4 items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                              <img
                                className="mr-2 w-6 h-6 rounded-full"
                                src={comment.user.img}
                                alt="Michael Gough"
                              />
                              {comment.user.username}
                            </div>
                            <div
                              className="text-gray-500 dark:text-gray-400 max-w-full"
                              style={{ overflow: "hidden" }}
                            >
                              {comment.content}
                              {comment.createdAt !== comment.updatedAt && (
                                <span
                                  style={{
                                    fontWeight: "bold",
                                    fontSize: "0.6rem",
                                    color: "grey",
                                  }}
                                >
                                  &nbsp;&nbsp;(Editado)
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <footer className="flex items-center mt-4 space-x-4">
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            <time dateTime={comment.createdAt}>
                              {
                                new Date(comment.createdAt)
                                  .toISOString()
                                  .split("T")[0]
                              }
                            </time>
                          </p>
                          {comment.user._id === loggedUserId && (
                            <>
                              <Button
                                style={{
                                  width: "40px",
                                  height: "40px",
                                  background: "transparent",
                                  color: "grey",
                                }}
                                onClick={() =>
                                  handleOpenEditor(comment.content, comment._id)
                                }
                              >
                                <FiEdit3 color="rgb(200,200,200)" />
                              </Button>
                              <Popover
                                aria-labelledby="default-popover"
                                trigger="hover"
                                content={
                                  <div className="w-36 text-sm text-gray-500 dark:text-gray-400">
                                    <div className="border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
                                      <h3
                                        id="default-popover"
                                        className="font-semibold text-gray-900 dark:text-white"
                                      >
                                        Delete comment?
                                      </h3>
                                    </div>
                                    <div
                                      className="px-3 py-2"
                                      style={{ cursor: "pointer" }}
                                      onClick={() =>
                                        handleDeleteComment(comment._id)
                                      }
                                    >
                                      <p>Yes</p>
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
                            </>
                          )}
                        </footer>
                      </article>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </Card>
        <Modal
          show={openModal}
          size="xl"
          onClose={() => setOpenModal(false)}
          popup
        >
          <Modal.Header>Edit your comment:</Modal.Header>
          <Modal.Body>
            <div className="space-y-6">
              <textarea
                id="content"
                value={editedContent}
                onChange={() => setEditedContent(event.target.value)}
                required
                style={{ width: "100%", height: "7rem" }}
              />
              <div className="w-full">
                <Button
                  className="!bg-deep-purple !focus:bg-deep-purple hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
                  onClick={(close) => handleEditComment(close)}
                >
                  Submit
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default ProjectPage;
