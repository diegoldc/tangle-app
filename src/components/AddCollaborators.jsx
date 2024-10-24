import { useEffect, useState, useContext } from "react";
import service from "../services/config";
import {
  Avatar,
  Dropdown,
  Button,
  Label,
  TextInput,
  Toast,
  Card,
} from "flowbite-react";
import { AuthContext } from "../context/auth.context";
import { HiCheck, HiX } from "react-icons/hi";

const API_URL = import.meta.env.VITE_API_URL;

function AddCollaborators({ collaborators, setCollaborators }) {
  const { loggedUserId } = useContext(AuthContext);

  const [allUsers, setAllUsers] = useState(null);
  const [collabInput, setCollabInput] = useState("");
  const [collabObj, setCollabObj] = useState({});
  const [isDropDown, setIsDropDown] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await service.get(`/users`);
      setAllUsers(response.data);
    } catch (error) {
      console.log("error al traer usuarios en collab", error);
    }
  };

  const handleAddCollaborator = (user) => {
    if (!collaborators.includes(user) && user._id !== loggedUserId) {
      setCollaborators([...collaborators, user]);
      setCollabObj({});
      setCollabInput("");
    }
  };

  const handleInputChange = (e) => {
    if (collabInput !== "") {
      setIsDropDown(true);
    } else {
      setIsDropDown(false);
    }
    setCollabInput(e);
  };

  const handleRemoveCollab = (collabToRemove) => {
    setCollaborators(
      collaborators.filter(
        (collaborator) => collaborator._id !== collabToRemove._id
      )
    );
  };

  return (
    <>
      <div className="flex w-full">
        <div
          className={`userDropDown ${
            collabInput === "" ? "dropClose" : "dropOpen"
          }`}
        >
          <ul className="userUl">
            {allUsers &&
              allUsers
                .filter((user) =>
                  user.username
                    .toLowerCase()
                    .includes(collabInput.toLowerCase())
                )
                .map((user, index) => {
                  return (
                    <li
                      className="userLi"
                      onClick={() => handleAddCollaborator(user)}
                      key={index}
                    >
                      <Avatar
                        img={user.img}
                        rounded
                        size="sm"
                        className="m-5"
                      />
                      <p>{user.username}</p>
                    </li>
                  );
                })}
          </ul>
        </div>
        <TextInput
          type="text"
          placeholder="Enter username"
          value={collabInput}
          onChange={() => handleInputChange(event.target.value)}
          className="w-full ml-0"
        />
      </div>

      <div style={{ marginTop: "5px" }}>
        <Label value="Collaborators added:" />
        <div className="flex flex-col gap-4 mt-2">
          {collaborators.map((collab, index) => (
            <Card>
              <div className="flex flex-row justify-between">
                <div className="flex flex-row">
                  <Avatar img={collab.img} size="xs" rounded />
                  <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {collab.username}
                  </h5>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => handleRemoveCollab(collab)}
                    className="text-purple-800 hover:text-purple-700"
                  >
                    x
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}

export default AddCollaborators;
