import service from "../services/config";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
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
import { FiEdit3 } from "react-icons/fi";
import { FaTrashCan } from "react-icons/fa6";

import { useParams } from "react-router-dom";
import {AuthContext} from "../context/auth.context"




function CommentsSection() {

  const { projectId } = useParams();

  const [allComments, setAllComments] = useState(null);
  const [commentContent, setCommentContent] = useState("");
  const [editCommentId, setEditCommentId] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [editedContent, setEditedContent] = useState("");


  const { loggedUserId, isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    getData()
  },[])

  const getData = async () => {
    try {
      const commentsList = await service.get(`/comments/${projectId}`);
      setAllComments(commentsList.data);
    } catch (error) {
      console.log("error al traer comentarios", error)
    }
  }

  const handleAddComment = async (e) => {
    e.preventDefault();
    const newComment = {
      content: commentContent,
      user: loggedUserId,
      project: projectId,
    };
    try {
      await service.post(`/comments`, newComment);
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

  if (allComments === null){
    return(
      <Spinner />
    )
  }

  return (
    <>
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
                            <Link to={`/profile/${comment.user._id}`}>
                              <div className="flex justify-start mr-4 items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                              <img
                                className="mr-2 w-6 h-6 rounded-full"
                                src={comment.user.img}
                                alt="Michael Gough"
                                />
                              {comment.user.username}
                              </div>
                            </Link>
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
    </>
  )
}

export default CommentsSection