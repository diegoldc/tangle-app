import React, { useState } from "react";
import { Button, Label, TextInput, FileInput } from "flowbite-react";
import service from "../services/config";

function AddScreenshots(props) {
  const { screenshots, setScreenshots } = props;
  const [uploadPic, setUploadPic] = useState("");
  const [file, setFile] = useState("");

  const handleImgChange = (e) => {
    setFile(e.target.files[0]);
    previewFiles(e.target.files[0]);
  };

  const previewFiles = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setUploadPic(reader.result);
    };
  };

  const handlePicUpload = async () => {
    try {
      const response = await service.post(
        "/upload-img",
        { image: uploadPic },
        {}
      );
      if (screenshots === null || screenshots.length === 0) {
        setScreenshots([response.data.url]);
      } else {
        setScreenshots((current) => [...current, response.data.url]);
      }
    } catch (error) {
      console.log("error al subir una imagen a la nube", error);
    }
  };

  const handleDeleteScreenshot = (imgToDelete) => {
    setScreenshots(screenshots.filter((img) => img !== imgToDelete));
  };

  return (
    <>
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
          onClick={handlePicUpload}
        >
          Update Picture
        </Button>
        <FileInput
          onChange={handleImgChange}
          id="dropzone-file"
          className="hidden"
        />
      </Label>
      <ul
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "100%",
          gap: "10px",
          marginTop: "10px",
        }}
      >
        {screenshots !== null &&
          screenshots.length > 0 &&
          screenshots.map((img, index) => {
            return (
              <li key={index} style={{ position: "relative" }}>
                <img src={img} style={{ height: "80px", width: "auto" }} />
                <button
                  onClick={() => {
                    handleDeleteScreenshot(img);
                  }}
                  style={{
                    position: "absolute",
                    color: "red",
                    left: "90%",
                    top: "0px",
                  }}
                >
                  x
                </button>
              </li>
            );
          })}
      </ul>
    </>
  );
}

export default AddScreenshots;
