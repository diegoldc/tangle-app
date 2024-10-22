import { Card } from "flowbite-react";

function Medals({ userLevel }) {
  const getMedalColor = (medal) => {
    return medal === "Gold"
      ? "#FFD700"
      : medal === "Silver"
      ? "#C0C0C0"
      : medal === "Bronce"
      ? "#CD7F32"
      : medal === "Stone"
      ? "#A9A9A9"
      : "#e0e0e0";
  };

  return (
    <Card style={{ minWidth: "370px" }}>
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        MEDALS
      </h5>
      {/* {Object.values(userLevel.medals).forEach((key) => key)} */}
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
          <p>Projects Medal: {userLevel.medals.projects} </p>
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
          <p>Following Medal: {userLevel.medals.following} </p>
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
          <p>Followers Medal: {userLevel.medals.followers} </p>
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
          <p style={{fontWeight:"bold"}}>Comments {userLevel.medals.comments} </p>
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
          <p>Likes Medal: {userLevel.medals.likes} </p>
        </div>
      </div>
    </Card>
  );
}

export default Medals;
