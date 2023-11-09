import React, { useState } from "react";

const DropdownSelector = () => {
  const [selectedOption, setSelectedOption] = useState("option1");

  const handleSelectChange = (e: any) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div>
      <h2>Dropdown Selector</h2>
      <select value={selectedOption} onChange={handleSelectChange}>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
        <option value="option4">Option 4</option>
      </select>
      <p>Selected Option: {selectedOption}</p>
    </div>
  );
};

export default DropdownSelector;
