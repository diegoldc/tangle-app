import { useState , useEffect } from "react"
import service from "../services/config"
import { Link } from "react-router-dom"
import SearchBar from "../components/SearchBar"
import { Card , Avatar, Badge } from "flowbite-react";
import ProjectCard from "../components/ProjectCard";

// import Image from "next/image";
// import {
//   Card,
//   CardHeader,
//   CardBody,
//   Typography,
//   Avatar,
// } from "@material-tailwind/react";



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
    <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Tangle</h1>

    <SearchBar />
    <Card>
    <div
    style={{display:"flex",flexWrap:"wrap",gap:"15px",marginTop:"15px",justifyContent:"center"}}
    // className="grid grid-cols-2 md:grid-cols-4 gap-4"
    >
    {allProjects.map((project) => {
      return(
        <Link to={`/projects/${project._id}`}>
          <ProjectCard project={project} key={project._id} />
        </Link> 
      )
    })}
    </div>
</Card>
    </>
  )
}

export default HomePage


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