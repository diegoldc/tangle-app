import React, { useState } from "react";
import { Button , Label , TextInput, Badge  } from "flowbite-react";



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
            className="!bg-deep-purple !focus:bg-deep-purple hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"
          >
            Add
          </Button>
        </div>

        <div style={{marginTop: "5px"}}>
          <Label value="Technologies added:" />
          <div className="flex flex-row flex-wrap gap-3 bg-deep-purple min-h-20 w-auto overflow-hidden p-2 justify-center rounded-lg mt-2">
            {tech.map((tech, index) => (
              <Badge key={index} color="purple" size="small">
                  {tech}
                <button
                  type="button"
                  onClick={() => handleRemoveTech(tech)}
                  className="text-purple-800 hover:text-purple-700"
                  >
                  &nbsp;&nbsp;x
                </button>
              </Badge>
            ))}
          </div>
        </div>
    </>
  );
}

export default AddTechnologies