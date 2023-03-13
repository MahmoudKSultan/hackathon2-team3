import { Listbox, Transition } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { Button, Image } from "components";
import { useState } from "react";

export const ListBoxRecipient = () => {
    const people = [
        {
            address: 'غزة - مكتب الدانا',
            addressDes: "الرمال _ تقاطع شارع فلسطين مع الشهداء",
            dateWork: "ساعات العمل: 9 صباحا -7مساءا",
            commission: "بدون عمولة"
        },
        {
            address: 'غزة - مكتب البرعصي',
            addressDes: "الرمال _ تقاطع شارع فلسطين مع الشهداء",
            dateWork: "ساعات العمل: 9 صباحا -7مساءا",
            commission: "بدون عمولة"
        },
        {
            address: 'غزة - مكتب شقليه',
            addressDes: "الرمال _ تقاطع شارع فلسطين مع الشهداء",
            dateWork: "ساعات العمل: 9 صباحا -7مساءا",
            commission: "بدون عمولة"
        },
        {
            address: 'غزة - مكتب حرزالله',
            addressDes: "الرمال _ تقاطع شارع فلسطين مع الشهداء",
            dateWork: "ساعات العمل: 9 صباحا -7مساءا",
            commission: "بدون عمولة"
        },
    ]

    const [selected, setSelected] = useState(people[0])

    return (
        <>
            <Listbox value={selected} onChange={setSelected} >
                <div className="relative mt-1 ">
                    <Listbox.Button className="relative w-5/6 cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left border focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm h-14">
                        {/* <span className="block truncate">{selected.address}</span> */}
                        <div className="flex justify-between">
                            <div className="flex flex-col">
                                <span
                                    className={`block truncate text-[#9E9E9E] text-[4px] ${selected ? 'font-medium' : 'font-normal'
                                        }`}
                                >
                                    {selected.dateWork}
                                </span>
                                <span
                                    className={`block truncate text-[#9E9E9E] text-[11px] ${selected ? 'font-medium' : 'font-normal'
                                        }`}
                                >
                                    {selected.commission}
                                </span>
                            </div>

                            <div className="flex flex-col text-right mr-4">
                                <span
                                    className={`block truncate text-black text-[16px] ${selected ? 'font-bold' : 'font-bold'
                                        }`}
                                >
                                    {selected.address}
                                </span>
                                <span
                                    className={`block truncate text-[#9E9E9E] text-[12px] ${selected ? 'font-medium' : 'font-normal'
                                        }`}
                                >
                                    {selected.addressDes}
                                </span>
                            </div>
                        </div>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </span>
                    </Listbox.Button>
                    <Transition
                        // as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute mt-1 max-h-60 w-5/6 z-40 overflow-auto rounded-md bg-white py-1 text-base  ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {people.map((person, personIdx) => (
                                <Listbox.Option
                                    key={personIdx}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                        }`
                                    }
                                    value={person}
                                >
                                    {({ selected }) => (
                                        <>
                                            <div className="flex justify-between">
                                                <div className="flex flex-col">
                                                    <span
                                                        className={`block truncate text-[#9E9E9E] text-[4px] ${selected ? 'font-medium' : 'font-normal'
                                                            }`}
                                                    >
                                                        {person.dateWork}
                                                    </span>
                                                    <span
                                                        className={`block truncate text-[#9E9E9E] text-[12px] ${selected ? 'font-medium' : 'font-normal'
                                                            }`}
                                                    >
                                                        {person.commission}
                                                    </span>
                                                </div>

                                                <div className="flex flex-col text-right mr-4">
                                                    <span
                                                        className={`block truncate text-black text-[16px] ${selected ? 'font-bold' : 'font-bold'
                                                            }`}
                                                    >
                                                        {person.address}
                                                    </span>
                                                    <span
                                                        className={`block truncate text-[#9E9E9E] text-[12px] ${selected ? 'font-medium' : 'font-normal'
                                                            }`}
                                                    >
                                                        {person.addressDes}
                                                    </span>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </>
    );
};

export default ListBoxRecipient;