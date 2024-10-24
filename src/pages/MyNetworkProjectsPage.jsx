import { useState, useEffect, useContext } from "react";
import service from "../services/config";
import { AuthContext } from "../context/auth.context";
import { Card, Avatar, Spinner, Button } from "flowbite-react";
import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard"


function MyNetworkProjectsPage() {
  const { loggedUserId } = useContext(AuthContext);


  const [projectsArr, setProjectsArr] = useState(null);
  const [userIdArr, setUserIdArr] = useState([]);
  const [page, setPage] = useState(1)
  const [reachedEnd, setReachedEnd] = useState(false)
  const [loadingMoreProjects  , setLoadingMoreProjects  ] = useState(false)

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const userData = await service.get(`/users/following/${loggedUserId}`);
      const followingArr = userData.data.following;
      console.log(userData.data.following);
      const projectsData = await service.post(`/projects/my-network/${page}`, {
        userArray: followingArr,
      });
      setPage(page + 1) 
      setProjectsArr(projectsData.data)
      projectsData.data.length < 10 && setReachedEnd(true)
      console.log(projectsData.data);
    } catch (error) {
      console.log("error al traer los proyectos", error);
    }
  };


  const loadMoreProjects = async () => {
    setLoadingMoreProjects(true)
    try {
      const projectsData = await service.post(`/projects/my-network/${page}`, {
        userArray: followingArr,
      });
      console.log(page,response.data)
      response.data.length < 10 && setReachedEnd(true)
      setProjectsArr((current) => [...current,...response.data])
    } catch (error) {
      console.log("error al cargar mas projectos",error)
      setReachedEnd(true)
    }
    console.log("more projects requested")

    setLoadingMoreProjects(false)
  }



  if (projectsArr === null) {
    return <Spinner/>;
  }

  return (
    <>
      <h1 className="mt-10 mb-5 text-center text-2xl font-bold leading-9 tracking-tight ">My web</h1>
      <Card>
      <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "15px",
            marginTop: "15px",
            justifyContent: "center",
          }}
        >
          {projectsArr.length !== 0 ? (
            projectsArr.map((project, index) => {
              return (
                <Link to={`/projects/${project._id}`}>
                  <ProjectCard project={project} />
                </Link>
              );
            })
          ) : (
            <p>
              You are not following any users yet, start broadening your web!
            </p>
          )}
        </div>
        {!reachedEnd && <Button  className="!bg-deep-purple !focus:bg-deep-purple hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800" onClick={loadMoreProjects} >{loadingMoreProjects ? <Spinner /> : "Load More Projects"}</Button> }
      </Card>
    </>
  );
}

export default MyNetworkProjectsPage;
