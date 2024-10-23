import { Card, Avatar, Badge } from "flowbite-react";
const defaultProjectBG =
  "https://res.cloudinary.com/dtvuykwtv/image/upload/v1729589103/bpe9xnuncma0drfvji7t.jpg";
import imgLikes from "../assets/likes.png";
import { ThemeContext } from "../context/theme.context";
import imgWhiteLikes from "../assets/white-likes.png";
import { useContext } from "react";
import { FaCalendarDays } from "react-icons/fa6";
import { RxValueNone } from "react-icons/rx";

function ProjectCard({ project }) {
  const { theme } = useContext(ThemeContext);

  return (
    <Card
      className=" max-w-sm w-[80vw] hover:-translate-x-2 transition-all duration-300 hover:-translate-y-2 hover:shadow-[8px_8px_0px_0px_rgba(231,212,240,0.8)] dark:border-1 dark:border-purple-200"
      renderImage={() => (
        <img
          style={{
            height: "150px",
            objectFit: "cover",
            objectPosition: "top",
            overflow: "hidden",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
          }}
          src={
            project.screenshots && project.screenshots.length > 0
              ? project.screenshots[0]
              : defaultProjectBG
          }
          alt="image 1"
        />
      )}
      key={project._id}
    >
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white overflow-hidden h-10">
        {project.name.length > 23
          ? project.name.toUpperCase().slice(0, 20) + "..."
          : project.name.toUpperCase()}
      </h5>

      <div className="flex items-center flex-row justify-between">
        {theme === "dark" ? (
          <div
            className="bg-purple-200 max-w-10 p-1 rounded dark:bg-logo-purple "
            style={{ display: "flex", gap: "2px", alignItems: "center" }}
          >
            <img src={imgWhiteLikes} alt="likes" style={{ width: "20px" }} />{" "}
            {project.likes.length}
          </div>
        ) : (
          <div
            className="bg-purple-200 max-w-10 p-1 rounded dark:bg-logo-purple "
            style={{ display: "flex", gap: "2px", alignItems: "center" }}
          >
            <img src={imgLikes} alt="likes" style={{ width: "20px" }} />{" "}
            {project.likes.length}
          </div>
        )}

        <div className="flex items-center gap-2">
        <FaCalendarDays />
          {new Date(project.creationDate).toLocaleDateString()}
        </div>
      </div>

      <Card className="p-0 min-h-[50px] dark:border-1 dark:border-purple-200">
        <div className="flex flex-row justify-center gap-5 items-center">
          <Avatar size="sm" img={project.user.img} rounded />
          <h5 className="text-xl font-bold tracking-tight overflow-hidden h-10 flex items-center">
            {project.user.username}
          </h5>
        </div>
      </Card>

      {project.collaborators.length > 0 ? (
        <Card className="dark:border-1 dark:border-purple-200">
          <div className="flex flex-row justify-center gap-2 items-center">
            <span className="text-md font-bold tracking-tight text-gray-900 dark:text-white overflow-hidden h-10 flex items-center">
              Collaborators:
            </span>{" "}
            {
              <Avatar.Group>
                {project.collaborators.map((collab, index) => {
                  return (
                    index < 4 && (
                      <Avatar
                        key={collab._id}
                        img={collab.img}
                        rounded
                        stacked
                      />
                    )
                  );
                })}
                {project.collaborators.length > 4 && (
                  <Avatar.Counter total={project.collaborators.length - 4} />
                )}
              </Avatar.Group>
            }
          </div>
        </Card>
      ) : (
        <Card className="dark:border-1 dark:border-purple-200">
                    <div className="flex flex-row justify-center gap-2 items-center">
            <span className="text-md font-bold tracking-tight text-gray-900 dark:text-white overflow-hidden h-10 flex items-center">
              Collaborators:
            </span>
              <RxValueNone size={35} />
            </div>
        </Card>
      )}

      <div className="flex flex-row gap-3 bg-purple-200 dark:bg-logo-purple h-11 w-auto overflow-hidden p-2 justify-center rounded-lg">
        {project.tech.map(
          (tech, index) =>
            index < 5 && (
              <Badge key={index} color="purple" size="small">
                {tech}
              </Badge>
            )
        )}
      </div>
    </Card>
  );
}

export default ProjectCard;
