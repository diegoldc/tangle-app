import { Card, Button, Label, TextInput } from "flowbite-react";
import { useState , useEffect } from "react";
import { useNavigate , useParams, Link} from "react-router-dom";
import service from "../services/config";

function ChangePasswordPage() {

  const handleSubmit = async (e) => {
    e.preventDefault()
  }


  return (
    <Card>
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Change Password
      </h2>
      <form className="flex max-w-lg w-full flex-col justify-center justify-items-center gap-4 mt-10 m-auto" onSubmit={handleSubmit}>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="username" value="Previous password" />
        </div>
        <TextInput
          id="username"
          type="text"
          autoComplete="on"
          value=""
          required
          shadow
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="firstName" value="New password" />
        </div>
        <TextInput
          id="firstName"
          type="text"
          autoComplete="off"
          value=""
          required
          shadow
        />
      </div>

      <div>
        <div className="mb-2 block">
          <Label htmlFor="firstName" value="Confirm your new password" />
        </div>
        <TextInput
          id="firstName"
          type="text"
          autoComplete="off"
          value=""
          required
          shadow
        />
      </div>

      <Button type="submit" className="w-2/3 m-auto mt-6">Edit your profile</Button>
      </form>
      <hr />
      <div className="flex flex-col justify-center justify-items-center">
      
    {/* <Link to={`/profile/${userId}/change-password`} >
      <Button>Change Password</Button>
    </Link> */}
      </div>
    </Card>
  )
}

export default ChangePasswordPage