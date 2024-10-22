import { Card , Avatar, Badge } from "flowbite-react";
const defaultProjectBG ="https://res.cloudinary.com/dtvuykwtv/image/upload/v1729589103/bpe9xnuncma0drfvji7t.jpg"

function ProjectCard({project}) {
  return (
    <Card
    className="max-w-sm w-[80vw]"
    renderImage={() => <img style={{height:"150px",objectFit:"cover",objectPosition:"top",overflow:"hidden",borderTopLeftRadius:"10px",borderTopRightRadius:"10px"}} src={project.screenshots && project.screenshots.length > 0  ? project.screenshots[0] : defaultProjectBG } alt="image 1" />}
    key={project._id}
    >
    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white overflow-hidden h-10">
      {project.name.length>23 ? project.name.toUpperCase().slice(0,20)+"..." : project.name.toUpperCase()}
    </h5>
    <Card className="p-0">
      <div className="flex flex-row justify-center gap-5">
    <Avatar size="sm" img={project.user.img} rounded />
    <h5>{project.user.username}</h5>
      </div>
    </Card>
    <div className="flex flex-row gap-3 bg-purple-200 h-11 w-auto overflow-hidden p-2 justify-center rounded-lg">
      {project.tech.map((tech,index) => 
        index < 5 && <Badge key={index} color="purple" size="small" >{tech}</Badge>
      )}
    </div>
  </Card>
  )
}

export default ProjectCard