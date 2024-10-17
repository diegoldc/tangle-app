import React, { useState } from "react";
import { Button , Label , TextInput } from "flowbite-react";



function AddTechnologies(props) {
  
  const {tech , setTech } = props
  
  const [techsValue, setTechsValue] = useState("")

  const handleTechsChange = (e) => {
    setTechsValue(e.target.value);
  };

  const handleAddTech = () => {
    if (techsValue && !tech.includes(techsValue)) { 
      setTech([...tech, techsValue])
      setTechsValue("")
    }
  };

  const handleRemoveTech = (techToRemove) => {
    setTech(tech.filter((tech) => tech !== techToRemove))
  };

  return (
    <>
        <div className="flex gap-2 w-full">
          <TextInput
            type="text"
            placeholder="Enter technology"
            value={techsValue}
            onChange={handleTechsChange}
            className="w-full"
          />
          <Button
            type="button"
            onClick={handleAddTech}
          >
            Add
          </Button>
        </div>

        <div>
          <Label value="Technologies added:" />
          <ul className="list-disc pl-5">
            {tech.map((tech, index) => (
              <li key={index} className="flex justify-start gap-2 items-center">
                <button
                  type="button"
                  onClick={() => handleRemoveTech(tech)}
                  className="text-red-500 hover:text-red-700"
                  >
                  x
                </button>
                  {tech}
              </li>
            ))}
          </ul>
        </div>
    </>
  );
}

export default AddTechnologies