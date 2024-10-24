import { FileInput, Label, Button, Card } from "flowbite-react";
import service from "../services/config";
import { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";

function UpdateAvatar({ getData, setOpen }) {
  const { loggedUserId, setLoggedUserImg } = useContext(AuthContext);

  const [img, setImg] = useState("");

  const previewFiles = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImg(reader.result);
    };
  };

  const handleImgChange = (e) => {
    previewFiles(e.target.files[0]);
  };

  const handleImgUpload = async () => {
    try {
      const response = await service.post("/upload-img", { image: img }, {});
      await service.patch(`/users/${loggedUserId}/profile`, {
        img: response.data.url,
      });
      setLoggedUserImg(response.data.url);
      getData();
      setOpen(false);
    } catch (error) {
      console.log("error al actualizar la imagen de usuario", error);
    }
  };

  return (
    <Card className="flex w-full items-center justify-center">
      <Label
        htmlFor="dropzone-file"
        className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div className="flex flex-col items-center justify-center pb-6 pt-5">
          <svg
            className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span>
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            SVG, PNG or JPG
          </p>
        </div>
        <Button
          className="!bg-deep-purple !focus:bg-deep-purple hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
          onClick={handleImgUpload}
        >
          Update Picture
        </Button>
        <FileInput
          onChange={handleImgChange}
          id="dropzone-file"
          className="hidden"
        />
      </Label>
    </Card>
  );
}

export default UpdateAvatar;
