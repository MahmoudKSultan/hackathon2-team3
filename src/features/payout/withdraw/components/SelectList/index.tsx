import React from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ArrowDownIcon } from "lib/@heroicons";
import Option from "../Option";

export function SelectList({
  selected,
  setSelected,
  selectedOptionComp,
  children,
}) {
  console.log(selectedOptionComp);

  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative mt-1" dir="rtl">
        <Listbox.Button className="relative w-full cursor-pointer rounded-md bg-white py-2 pl-3 pr-10 text-left border sm:text-sm">
          {/* Selected */}
          {selectedOptionComp()}
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ArrowDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={React.Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          {children}
        </Transition>
      </div>
    </Listbox>
  );
}

export default SelectList;
