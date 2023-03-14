import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIconMini } from "lib/@heroicons";
import { Fragment, useState } from "react";

export const Dropdown = ({
  data,
  disabled = false,
  label,
  placeholder = "",
  register,
  name,
}) => {
  const [selected, setSelected] = useState("");
  const optionsStatus = [
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
    { value: "3", label: "Option 3" },
  ];

  return (
    <div className=" relative h-32">
      <label className="text-gray-dark font-semibold text-lg">{label}</label>
      <Menu as="div" className="relative">
        <div>
          <Menu.Button
            disabled={disabled}
            className="inline-flex w-full justify-between items-center  rounded-md bg-gray-light h-16  px-4"
          >
            {placeholder === "" ? selected : placeholder}
            {/* {selected} */}
            <ChevronDownIconMini
              className=" absolute right-3 h-5 w-5 text-gray-dark"
              aria-hidden="true"
            />
          </Menu.Button>
        </div>

        <Menu.Items className="absolute right-0 mt-1 w-full z-10  bg-white shadow-lg ring-1 ring-black ring-opacity-5 ">
          {data.map((item) => (
            <div className="px-1 py-1 ">
              <Menu.Item>
                <button
                  className={` group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  onClick={() => setSelected(item.label)}
                  // {...register(name)}
                >
                  {item.label}
                </button>
              </Menu.Item>
            </div>
          ))}
        </Menu.Items>
      </Menu>
    </div>
  );
};
export default Dropdown;
