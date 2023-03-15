import { Image, Button } from "components";
import { useState } from "react";
import { MiniCard } from "../MiniCard";
import { DeleteIcon, EditIcon } from "lib/@heroicons";
import { getCookie } from "lib/js-cookie";
import axios from "axios";
import { COOKIES_KEYS } from "data";
import { useSWR } from "lib/swr";

import ModalAddBankAccount from "../ModalAddBankAccount";
import useModal from "hooks/useModal";
import Modal from "components/Modal";
import TransferCard from "../TransferCard";

import ItemBank from "../ItemBank";

export const ListOfBanks = ({ bankData, setBankData = (f) => f }) => {
  const modalEditBank = useModal();
  const getListOfBank = async (url: string) => {
    const currentUser = getCookie(COOKIES_KEYS.currentUser);
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${currentUser?.accessToken}`,
        "Content-Type": "application/json",
      },
    });
    return res.data;
  };

  const { data, error, isLoading } = useSWR(
    "https://talents-valley-backend.herokuapp.com/api/bank/listing?offset=0&limit=10",
    getListOfBank
  );

  // console.log("test data", data);

  // const handleEdit = (id: any) => {
  //   const { data, error, isLoading } = useSWR(
  //     `https://talents-valley-backend.herokuapp.com/api/bank/details/${id}`,
  //     getListOfBank
  //   );

  //   return data.data;
  // };

  return (
    <div className="">
      {data?.data?.banks?.map((bank: any) => {
        return (
          <ItemBank bank={bank} setBankData={setBankData} bankData={bankData} />
        );
      })}

      {/* Modal for add bank account */}
      <Modal {...modalEditBank} className="!w-[700px] !px-28">
        <TransferCard
          centerTitle={false}
          title="Add Bank Account"
          closeModal={modalEditBank.closeModal}
        >
          <ModalAddBankAccount data={data} setBankData={setBankData} />
        </TransferCard>
      </Modal>
      <div className="flex gap-4 mt-8">
        <Button
          type="button"
          buttonSize="small"
          fullWidth
          className="bg-white border text-2xl border-gray-dark !text-black hover:!text-white"
          onClick={() => modalEditBank.openModal()}
        >
          Add
        </Button>
        <Button
          type="submit"
          buttonSize="small"
          fullWidth
          className="text-2xl bg-blue-light"
        >
          Select
        </Button>
      </div>
    </div>
  );
};
export default ListOfBanks;
