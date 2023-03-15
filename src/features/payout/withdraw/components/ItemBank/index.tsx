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

import useFetch from "../../hook/useFetch";

export const ItemBank = ({ bank, bankData, setBankData }) => {
  const modalEditBank = useModal();
  const [data, setData] = useState([]);
  //   const getListOfBank = async (url: string) => {
  //     const currentUser = getCookie(COOKIES_KEYS.currentUser);
  //     const res = await axios.get(url, {
  //       headers: {
  //         Authorization: `Bearer ${currentUser?.accessToken}`,
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     return res.data;
  //   };

  const { fetchData, isLoading, error } = useFetch();

  //   const { data, error, isLoading } = useSWR(
  //     `https://talents-valley-backend.herokuapp.com/api/bank/${bank._id}`,
  //     getListOfBank
  //   );

  const handleEdit = async (id: any) => {
    const currentUser = getCookie(COOKIES_KEYS.currentUser);
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${currentUser?.accessToken}`,
        "Content-Type": "application/json",
      },
    };
    const data = await fetchData(options, `bank/details/${id}`);
    setData(data.data);

    // return data;
  };

  return (
    <div className="">
      <MiniCard className="">
        <div className="flex justify-between">
          <p className="font-semibold text-xl">{bank.accountName}</p>
          <div className="flex gap-3 ">
            <DeleteIcon className="w-5 cursor-pointer" />
            <EditIcon
              className="w-5 cursor-pointer"
              onClick={() => {
                handleEdit(bank._id);
                modalEditBank.openModal();
              }}
            />
          </div>
        </div>
        <div>
          <p className="text-xl">{bank.accountNumber}</p>
        </div>
      </MiniCard>

      {/* Modal for edit bank account */}
      <Modal {...modalEditBank} className="!w-[700px] !px-28">
        <TransferCard
          centerTitle={false}
          title="Add Bank Account"
          closeModal={modalEditBank.closeModal}
        >
          <ModalAddBankAccount bankData={data} setBankData={setBankData} />
        </TransferCard>
      </Modal>
    </div>
  );
};
export default ItemBank;
