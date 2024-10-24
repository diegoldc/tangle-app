import { useState, useEffect, useContext } from "react";
import service from "../services/config";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import { Card, Avatar, Badge, Spinner, Button } from "flowbite-react";
import ProjectCard from "../components/ProjectCard";
import { ThemeContext } from "../context/theme.context";
import HeroSection from "../components/HeroSection";

// import Image from "next/image";
// import {
//   Card,
//   CardHeader,
//   CardBody,
//   Typography,
//   Avatar,
// } from "@material-tailwind/react";

function HomePage() {
  const [allProjects, setAllProjects] = useState(null);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [loadingMoreProjects  , setLoadingMoreProjects  ] = useState(false)
  const [page, setPage] = useState(1)
  const [reachedEnd, setReachedEnd] = useState(false)

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await service.get(`/projects/page/1`);
      setPage(page + 1) 
      setAllProjects(response.data);
    } catch (error) {
      console.log("error al traer proyectos", error);
    }
  };

  const loadMoreProjects = async () => {
    setLoadingMoreProjects(true)
    try {
      const response = await service.get(`/projects/page/${page}`)
      console.log(page,response.data)
      response.data.length < 10 && setReachedEnd(true)
      console.log(allProjects)
      setAllProjects((current) => [...current,...response.data])
      console.log(allProjects)
    } catch (error) {
      console.log("error al cargar mas projectos",error)
      setReachedEnd(true)
    }
    console.log("more projects requested")

    setLoadingMoreProjects(false)
  }

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
        {!reachedEnd && <Button  className="!bg-deep-purple !focus:bg-deep-purple hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800" onClick={loadMoreProjects} >{loadingMoreProjects ? <Spinner /> : "Load More Projects"}</Button> }
      </Card>
    </div>
  );
}

export default HomePage;

/*
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";

export function BackgroundBlogCard() {
  return (
    <Card
      shadow={false}
      className="relative grid h-[40rem] w-full max-w-[28rem] items-end justify-center overflow-hidden text-center"
    >
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="absolute inset-0 m-0 h-full w-full rounded-none bg-[url('https://images.unsplash.com/photo-1552960562-daf630e9278b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80')] bg-cover bg-center"
      >
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50" />
      </CardHeader>
      <CardBody className="relative py-14 px-6 md:px-12">
        <Typography
          variant="h2"
          color="white"
          className="mb-6 font-medium leading-[1.5]"
        >
          How we design and code open-source projects?
        </Typography>
        <Typography variant="h5" className="mb-4 text-gray-400">
          Tania Andrew
        </Typography>
        <Avatar
          size="xl"
          variant="circular"
          alt="tania andrew"
          className="border-2 border-white"
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
        />
      </CardBody>
    </Card>
  );
}

*/
