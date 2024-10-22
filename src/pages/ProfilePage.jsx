import service from "../services/config";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Card, Button, Avatar, FileInput, Label, Popover, Badge } from "flowbite-react";
import UpdateAvatar from "../components/UpdateAvatar"
import { FiEdit3 } from "react-icons/fi";
import GetUserLevel from "../functions/GetUserLevel"
import ProjectCard from "../components/ProjectCard";


function ProfilePage() {
  const { userId } = useParams();

  const [userInfo, setUserInfo] = useState(null);
  const [allProjects, setAllProjects] = useState(null);
  const [followersArr, setFollowersArr] = useState([]);
  const [isFollowed, setIsFollowed] = useState(false);
  const [open, setOpen] = useState(false);
  const [userLevel, setUserLevel] = useState(null)
  const [commentsArr, setCommentsArr] = useState([])

  const { loggedUserId } = useContext(AuthContext);

  useEffect(() => {
    getData();
  }, [userId]);

  const getData = async () => {
    try {
      const userData = await service.get(`/users/${userId}`);
      setUserInfo(userData.data);

      const commentsInfo = await service.get(`/comments/user/${userId}`)
      setCommentsArr(commentsInfo.data)

      const projectsInfo = await service.get(`/projects/user/${userId}`);
      setAllProjects(projectsInfo.data)

      const followersData = await service.get(`/users/followers/${userId}`);
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
  const level = async () => {
    try {
      setUserLevel(GetUserLevel(allProjects,commentsArr,userInfo.following,followersArr))
      console.log(GetUserLevel(allProjects,commentsArr,userInfo.following,followersArr))
    } catch (error) {
      console.log(error)
    }
  }
  
  if (userInfo === null) {
    return <div>...spinner</div>;
  } else if (userInfo !== null && userLevel === null){    
    level()
    return (<div>...spinner</div>)
  }

  return (
    <>
    <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Profile</h1>
    <div style={{ display: "flex", flexDirection:"column", gap: "10px", width: "auto" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "29vw",
          gap: "10px",
        }}
        >
        {/*info - medallas - tech - following - followers*/}
        <Card className="" style={{minWidth:"370px"}} >
          <Avatar img={userInfo.img} rounded size="xl" />
        {userInfo._id === loggedUserId && (
        <Popover open={open} onOpenChange={setOpen} style={{postition:"relative"}} content={
          <UpdateAvatar getData={getData} setOpen={setOpen} />
        } >
          <h5 style={{color:"grey",cursor:"pointer"}} >Edit Profile Picture<FiEdit3 color="rgb(200,200,200)" /></h5>
        </Popover>
        )}
          <p className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white max-w-full break-all">
            {userInfo.username}
          </p>
          <p>spider level: {userLevel.level}</p>
          {userInfo.firstName && userInfo.lastName ? (
            <h5>
              {userInfo.firstName} {userInfo.lastName}{" "}
            </h5>
          ) : null}
          {userInfo._id !== loggedUserId ? (
            <Button onClick={handleFollow}>
              {isFollowed ? "Unfollow" : "Follow"}
            </Button>
          ) : (
            <Link to={`/profile/${loggedUserId}/my-info`}>
              <Button className="w-2/3 m-auto mt-6 !bg-deep-purple !focus:bg-deep-purple hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">Edit profile info</Button>
            </Link>
          )}
          <a href={`https://${userInfo.linkedin}`}>LinkedIn</a>
          <a href={`https://${userInfo.github}`}>GitHub</a>
        </Card>

        <Card className="" style={{minWidth:"370px"}}>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            MEDALS
          </h5>
          {/* {Object.values(userLevel.medals).forEach((key) => key)} */}
          <p>Projects Medal: {userLevel.medals.projects} </p>
          <p>Following Medal: {userLevel.medals.following} </p>
          <p>Followers Medal: {userLevel.medals.followers} </p>
          <p>Comments Medal: {userLevel.medals.comments} </p>
          <p>Likes Medal: {userLevel.medals.likes} </p>
        </Card>

        <Card className="" style={{minWidth:"370px"}}>
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

        <Card className="" style={{minWidth:"370px"}}>
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            FOLLOWING{" "}
            <span style={{ fontWeight: "light", fontSize: "0.7em" }}>
              ({userInfo.following.length})
            </span>
          </h5>
          {userInfo.following.length === 0 && userInfo._id === loggedUserId && (
            <p>You haven't followed anyone yet, start building your web!</p>
          )}
          {userInfo.following.length === 0 && userInfo._id !== loggedUserId && (
            <p>{userInfo.username} is not following anyone yet</p>
          )}
          {userInfo.following.length !== 0 &&(
            <div style={{display:"flex",flexWrap:"wrap",gap:"15px",maxHeight:"200px",overflow:"hidden"}} >{
              userInfo.following.map((followingUser, index) => {
              return (
                <Link key={index} to={`/profile/${followingUser._id}`}>
                  <Avatar img={followingUser.img} rounded />
                </Link>
              );
            })}
            </div>
            )}
        </Card>

        <Card className="" style={{minWidth:"370px"}}>
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
              No one is following {userInfo.username} yet. Be the first! FOLLOW
            </p>
          )}
          {followersArr.length !== 0 && (
            <div style={{display:"flex",flexWrap:"wrap",gap:"15px",maxHeight:"200px",overflow:"hidden"}} >{
              followersArr.map((followingUser, index) => {
                return (
                  <Link key={index} to={`/profile/${followingUser._id}`}>
                  <Avatar img={followingUser.img} rounded />
                </Link>
              );
            })
            }
            </div>
            )}
        </Card>
      </div>

      <div>
        {/*proyectos*/}
        <Card style={{padding:"auto", width: "69vw", maxWidth: "100vw", minWidth: "370px" }}>
          {allProjects === null ? (
            <div>...spinner</div>
          ) : (
            <>
              {allProjects.length === 0 ? (
                <>
                  <h1>No projects posted!</h1>
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
                  <div
                    style={{display:"flex",flexWrap:"wrap",gap:"15px",marginTop:"15px",justifyContent:"center"}}
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
