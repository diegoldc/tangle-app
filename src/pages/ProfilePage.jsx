import service from "../services/config";
import { Link , useParams } from "react-router-dom"
import { useState , useEffect , useContext } from "react"
import { AuthContext } from "../context/auth.context";
import { Card , Button , Avatar } from "flowbite-react";

function ProfilePage() {

  const {userId} = useParams()

  const [userInfo, setUserInfo] = useState(null)
  const [allProjects, setAllProjects] = useState(null)

  const { loggedUserId } = useContext(AuthContext);


  useEffect(() => {
    getData()
  }, [])
  
  
  const getData = async () => {
    try {
      const userInfo = await service.get(`/users/${userId}`)
      setUserInfo(userInfo.data)
      console.log(userInfo.data)
      const projectsInfo = await service.get(`/projects/user/${userId}`)
      setAllProjects(projectsInfo.data)
      console.log(projectsInfo.data)
    } catch (error) {
      console.log("error al traer la info de usuario o proyectos",error)
    }
  }

  if(userInfo === null){
    return <div>...spinner</div>
  }
  
  return (
    <div style={{display:"flex",gap:"10px",width:"auto"}}>

    <div style={{display:"flex",flexDirection:"column",width:"29vw",gap:"10px"}}>
      {/*info - medallas - tech - following - followers*/}
      <Card  className=" min-w-200">
        <Avatar img={userInfo.img} rounded size="xl" />
      <p className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white max-w-full break-all" >
        {userInfo.username}
      </p>
      {userInfo.firstName && userInfo.lastName ? (
        <h5>{userInfo.firstName} {userInfo.lastName} </h5>
      ) : (null) }
      {userInfo._id !== loggedUserId && (<Button>Follow</Button>)}
      <a href={userInfo.linkedin} >LinkedIn</a>
      <a href={userInfo.github} >GitHub</a>
    </Card>


    <Card className="">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        MEDALS
      </h5>
    </Card>


    <Card className="">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        TECHNOLOGIES
      </h5>
      <div style={{display:"flex",flexWrap:"wrap"}} >
        {userInfo.tech.map((tech) => <div>.{tech}..</div>)}
      </div>
    </Card>


    <Card className="">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        FOLLOWING
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
      </p>
    </Card>


    <Card className="">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        FOLLOWERS
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
      </p>
    </Card>
    </div>


    <div>
    {/*proyectos*/}
    <Card style={{width:"69vw",maxWidth:"100vw",minWidth:"400px"}} >
      {allProjects === null ? (<div>...spinner</div>) : (
      <>
        {allProjects.length === 0 ? (
          <>
          <h1>No rojects posted!</h1>
          <p>Add a new project here</p>
          <Link to="/projects/new-project">
          <Button>Add a Project!</Button>
          </Link>
          </>
        ) : (
          <>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {userInfo.username}'s projects
            </h5>
            {allProjects.map((project,index) => {
              return (
                <Card key={index} >
                <p>{project.name.toUpperCase()}</p>
                <p>{project.description}</p>
                </Card>
              )
            })}
          </>
        )}
      </>
      )}
    </Card>
    </div>
    </div>
  )
}

export default ProfilePage