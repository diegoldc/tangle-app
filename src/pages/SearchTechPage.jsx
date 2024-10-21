import { useParams , Link } from 'react-router-dom'
import service from '../services/config'
import { useState , useEffect } from 'react'
import { Card , Avatar } from 'flowbite-react'

function SearchTechPage() {

  const {tech} = useParams()

  const [allProjects, setAllProjects] = useState(null)

  useEffect(() => {
    getData()
  },[])

  const getData = async () => {
    try {
      const response = await service.get(`/projects/tech/${tech}`)
      setAllProjects(response.data)
    } catch (error) {
      console.log("error al traer las techs",error)
    }
  }

  if (allProjects === null) {
    return <div>...spinner</div>;
  }

  return (
    <div>
      <h1>Results for: "{tech}"</h1>
      {allProjects.length === 0 ? (
        <p>No projects found with "{tech}"</p>
      ) : allProjects.map((project, index) => { return(
        <Link key={index} to={`/projects/${project._id}`}>
          <Card >
            <p>{project.name.toUpperCase()}</p>
            <p>{project.description}</p>
          </Card>
        </Link>
      )
      })}
    </div>
  )
}

export default SearchTechPage