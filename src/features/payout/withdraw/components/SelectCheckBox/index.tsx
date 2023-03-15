import { Button } from "components";
import { options } from "features/payout/data";
import { BarsIcon } from "lib/@heroicons";
import React, { useState } from "react";



export const SelectCheckBox = ({selectedOption,setSelectedOption}) => {
  const [isOpen, setIsOpen] = useState(false);
  // const [selectedOption, setSelectedOption] = useState("");

  const toggling = () => setIsOpen(!isOpen);

  const onOptionClicked = (value) => () => {
    setSelectedOption(value);
    console.log(selectedOption);
  };

  return (
    <div className="relative">
      <Button
        onClick={toggling}
        className="bg-white text-[#707070] hover:bg-slate-50 flex pl-5"
      >
        <BarsIcon className="h-5 w-5 mt-1 mr-1"/>
        <span>Filter</span>
        
      </Button>
      {isOpen && (
        <div className="mt-1 absolute right-0 shadow-md border">
            {options.map((option) => (
              <div key={option.id} className="bg-white flex p-2" >
              <input type="checkbox" className="mr-5 mt-1 ml-2"   onChange={onOptionClicked(option.id)} />
              <label>
                {option.select}
              </label>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};
export default SelectCheckBox;
