import service from "../services/config";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import {
  Card,
  Button,
  Avatar,
  FileInput,
  Label,
  Popover,
  Badge,
  Spinner,
} from "flowbite-react";
import UpdateAvatar from "../components/UpdateAvatar";
import { FiEdit3 } from "react-icons/fi";
import GetUserLevel from "../functions/GetUserLevel";
import ProjectCard from "../components/ProjectCard";
import Medals from "../components/Medals";
import { ThemeContext } from "../context/theme.context";
import { AiOutlineGithub } from "react-icons/ai";
import { AiOutlineLinkedin } from "react-icons/ai";

function ProfilePage() {
  const { userId } = useParams();

  const [userInfo, setUserInfo] = useState(null);
  const [allProjects, setAllProjects] = useState(null);
  const [followersArr, setFollowersArr] = useState([]);
  const [isFollowed, setIsFollowed] = useState(false);
  const [open, setOpen] = useState(false);
  const [userLevel, setUserLevel] = useState(null);
  const [commentsArr, setCommentsArr] = useState([]);

  const { loggedUserId } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    getData();
  }, [userId]);

  useEffect(() => {
    if (allProjects && commentsArr && userInfo && followersArr) {
      level();
    }
  }, [followersArr]);

  const level = async () => {
    try {
      setUserLevel(
        GetUserLevel(allProjects, commentsArr, userInfo.following, followersArr)
      );
      console.log(
        GetUserLevel(allProjects, commentsArr, userInfo.following, followersArr)
      );
    } catch (error) {
      console.log(error);
    }
  };
  const getData = async () => {
    try {
      const userData = await service.get(`/users/${userId}`);
      setUserInfo(userData.data);

      const commentsInfo = await service.get(`/comments/user/${userId}`);
      setCommentsArr(commentsInfo.data);

      const projectsInfo = await service.get(`/projects/user/${userId}`);

      const followersData = await service.get(`/users/followers/${userId}`);
      setAllProjects(projectsInfo.data);
      setFollowersArr(followersData.data);

      const userFollowsProfile = followersData.data.filter(
        (user) => user._id === loggedUserId
      );

      if (userFollowsProfile.length === 0) {
        setIsFollowed(false);
      } else {
        setIsFollowed(true);
      }
      // console.log("followers",followersData.data)
    } catch (error) {
      console.log("error al traer la info de usuario o proyectos", error);
    }
  };

  const handleFollow = async () => {
    if (isFollowed) {
      try {
        const myFollowers = await service.get(`/users/${loggedUserId}`);
        const followersIds = myFollowers.data.following.map((user) => user._id);
        const following = followersIds.filter((id) => id !== userInfo._id);
        await service.patch(`/users/un-follow/${loggedUserId}`, {
          following: following,
        });
        setIsFollowed(false);
      } catch (error) {
        console.log("error al traer los seguidores del usuario logeado", error);
      }
    } else {
      try {
        await service.patch(`/users/follow/${loggedUserId}`, {
          followedUserId: userInfo._id,
        });
        setIsFollowed(true);
      } catch (error) {
        console.log("error al seguir a este usuario", error);
      }
    }
    getData();
  };

  if (userInfo === null) {
    return <Spinner />;
  } else if (userInfo !== null && userLevel === null) {
    level();
    return <Spinner />;
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          gap: "10px",
          width: "auto",
        }}
        className="profileDiv"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "29vw",
            gap: "10px",
          }}
        >
          {/*info - medallas - tech - following - followers*/}
          <Card className="" style={{ minWidth: "370px" }}>
            <Avatar img={userInfo.img} rounded size="xl" />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              {userInfo._id === loggedUserId && (
                <Popover
                  open={open}
                  onOpenChange={setOpen}
                  style={{ postition: "relative" }}
                  content={<UpdateAvatar getData={getData} setOpen={setOpen} />}
                >
                  <h5 style={{ color: "grey", cursor: "pointer" }}>
                    Edit Profile Picture
                    <FiEdit3 color="rgb(200,200,200)" />
                  </h5>
                </Popover>
              )}
            </div>
            <p className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white max-w-full break-all">
              {userInfo.username}
            </p>
            <p>Spider Level: {userLevel.level}</p>
            {userInfo.firstName && userInfo.lastName ? (
              <h5>
                {userInfo.firstName} {userInfo.lastName}{" "}
              </h5>
            ) : null}
            {userInfo._id !== loggedUserId ? (
              <Button
                onClick={handleFollow}
                className="w-2/3 m-auto mt-3 !bg-deep-purple !focus:bg-deep-purple hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
              >
                {isFollowed ? "Unfollow" : "Follow"}
              </Button>
            ) : (
              <Link to={`/profile/${loggedUserId}/my-info`}>
                <Button className="w-2/3 m-auto mt-3 !bg-deep-purple !focus:bg-deep-purple hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">
                  Edit profile info
                </Button>
              </Link>
            )}
            <div
              style={{ display: "flex", justifyContent: "center", gap: "10px" }}
            >
              <Link to={`https://${userInfo.linkedin}`}>
                <AiOutlineLinkedin size={40}/>
              </Link>
              <Link to={`https://${userInfo.github}`}>
                <AiOutlineGithub size={40}/>
              </Link>
            </div>
          </Card>

          <Medals userLevel={userLevel} />

          <Card className="" style={{ minWidth: "370px" }}>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              TECHNOLOGIES
            </h5>
            <div className="flex flex-row flex-wrap gap-3 bg-deep-purple min-h-20 w-auto overflow-hidden p-2 justify-center rounded-lg mt-2">
              {userInfo.tech.map((tech, index) => (
                <Badge key={index} color="purple" size="small">
                  {tech}
                </Badge>
              ))}
            </div>
          </Card>

          <Card className="" style={{ minWidth: "370px" }}>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              FOLLOWING{" "}
              <span style={{ fontWeight: "light", fontSize: "0.7em" }}>
                ({userInfo.following.length})
              </span>
            </h5>
            {userInfo.following.length === 0 &&
              userInfo._id === loggedUserId && (
                <p>You haven't followed anyone yet, start building your web!</p>
              )}
            {userInfo.following.length === 0 &&
              userInfo._id !== loggedUserId && (
                <p>{userInfo.username} is not following anyone yet</p>
              )}
            {userInfo.following.length !== 0 && (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "15px",
                  maxHeight: "200px",
                  overflow: "hidden",
                }}
              >
                {userInfo.following.map((followingUser, index) => {
                  return (
                    <Link key={index} to={`/profile/${followingUser._id}`}>
                      <Avatar img={followingUser.img} rounded />
                    </Link>
                  );
                })}
              </div>
            )}
          </Card>

          <Card className="" style={{ minWidth: "370px" }}>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              FOLLOWERS{" "}
              <span style={{ fontWeight: "light", fontSize: "0.7em" }}>
                ({followersArr.length})
              </span>
            </h5>
            {followersArr.length === 0 && userInfo._id === loggedUserId && (
              <p>
                No one is following you yet. Try posting projects and following
                other users to broaden your web!
              </p>
            )}
            {followersArr.length === 0 && userInfo._id !== loggedUserId && (
              <p>
                No one is following {userInfo.username} yet. Be the first!
                FOLLOW
              </p>
            )}
            {followersArr.length !== 0 && (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "15px",
                  maxHeight: "200px",
                  overflow: "hidden",
                }}
              >
                {followersArr.map((followingUser, index) => {
                  return (
                    <Link key={index} to={`/profile/${followingUser._id}`}>
                      <Avatar img={followingUser.img} rounded />
                    </Link>
                  );
                })}
              </div>
            )}
          </Card>
        </div>

        <div>
          {/*proyectos*/}
          <Card
            style={{
              padding: "auto",
              width: "69vw",
              maxWidth: "100vw",
              minWidth: "370px",
            }}
          >
            {allProjects === null ? (
              <div><Spinner /></div>
            ) : (
              <>
                {allProjects.length === 0 ? (
                  <>
                    <h1>No projects posted!</h1>
                    <p>Add a new project here</p>
                    <Link to="/projects/new-project">
                      <Button className="!bg-deep-purple !focus:bg-deep-purple hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800" >Add a Project!</Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <h5
                      className={`text-2xl font-bold tracking-tight ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {userInfo.username}'s projects
                    </h5>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "15px",
                        marginTop: "15px",
                        justifyContent: "center",
                      }}
                    >
                      {allProjects.map((project, index) => {
                        return (
                          <Link key={index} to={`/projects/${project._id}`}>
                            <ProjectCard project={project} />
                          </Link>
                        );
                      })}
                    </div>
                  </>
                )}
              </>
            )}
          </Card>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
