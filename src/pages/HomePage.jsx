import { useState, useEffect, useContext } from "react";
import service from "../services/config";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import { Card, Avatar, Badge, Spinner, Button } from "flowbite-react";
import ProjectCard from "../components/ProjectCard";
import { ThemeContext } from "../context/theme.context";
import HeroSection from "../components/HeroSection";


function HomePage() {
  const [allProjects, setAllProjects] = useState(null);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [loadingMoreProjects, setLoadingMoreProjects] = useState(false);
  const [page, setPage] = useState(1);
  const [reachedEnd, setReachedEnd] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await service.get(`/projects/page/1`);
      setPage(page + 1);
      setAllProjects(response.data);
    } catch (error) {
      console.log("error al traer proyectos", error);
    }
  };

  const loadMoreProjects = async () => {
    setLoadingMoreProjects(true);
    try {
      const response = await service.get(`/projects/page/${page}`);
      response.data.length < 10 && setReachedEnd(true);
      setAllProjects((current) => [...current, ...response.data]);
    } catch (error) {
      console.log("error al cargar mas projectos", error);
      setReachedEnd(true);
    }

    setLoadingMoreProjects(false);
  };

  if (allProjects === null) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <div style={{ position: "relative" }}>
      <SearchBar style={"smallSearchBar"} />
      <HeroSection />
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
          {allProjects.map((project) => {
            return (
              <Link to={`/projects/${project._id}`}>
                <ProjectCard project={project} key={project._id} />
              </Link>
            );
          })}
        </div>
        {!reachedEnd && (
          <Button
            className="!bg-deep-purple !focus:bg-deep-purple hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
            onClick={loadMoreProjects}
          >
            {loadingMoreProjects ? <Spinner /> : "Load More Projects"}
          </Button>
        )}
      </Card>
    </div>
  );
}

export default HomePage;
