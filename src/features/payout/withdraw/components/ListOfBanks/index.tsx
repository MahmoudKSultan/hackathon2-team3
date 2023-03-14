import { Image, Button } from "components";
import { useState } from "react";
import { MiniCard } from "../MiniCard";
import { DeleteIcon, EditIcon } from "lib/@heroicons";
import { getCookie } from "lib/js-cookie";
import axios from "axios";
import { COOKIES_KEYS } from "data";
import { useSWR } from "lib/swr";

export const ListOfBanks = () => {
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

  console.log(data);

  return (
    <div className="">
      {data?.data?.banks?.map((bank: any) => {
        return (
          <MiniCard className="">
            <div className="flex justify-between">
              <p className="font-semibold text-xl">{bank.accountName}</p>
              <div className="flex gap-3 ">
                <DeleteIcon className="w-5" />
                <EditIcon className="w-5" />
              </div>
            </div>
            <div>
              <p className="text-xl">{bank.accountNumber}</p>
            </div>
          </MiniCard>
        );
      })}
      {/* <MiniCard className="">
        <div className="flex justify-between">
          <p className="font-semibold text-xl">Safa Mousa</p>
          <div className="flex gap-3 ">
            <DeleteIcon className="w-5" />
            <EditIcon className="w-5" />
          </div>
        </div>
        <div>
          <p className="text-xl">0452-1064559-001-3100-000</p>
        </div>
      </MiniCard> */}
      <div className="flex gap-4 mt-8">
        <Button
          type="submit"
          buttonSize="small"
          fullWidth
          className="bg-white border text-2xl border-gray-dark !text-black hover:!text-white"
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
