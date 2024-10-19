import { Card, Button, Label, TextInput } from "flowbite-react";
import { useState, useEffect } from "react";
import { useNavigate, useParams, Link, Navigate } from "react-router-dom";
import service from "../services/config";
import bcrypt from 'bcryptjs'

function ChangePasswordPage() {
  const { userId } = useParams();

  const [previousPassword, setPreviousPassword] = useState("");
  const [password, setPassword] = useState("")
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await service.get(`/users/${userId}`);
      // console.log(response.data);
      setPreviousPassword(response.data.password);
    } catch (error) {
      console.log("error al traer la info del usuario", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const passwordMatch = await bcrypt.compare(password, previousPassword)

    if (!passwordMatch) {
      setErrorMessage("La contraseña original no es correcta.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setErrorMessage("Passwords must coincide");
      return;
    }

    const editedPassword = { password:newPassword };

    try {
      console.log(password);
      await service.patch(`/users/${userId}/password`, editedPassword)
      // navigate(`/profile/${userId}`)
    } catch (error) {
      console.log("error al cambiar contraseña", error);
    }
  };

  if (previousPassword === null) {
    return <div>...spinner</div>;
  }

  return (
    <Card>
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Change Password
      </h2>
      <form
        className="flex max-w-lg w-full flex-col justify-center justify-items-center gap-4 mt-10 m-auto"
        onSubmit={handleSubmit}
      >
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password" value="Previous password" />
          </div>
          <TextInput
            id="username"
            type="text"
            autoComplete="off"
            defaultValue=""
            onChange={() => setPassword(event.target.value)}
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
            value={newPassword}
            onChange={() => setNewPassword(event.target.value)}
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
            value={confirmNewPassword}
            onChange={() => setConfirmNewPassword(event.target.value)}
            required
            shadow
          />
        </div>

        {errorMessage && <div className="text-red-500">{errorMessage}</div>}

        <Button
          type="submit"
          className="w-2/3 m-auto mt-6"
          // disabled={
          //   newPassword !== confirmNewPassword ||
          //   newPassword === "" ||
          //   confirmNewPassword === ""
          // }
        >
          Update
        </Button>
      </form>
      <hr />
      <div className="flex flex-col justify-center justify-items-center"></div>
    </Card>
  );
}

export default ChangePasswordPage;
