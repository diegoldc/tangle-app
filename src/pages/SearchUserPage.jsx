import { useLocation, Link } from "react-router-dom";
import service from "../services/config";
import { useState, useEffect } from "react";
import { Card, Avatar, Spinner } from "flowbite-react";
import SearchBar from "../components/SearchBar";

function FilterPage() {
  const location = useLocation();
  const { query } = location.state;
  const [users, setUsers] = useState(null);

  useEffect(() => {
    getData();
  }, [query]);

  const getData = async () => {
    try {
      const response = await service.get(`/users/find?username=${query}`);
      setUsers(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("error al traer el query", error);
    }
  };

  if (users === null) {
    return <Spinner />;
  }

  return (
    <>
      <SearchBar style={"smallSearchBar"} />

      <Card className="mt-5">
        <h1>Results for: "{query}"</h1>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "15px",
            marginTop: "15px",
            justifyContent: "center",
          }}
        >
          {users.length === 0 ? (
            <p style={{ color: "red" }}>There's no users with that name</p>
          ) : (
            users.map((user, index) => {
              return (
                <Link to={`/profile/${user._id}`}>
                  <Card key={index} className="userCard">
                    <Avatar rounded img={user.img} />
                    <h2>{user.username}</h2>
                  </Card>
                </Link>
              );
            })
          )}
        </div>
      </Card>
    </>
  );
}

export default FilterPage;
