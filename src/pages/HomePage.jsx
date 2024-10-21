import { useState , useEffect } from "react"
import service from "../services/config"
import { Link } from "react-router-dom"
import SearchBar from "../components/SearchBar"

function HomePage() {

  const [allProjects, setAllProjects] = useState(null)
    

  useEffect(() => {
    getData()
  },[])
  
  const getData = async () => {
    try {
      const response = await service.get("/projects")
      setAllProjects(response.data)
    } catch (error) {
      console.log("error al traer proyectos",error)
    }
  }

  if(allProjects === null){
    return <div>...spinner</div>
  }

  return (
    <>
    <SearchBar />
    <div style={{display:"flex",flexWrap:"wrap"}}>
    {allProjects.map((project, index) => {
      return(
        <div key={index}>
          <Link to={`/projects/${project._id}`}>
        <h1>{project.name}</h1>
        <ul>
        {project.tech.map((tag) => {
          <li>{tag}</li>
        })}
        </ul>
        <h3>{project.user.username}</h3>
        <img src={project.user.img} alt="" />
        <p>{project.description}</p>
        </Link>
      </div>  
      )
    })}
    </div>
    </>
  )
}

export default HomePage