import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { ArrowDownIcon, PlusIcon } from "lib/@heroicons";
import { Divider } from "components";
import Option from "./../Option";
import SelectList from "../SelectList";
import useModal from "hooks/useModal";
import Modal from "components/Modal";
import AddRecipient from "../AddRecipient";
import { TransferCard } from "features/payout";
import EditRecipient from "../EditRecipient";

const offices = [
  {
    _id: "6310a930d74275d6cdd15be3",
    name: "مكتب الدانا",
    address: "غزة-شارع الشهداء، مقابل برج فلسطين",
    fees: 1,
    startingHour: "08:00",
    endingHour: "20:00",
  },
  {
    _id: "6342c8cb413b5bf1722e33f5",
    name: "مكتب حرزالله",
    address: "غزة-شارع الشهداء، مقابل برج فلسطين",
    fees: 1,
    startingHour: "08:00",
    endingHour: "20:00",
  },
  {
    _id: "637373ba54ceb455af5a2751",
    name: "مكتب الدانا",
    address: "غزة-شارع الشهداء، مقابل برج فلسطين",
    fees: 1,
    startingHour: "08:00",
    endingHour: "10:00",
  },
  {
    _id: "6373741e28859db2b7c1d697",
    name: "مكتب الدانا",
    address: "غزة-شارع الشهداء، مقابل برج فلسطين",
    fees: 1,
    startingHour: "08:00",
    endingHour: "10:00",
  },
  {
    _id: "6373796e48487798d2ae3913",
    name: "مكتب الدانا",
    address: "غزة-شارع الشهداء، مقابل برج فلسطين",
    fees: 0,
    startingHour: "08:00",
    endingHour: "10:00",
  },
  {
    _id: "6373799448487798d2ae3916",
    name: "مكتب الدانا",
    address: "غزة-شارع الشهداء، مقابل برج فلسطين",
    fees: 0,
    startingHour: "08:00",
    endingHour: "10:00",
  },
  {
    _id: "637379c1b0e12ea57c3ac2ce",
    name: "مكتب الدانا",
    address: "غزة-شارع الشهداء، مقابل برج فلسطين",
    fees: 0,
    startingHour: "08:00",
    endingHour: "10:00",
  },
  {
    _id: "637379f0b0e12ea57c3ac2d1",
    name: "مكتب الدانا",
    address: "غزة-شارع الشهداء، مقابل برج فلسطين",
    fees: 1,
    startingHour: "08:00",
    endingHour: "10:59",
  },
  {
    _id: "63b449d5efdc62544da3cb40",
    name: "مكتب الدانا",
    address: "غزة-شارع الشهداء، مقابل برج فلسطين",
    fees: 1,
    startingHour: "08:00",
    endingHour: "15:59",
  },
  {
    _id: "63b6f40f4e18dcc1124db800",
    name: "مكتب الدانا",
    address: "غزة-شارع الشهداء، مقابل برج فلسطين",
    fees: 1,
    startingHour: "08:00",
    endingHour: "15:59",
  },
];

const recipients = [
  {
    _id: "641037e62072538a20bedab5",
    name: "Ahmed Thabet",
    mobile: "+970597039224",
    idNumber: "123456788",
    createdAt: "2023-03-14T09:01:26.252Z",
    updatedAt: "2023-03-14T09:01:26.252Z",
  },
  {
    _id: "640f9158a3350410c1a420d2",
    name: "Heba Skhail",
    mobile: "+970597039225",
    idNumber: "123456709",
    createdAt: "2023-03-13T21:10:48.320Z",
    updatedAt: "2023-03-13T21:10:48.320Z",
  },
  {
    _id: "640f5ec5a6e6654e4fc9a769",
    name: "Heba Skhail",
    mobile: "+970597039225",
    idNumber: "1234567090",
    createdAt: "2023-03-13T17:35:01.763Z",
    updatedAt: "2023-03-13T17:35:01.763Z",
  },
  {
    _id: "640f5eb4a6e6654e4fc9a757",
    name: "Heba Skhail",
    mobile: "+970597039225",
    idNumber: "1234567790",
    createdAt: "2023-03-13T17:34:44.317Z",
    updatedAt: "2023-03-13T17:34:44.317Z",
  },
  {
    _id: "640f135aee0733bd4a2a8d4e",
    name: "Heba Skhail Recipient 1",
    mobile: "+970597039224",
    idNumber: "1234567890",
    createdAt: "2023-03-13T12:13:14.504Z",
    updatedAt: "2023-03-13T17:36:59.568Z",
  },
  {
    _id: "640f12460e919ceb77ca4007",
    name: "Heba Skhail",
    mobile: "+970597039225",
    idNumber: "1234567890",
    createdAt: "2023-03-13T12:08:38.005Z",
    updatedAt: "2023-03-13T12:08:38.005Z",
  },
];

