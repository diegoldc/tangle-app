import service from "../services/config";
import { useState , useEffect , useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from '../context/auth.context'
import { useParams } from "react-router-dom";

function ProjectPage() {

  const {projectId} = useParams()

  const [projectInfo, setProjectInfo] = useState(null)
  const [allComments, setAllComments] = useState(null)

  const {loggedUserId} = useContext(AuthContext)

  useEffect(() => {
    getData()
  },[])

  const getData = async () => {
    try {
      const response = await service.get(`/projects/${projectId}`)
      setProjectInfo(response.data)
      console.log(response.data)
      const commentsList = await service.get(`/comments/${projectId}`)
      setAllComments(commentsList.data)
      console.log(commentsList.data)
    } catch (error) {
      console.log("error al traer la data de un projecto",error)
    }
  }
  
  if(projectInfo === null || allComments === null){
    return <div>...spinner</div>
  } else {
    const {name,github,deployment,creationDate,description,screenshots,tech,user,collaborators,likes} = projectInfo
    console.log(name)
  return (
    <div>
      <h1>{name}</h1>
      <h2>{user.username}</h2>
      <p>{description}</p>
      <h3>Likes: {likes.length}</h3>
      <h4>Comments:</h4>
      {allComments.map((comment,index) => {
        return(
          <div key={index}>
          <h5>{comment.user.username}</h5>
          <p>{comment.content}</p>
        </div>
        )
      })}
    </div>
  )}
}

export default ProjectPage