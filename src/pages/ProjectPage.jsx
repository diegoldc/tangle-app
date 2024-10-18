import service from "../services/config";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useParams , useNavigate } from "react-router-dom";
import { Avatar, Card , Button, Popover } from "flowbite-react";
import { FaTrashCan } from "react-icons/fa6";

function ProjectPage() {
  const { projectId } = useParams();
  const navigate = useNavigate()

  const [projectInfo, setProjectInfo] = useState(null);
  const [allComments, setAllComments] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  const [likeText, setLikeText] = useState("")
  const [isLiked, setIsLiked] = useState(null)

  const { loggedUserId } = useContext(AuthContext);

  useEffect(() => {
    getData();
  }, [isLiked]);

  const getData = async () => {
    try {
      const response = await service.get(`/projects/${projectId}`);
      setProjectInfo(response.data);
      setLikeText(response.data.likes.length)
      if(response.data.likes.includes(loggedUserId)){
        setIsLiked(true)
      } else {
        setIsLiked(false)
      }
      console.log(response.data);
      const commentsList = await service.get(`/comments/${projectId}`);
      setAllComments(commentsList.data);
      console.log(commentsList.data);
    } catch (error) {
      console.log("error al traer la data de un projecto", error);
    }
  };

  const handleLike = async () => {
    console.log("liked",isLiked,loggedUserId)
    if(isLiked){
      const newLikeArr = projectInfo.likes.filter((id) => id !== loggedUserId)
      try {
        const response = await service.patch(`/projects/un-likes/${projectId}`,{likes:newLikeArr})
        console.log("puto boton unlike",response.data.likes)
        setIsLiked(false)
      } catch (error) {
        console.log("error al eliminar el like",error)
      }
    } else {
      try {
        const response = await service.patch(`/projects/likes/${projectId}`,{userId:loggedUserId})
        console.log("puto boton like",response.data.likes)

        setIsLiked(true)
      } catch (error) {
        console.log("error al sumar un like",error)
      }
    }
  }

  const handleDeleteProject = async () => {
    try {
      await service.delete(`/projects/${projectId}`)
      navigate("/")
    } catch (error) {
      console.log("error deleting project", error)
    }
  }
  
  const handleMouseOver = () => {
    setLikeText("Like")
  }

  const handleMouseOut = () => {
    setLikeText(`${projectInfo.likes.length}`)
  }

  const toggleDropdown = () => {
    setOpenDropdown(!openDropdown ? true : false);
  };

  if (projectInfo === null || allComments === null) {
    return <div>...spinner</div>;
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
        <Card className="max-w-sm m-auto">
          <div className="flex flex-col justify-end px-4 pt-4">
            {user._id === loggedUserId && (
              <Popover
              aria-labelledby="default-popover"
              content={
                <div className="w-36 text-sm text-gray-500 dark:text-gray-400">
                  <div className="border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
                    <h3 id="default-popover" className="font-semibold text-gray-900 dark:text-white">Are you sure you want to delete this project?</h3>
                  </div>
                  <div className="px-3 py-2" style={{cursor:"pointer"}} onClick={handleDeleteProject} >
                    <p>Delete this project</p>
                  </div>
                </div>
              }
            >
              <Button style={{width:"40px",height:"40px",background:"transparent"}} ><FaTrashCan color="rgb(200,200,200)" /></Button>
            </Popover>
            )}
            <h1>{name}</h1>
            <h2>{user.username}</h2>
            <Avatar rounded />
            <p>{description}</p>
            <div className="mt-4 flex space-x-3 lg:mt-6 m-auto">
            <Button onClick={handleLike} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} >
                {likeText}
            </Button>
              {user._id === loggedUserId && (
                <Link to={`/projects/${projectId}/update`}>
              <Button>Edit</Button>
              </Link>
              )}
            </div>
          </div>
        </Card>

        <section className="bg-white dark:bg-gray-900 py-8 lg:py-16 antialiased">
          <div className="max-w-2xl mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
                Discussion
              </h2>
            </div>
            <form className="mb-6">
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
                ></textarea>
              </div>
              <button
                type="submit"
                className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
                style={{ backgroundColor: "blue" }}
              >
                Post comment
              </button>
            </form>
            {allComments.map((comment, index) => {
              return (
                <article className="p-6 text-base bg-white rounded-lg dark:bg-gray-900">
                  <footer className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                        <img
                          className="mr-2 w-6 h-6 rounded-full"
                          src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                          alt="Michael Gough"
                        />
                        {comment.user.username}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <time dateTime={comment.createdAt}>
                          {
                            new Date(comment.createdAt)
                              .toISOString()
                              .split("T")[0]
                          }
                        </time>
                      </p>
                    </div>
                    <button
                      onClick={toggleDropdown}
                      className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 dark:text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                      type="button"
                    >
                      <svg
                        className="w-4 h-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 16 3"
                      >
                        <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                      </svg>
                      <span className="sr-only">Comment settings</span>
                    </button>

                    {openDropdown && (
                      <div
                        id="dropdownComment1"
                        className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
                      >
                        <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
                          <li>
                            <a
                              href="#"
                              className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              Edit
                            </a>
                          </li>
                          <li>
                            <a
                              href="#"
                              className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                            >
                              Remove
                            </a>
                          </li>
                        </ul>
                      </div>
                    )}
                  </footer>
                  <p className="text-gray-500 dark:text-gray-400">
                    {comment.content}
                  </p>
                  <div className="flex items-center mt-4 space-x-4">
                    <button
                      type="button"
                      className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400 font-medium"
                    >
                      <svg
                        className="mr-1.5 w-3.5 h-3.5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 18"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                        />
                      </svg>
                      Reply
                    </button>
                    {comment.createdAt !== comment.updatedAt && (
                      <p>Editado</p>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <h4>Comments:</h4>
        {/* {allComments.map((comment, index) => {
          return (
            <div key={index}>
              <h5>{comment.user.username}</h5>
              <p>{comment.content}</p>
            </div>
          );
        })} */}
      </div>
    );
  }
}

export default ProjectPage;
