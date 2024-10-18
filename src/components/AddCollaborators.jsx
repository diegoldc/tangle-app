import { useEffect, useState, useContext } from "react";
import service from "../services/config";
import { Dropdown, Button, Label, TextInput, Toast, Card } from "flowbite-react";
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
    console.log(collaborators);
    console.log(collabToRemove);
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
                      <img src={user.img} alt="" />
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

      <div>
        <Label value="Collaborators added:" />
        <div className="flex flex-col gap-4">
          {collaborators.map((collab, index) => (
            // <Toast key={index}>
            //   <div

            //     className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200"
            //   >
            //     {/* <button
            //       type="button"
            //       onClick={() => handleRemoveCollab(collab)}
            //       className="text-red-500 hover:text-red-700"
            //       >
            //       x
            //     </button> */}
            //     <HiCheck className="h-5 w-5" />
            //   </div>
            //     <div className="ml-3 text-sm font-normal">
            //       {collab.username}
            //     </div>
            //     <Toast.Toggle onClick={() => handleRemoveCollab(collab)} />
            // </Toast>

            <Card
              className="max-w-sm"
              imgSrc="/images/blog/image-4.jpg"
              horizontal
              key={index}
            >
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {collab.username}
              </h5>
              <button
                  type="button"
                  onClick={() => handleRemoveCollab(collab)}
                  className="text-red-500 hover:text-red-700"
                  >
                  x
                </button>
              {/* <p className="font-normal text-gray-700 dark:text-gray-400">
  Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
</p> */}
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}

export default AddCollaborators;
