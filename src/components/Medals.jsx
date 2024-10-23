import { Card } from "flowbite-react";

function Medals({ userLevel }) {
  const getMedalColor = (medal) => {
    return medal === "Gold"
      ? "#FFD700"
      : medal === "Silver"
      ? "#d6d6d6"
      : medal === "Bronce"
      ? "#CD7F32"
      : medal === "Stone"
      ? "#7e7e7e"
      : "#e0e0e0";
  };

  return (
    <Card style={{ minWidth: "370px" }}>
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        MEDALS
      </h5>
      
      <div
        style={{
          display: "flex",
          gap: "15px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            backgroundColor: getMedalColor(userLevel.medals.projects),
            borderRadius: "10px",
            padding: "10px",
            textAlign: "center",
            width: "120px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <p style={{fontWeight:"bold"}}>Projects<br/>{userLevel.medals.projects === "Bronce" ? "Bronze" : userLevel.medals.projects} </p>
        </div>

        <div
          style={{
            backgroundColor: getMedalColor(userLevel.medals.following),
            borderRadius: "10px",
            padding: "10px",
            textAlign: "center",
            width: "120px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <p style={{fontWeight:"bold"}}>Following<br/>{userLevel.medals.following === "Bronce" ? "Bronze" : userLevel.medals.following} </p>
        </div>

        <div
          style={{
            backgroundColor: getMedalColor(userLevel.medals.followers),
            borderRadius: "10px",
            padding: "10px",
            textAlign: "center",
            width: "120px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <p style={{fontWeight:"bold"}}>Followers<br/>{userLevel.medals.followers === "Bronce" ? "Bronze" : userLevel.medals.followers} </p>
        </div>

        <div
          style={{
            backgroundColor: getMedalColor(userLevel.medals.comments),
            borderRadius: "10px",
            padding: "10px",
            textAlign: "center",
            width: "120px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <p style={{fontWeight:"bold"}}>Comments<br/>{userLevel.medals.comments === "Bronce" ? "Bronze" : userLevel.medals.comments} </p>
        </div>

        <div
          style={{
            backgroundColor: getMedalColor(userLevel.medals.likes),
            borderRadius: "10px",
            padding: "10px",
            textAlign: "center",
            width: "120px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <p style={{fontWeight:"bold"}}>Likes<br/>{userLevel.medals.likes === "Bronce" ? "Bronze" : userLevel.medals.likes} </p>
        </div>
      </div>
    </Card>
  );
}

export default Medals;
