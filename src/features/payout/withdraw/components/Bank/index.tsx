import { Button, Select, Input, Image } from "components";
import Modal from "components/Modal";
import { TransferCard } from "../TransferCard";
import useModal from "hooks/useModal";
import { PlusIconMini, ChevronDownIconMini } from "lib/@heroicons";

import ListOfBanks from "../ListOfBanks";
import WithdrawPreview from "../WithdrawPreview";
import ModalAddBankAccount from "../ModalAddBankAccount";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { getCookie } from "lib/js-cookie";
import { COOKIES_KEYS } from "data";
import axios from "axios";
import { useSWR } from "lib/swr";
import useFetch from "../../hook/useFetch";

// type FormValues = {
//   amount: string;
// };
// type BankValues = {
//   accountName: string;
//   accountNumber: string;
//   bankBranch: string;
//   ledger: string;
// };

export const Bank = () => {
  const modalBank = useModal();
  const modalBankList = useModal();
  const modalWithdraw = useModal();

  const [amount, setAmount] = useState(0);

  const [bankData, setBankData] = useState({
    accountName: "",
    accountNumber: "",
    bankBranch: "",
    ledger: "",
  });

  const { fetchData, isLoading, error } = useFetch();

  const links = [
    { href: "/account-settings", label: "Account settings" },
    { href: "/support", label: "Support" },
    { href: "/license", label: "License" },
    { href: "/sign-out", label: "Sign out" },
  ];

  const handleInput = (e) => {
    const formField = e.target.name;
    setBankData({ ...bankData, [formField]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      accountName: bankData.accountName,
      accountNumber: bankData.accountNumber,
      bankBranch: bankData.bankBranch,
      ledger: bankData.ledger,
    };
    console.log(formData);

    // const currentUser = getCookie(COOKIES_KEYS.currentUser);
    // const options = {
    //   method: "POST",
    //   headers: {
    //     Authorization: `Bearer ${currentUser?.accessToken}`,
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(formData),
    // };
    // const data = await fetchData(options, `bank/send-code`);
  };

  console.log("test render bank");

  return (
    <div>
      <div className="mt-6">
        <div className="w-60 m-auto">
          <div className="flex justify-between items-center ">
            <p className="font-semibold text-xl">Amount</p>
            <div className="flex gap-1">
              <p className="text-sm text-gray-dark ">Available</p>
              <p
                className="text-base text-blue-light font-semibold cursor-pointer"
                onClick={(e: any) => setAmount(e.target.textContent.slice(1))}
              >
                $240.19
              </p>
            </div>
          </div>
          <Input
            id="amount-input"
            type="text"
            value={amount}
            placeholder="0"
            inputSize="small"
            inputClassName="h-20 text-base text-center font-semibold text-black !text-xl"
            labelClassName="text-gray-dark font-semibold text-lg"
            startIcon={
              <Image
                src="/assets/img/dollar.svg"
                width={30}
                height={30}
                alt="dollar"
              />
            }
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div>
          <div className="flex gap-2">
            <p className="text-xl font-semibold">Bank</p>
            <p
              className="text-blue-light cursor-pointer"
              onClick={modalBankList.openModal}
            >
              Edit
            </p>
          </div>
          {/* <Select
            options={optionsStatus}
            id="bank-select"
            placeholder="Select a bank account"
            selectSize="small"
            className="flex-1 basis-full text-gray-dark font-semibold text-lg"
            selectClassName="h-16"
          /> */}
          <Menu as="div" className="relative">
            <div>
              <Menu.Button className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                Options
                <ChevronDownIconMini
                  className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
                  aria-hidden="true"
                />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-1 w-full origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-1 py-1 ">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-gray-light text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        {/* {active ? (
                          <EditActiveIcon
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                          />
                        ) : (
                          <EditInactiveIcon
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                          />
                        )} */}
                        Edit
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        {/* {active ? (
                          <DuplicateActiveIcon
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                          />
                        ) : (
                          <DuplicateInactiveIcon
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                          />
                        )} */}
                        Duplicate
                      </button>
                    )}
                  </Menu.Item>
                </div>
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        {/* {active ? (
                          <ArchiveActiveIcon
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                          />
                        ) : (
                          <ArchiveInactiveIcon
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                          />
                        )} */}
                        Archive
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        {/* {active ? (
                          <MoveActiveIcon
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                          />
                        ) : (
                          <MoveInactiveIcon
                            className="mr-2 h-5 w-5"
                            aria-hidden="true"
                          />
                        )} */}
                        Move
                      </button>
                    )}
                  </Menu.Item>
                </div>
                <div className="px-1 py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? "bg-violet-500 text-white" : "text-gray-900"
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      >
                        {/* {active ? (
                          <DeleteActiveIcon
                            className="mr-2 h-5 w-5 text-violet-400"
                            aria-hidden="true"
                          />
                        ) : (
                          <DeleteInactiveIcon
                            className="mr-2 h-5 w-5 text-violet-400"
                            aria-hidden="true"
                          />
                        )} */}
                        Delete
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
          <p
            className="text-blue-light cursor-pointer flex flex-1 justify-end "
            onClick={modalBank.openModal}
          >
            <PlusIconMini className="w-5" />
            Add bank account
          </p>

          <Button
            type="button"
            buttonSize="small"
            fullWidth
            className="text-2xl bg-blue-light mt-8"
            onClick={modalWithdraw.openModal}
          >
            Withdraw
          </Button>
        </div>
      </div>
      {/* Modal for edit bank account */}
      <Modal {...modalBankList} className="!w-[700px] !px-28">
        <TransferCard
          centerTitle={false}
          title="Bank Accounts"
          closeModal={modalBankList.closeModal}
        >
          <ListOfBanks
            // register={register}
            // onSubmit={onSubmit}
            // setValue={setValue}
            // bankData={data}
            setBankData={setBankData}
          />
        </TransferCard>
      </Modal>
      {/* Modal for Withdraw */}
      <Modal {...modalWithdraw} className="!w-[700px] !px-28">
        <TransferCard
          centerTitle={true}
          title="Withdraw Preview"
          closeModal={modalWithdraw.closeModal}
        >
          <WithdrawPreview />
        </TransferCard>
      </Modal>
      {/* Modal for add bank account */}
      <Modal {...modalBank} className="!w-[700px] !px-28">
        <TransferCard
          centerTitle={false}
          title="Add Bank Account"
          closeModal={modalBank.closeModal}
        >
          <ModalAddBankAccount
            // data={data}
            setBankData={setBankData}
            handleInput={handleInput}
            handleSubmit={handleSubmit}
            // register={register}
            // onSubmit={onSubmit}
          />
        </TransferCard>
      </Modal>
    </div>
  );
};
export default Bank;
