import { useState , useEffect , useContext } from "react"
import service from "../services/config"
import { AuthContext } from '../context/auth.context'
import { Card , Avatar } from "flowbite-react";
import { Link } from "react-router-dom"


function MyNetworkProjectsPage() {

  const {loggedUserId} = useContext(AuthContext)

  
  const [projectsArr, setProjectsArr] = useState(null)
  const [userIdArr, setUserIdArr] = useState([])

  useEffect(() => {
    getData()
  },[])

  const getData = async () => {
    try {
      const userData = await service.get(`/users/following/${loggedUserId}`)
      const followingArr = userData.data.following
      console.log(userData.data.following)
      const projectsData = await service.post("/projects/my-network",{userArray:followingArr})
      setProjectsArr(projectsData.data)
      console.log(projectsData.data)
    } catch (error) {
      console.log("error al traer los proyectos",error)
    }
  }

  if(projectsArr === null) {
    return(<div>...spinner</div>)
  }

  return (
    <Card>
    <div className="flex gap-5 flex-wrap">
      {projectsArr.length !==0 ? projectsArr.map((project,index) => {
        return(
          <Link to={`/projects/${project._id}`}>
            <Card key={index} >
              <h3>{project.name.toUpperCase()}</h3>
              <h4><Avatar img={project.user.img} rounded/>{project.user.username}</h4>
              {project.collaborators.length !== 0 && <h4>Collaborators:  {project.collaborators.map((collab) => <p>{collab.username}</p>)}</h4>}
              <p>{project.description}</p>
              <Link to={`https://${project.github}`}>Git Hub Repo</Link>
              <p>Likes: {project.likes.length}</p>
              {project.tech.length !== 0 && project.tech.map((tech) => <p>{tech}</p>)}

            </Card>
          </Link>
        )
      }) : (
        <p>You are not following any users yet, start broadening your web!</p>
      )}
    </div>
  </Card>
  )
}

export default MyNetworkProjectsPage