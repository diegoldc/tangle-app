import { useState, useEffect, useContext } from "react";
import service from "../services/config";
import { AuthContext } from "../context/auth.context";
import { Card, Avatar } from "flowbite-react";
import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";

function MyNetworkProjectsPage() {
  const { loggedUserId } = useContext(AuthContext);

  const [projectsArr, setProjectsArr] = useState(null);
  const [userIdArr, setUserIdArr] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const userData = await service.get(`/users/following/${loggedUserId}`);
      const followingArr = userData.data.following;
      console.log(userData.data.following);
      const projectsData = await service.post("/projects/my-network", {
        userArray: followingArr,
      });
      setProjectsArr(projectsData.data);
      console.log(projectsData.data);
    } catch (error) {
      console.log("error al traer los proyectos", error);
    }
  };

  if (projectsArr === null) {
    return <div>...spinner</div>;
  }

  return (
    <>
      <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">My Network</h1>
      <Card>
        <div className="flex gap-5 flex-wrap">
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
      </Card>
    </>
  );
}

export default MyNetworkProjectsPage;