export default function Cash() {
  const [selectedOffice, setSelectedOffice] = useState(offices[0]);
  const [selectedRecipient, setSelectedRecipient] = useState(recipients[0]);
  const addModalObj = useModal();
  const editModalObj = useModal();

  return (
    <>
      <div className="max-w-[450px] mx-auto">
        {/* Office select */}
        <div className="office mb-8">
          <p className="text-lg">Office</p>
          <SelectList
            selected={selectedOffice}
            setSelected={setSelectedOffice}
            selectedOptionComp={() => <OfficeOption office={selectedOffice} />}
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {offices.map((office, idx) => {
                const isLast = offices.length - 1 != idx;
                return <OfficeOption office={office} withDivider={isLast} />;
              })}
            </Listbox.Options>
          </SelectList>
        </div>
        {/* Recipient select */}
        <div className="recipient">
          <p className="text-lg">
            Recipient{" "}
            <span
              className="text-xs text-blue-light cursor-pointer ml-2"
              onClick={editModalObj.openModal}
            >
              Edit
            </span>
          </p>
          <SelectList
            selected={selectedRecipient}
            setSelected={setSelectedRecipient}
            selectedOptionComp={() => (
              <RecipentOption recipient={selectedRecipient} />
            )}
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg  focus:outline-none sm:text-sm z-50">
              {recipients.map((recipient, idx) => {
                const isLast = recipients.length - 1 != idx;
                return (
                  <RecipentOption recipient={recipient} withDivider={isLast} />
                );
              })}
            </Listbox.Options>
          </SelectList>
          <div className="flex justify-end  ml-2 mt-2">
            <span
              className="flex items-center text-sm text-blue-light cursor-pointer"
              onClick={addModalObj.openModal}
            >
              <PlusIcon width={"20px"} /> Add recipient
            </span>
          </div>
        </div>
      </div>
      <Modal {...addModalObj}>
        <TransferCard
          centerTitle={false}
          title="Add Recipient"
          closeModal={addModalObj.closeModal}
        >
          <AddRecipient />
        </TransferCard>
      </Modal>

      <Modal {...editModalObj}>
        <TransferCard
          centerTitle={false}
          title="Recipient"
          closeModal={editModalObj.closeModal}
        >
          <EditRecipient />
        </TransferCard>
      </Modal>
    </>
  );
}

const RecipentOption = ({ recipient, withDivider }) => {
  return (
    <Listbox.Option
      className={`relative cursor-pointer select-none pt-2 pl-6 pr-6 list-none`}
      value={recipient}
    >
      <div className={`block truncate`}>
        <div className="flex justify-end mb-1">
          <span className="font-bold">{recipient.name}</span>
        </div>
        <div className="flex justify-between items-end text-sm text-gray-400">
          <span>{`Phone: ${recipient.mobile}`}</span>
          <span>{`ID: ${recipient.idNumber}`}</span>
        </div>
      </div>
      {withDivider && <Divider />}
    </Listbox.Option>
  );
};
const OfficeOption = ({ office, withDivider }) => {
  return (
    <Listbox.Option
      className={`relative cursor-pointer select-none pt-2 pl-6 pr-6 list-none`}
      value={office}
    >
      <div className={`block truncate`}>
        <div className="flex justify-between items-end mb-1">
          <span className="font-bold">{office.name}</span>
          <span className="text-xs text-gray-400">
            ساعات العمل {office.startingHour} صباحا- {office.endingHour}مساءً
          </span>
        </div>
        <div className="flex justify-between items-end text-xs text-gray-400">
          <span>{office.address}</span>
          <span>{office.fees == 0 ? "بدون عمولة" : office.fees}</span>
        </div>
      </div>
      {withDivider && <Divider />}
    </Listbox.Option>
  );
};
