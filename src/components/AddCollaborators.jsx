import { useEffect , useState , useContext } from "react"
import service from "../services/config";
import { Dropdown , Button , Label , TextInput } from "flowbite-react";
import { AuthContext } from '../context/auth.context'



const API_URL = import.meta.env.VITE_API_URL

function AddCollaborators({collaborators, setCollaborators}) {

  const {loggedUserId} = useContext(AuthContext)


  const [allUsers, setAllUsers] = useState(null)
  const [collabInput, setCollabInput] = useState("")
  const [collabObj, setCollabObj] = useState({})
  const [isDropDown , setIsDropDown] = useState(false)

  useEffect(() => {
    getData()
  },[])

  const getData = async () => {
    try {
      const response = await service.get(`/users`)
      setAllUsers(response.data)
    } catch (error) {
      console.log("error al traer usuarios en collab",error)
    }
  }


  const handleAddCollaborator = (user) => {
    if(!collaborators.includes(user) && user._id !== loggedUserId){
      setCollaborators([...collaborators,user])
      setCollabObj({})
      setCollabInput("")
    }
  }

  const handleInputChange = (e) => {
    if(collabInput!==""){
      setIsDropDown(true)
    } else {
      setIsDropDown(false)
    }
    setCollabInput(e)
  }

  const handleRemoveCollab = (collabToRemove) => {
    console.log(collabToRemove)
    console.log(collaborators)
    setCollaborators(collaborators.filter((collaborator) => collaborator._id !== collabToRemove._id))
  };

  return (
    <>
        <div className="flex w-full" >
            <div className={`userDropDown ${collabInput ==="" ? "dropClose" : "dropOpen"}`}>
              <ul className="userUl">

            {allUsers && allUsers.filter((user) => user.username.toLowerCase().includes(collabInput.toLowerCase())).map((user,index) => {
              return(
                <li className="userLi" onClick={() => handleAddCollaborator(user)} key={index}>
                  <img src={user.img} alt="" />
                  <p>{user.username}</p>
                  </li>
                )
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
          <ul className="list-disc pl-5">
            {collaborators.map((collab, index) => (
              <li key={index} className="flex justify-start gap-2 items-center">
                <button
                  type="button"
                  onClick={() => handleRemoveCollab(collab)}
                  className="text-red-500 hover:text-red-700"
                  >
                  x
                </button>
                  {collab.username}
              </li>
            ))}
          </ul>
        </div>
    </>
  )
}

export default AddCollaborators