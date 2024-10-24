import { useParams, Link } from "react-router-dom";
import service from "../services/config";
import { useState, useEffect } from "react";
import { Card, Avatar, Spinner } from "flowbite-react";
import ProjectCard from "../components/ProjectCard";
import SearchBar from "../components/SearchBar";

function SearchTechPage() {
  const { tech } = useParams();

  const [allProjects, setAllProjects] = useState(null);

  useEffect(() => {
    getData();
  }, [tech]);

  const getData = async () => {
    try {
      const response = await service.get(`/projects/tech/${tech}`);
      setAllProjects(response.data);
    } catch (error) {
      console.log("error al traer las techs", error);
    }
  };

  if (allProjects === null) {
    return <Spinner />;
  }

  return (
    <div>
      <SearchBar style={"smallSearchBar"} />

      <Card className="mt-5">
        <h1>Results for: "{tech}"</h1>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "15px",
            marginTop: "15px",
            justifyContent: "center",
          }}
        >
          {allProjects.length === 0 ? (
            <p style={{ color: "red" }}>No projects found with "{tech}"</p>
          ) : (
            allProjects.map((project, index) => {
              return (
                <Link key={index} to={`/projects/${project._id}`}>
                  <ProjectCard project={project} />
                </Link>
              );
            })
          )}
        </div>
      </Card>
    </div>
  );
}

export default SearchTechPage;
