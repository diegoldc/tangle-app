import React, { useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import service from "../services/config";


function AddScreenshots(props) {
  const { screenshots, setScreenshots } = props;
  const [uploadPic, setUploadPic] = useState("");
  const [file, setFile] = useState("");
  
  const handleImgChange = (e) => {
    console.log(e.target.files[0]);
    setFile(e.target.files[0]);
    previewFiles(e.target.files[0]);
    console.log(uploadPic);
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
      console.log(response.data);
    } catch (error) {
      console.log("error al subir una imagen a la nube", error);
    }
  };

  const handleDeleteScreenshot = (imgToDelete) => {
    setScreenshots(screenshots.filter((img) => img !== imgToDelete));
  };

  return (
    <>
      <div>
        <input
          id="screenshots"
          type="file"
          autoComplete="off"
          // value={screenshots}
          onChange={handleImgChange}
          accept="image/png, image/jpeg, image/jpg"
        />
        <Button type="button" onClick={handlePicUpload}>
          Add
        </Button>
      </div>
      <ul
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "100%",
          gap: "10px",
          marginTop:"10px"
        }}
      >
        {screenshots!== null && screenshots.length > 0 &&
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
