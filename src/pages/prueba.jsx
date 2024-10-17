import React, { useState } from "react";

function TechForm(props) {
  const {tech , setTech } = props
  
  const [inputValue, setInputValue] = useState(""); // Estado para el valor del input

  // Manejar el cambio en el campo de entrada
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Manejar la adición de una nueva tecnología
  const handleAddTech = () => {
    if (inputValue && !tech.includes(inputValue)) { // Verifica que no esté vacío y que no se duplique
      setTech([...tech, inputValue]); // Añade la nueva tecnología al array
      setInputValue(""); // Limpia el campo de entrada
    }
  };

  // Manejar la eliminación de una tecnología
  const handleRemoveTech = (techToRemove) => {
    setTech(tech.filter((t) => t !== techToRemove)); // Filtra la tecnología a eliminar
  };

  return (
    <>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter technology"
            value={inputValue}
            onChange={handleInputChange}
            className="p-3 border rounded flex-grow"
          />
          <button
            type="button"
            onClick={handleAddTech}
            className="p-3 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        <div>
          <h3 className="text-lg font-semibold">Technologies Added:</h3>
          <ul className="list-disc pl-5">
            {tech.map((t, index) => (
              <li key={index} className="flex justify-between items-center">
                {t}
                <button
                  type="button"
                  onClick={() => handleRemoveTech(t)}
                  className="text-red-500 hover:text-red-700"
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        </div>
    </>
  );
}

export default TechForm;
