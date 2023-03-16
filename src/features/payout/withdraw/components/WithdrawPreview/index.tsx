import { Image, Button } from "components";
import { useState } from "react";
import { MiniCard } from "../MiniCard";
import { DeleteIcon, EditIcon } from "lib/@heroicons";
import useFetch from "../../hook/useFetch";
import { getCookie } from "lib/js-cookie";
import { COOKIES_KEYS } from "data";

export const WithdrawPreview = ({ selectedBank, selectedBalance }: any) => {
  const currentUser = getCookie(COOKIES_KEYS.currentUser);

  const { fetchData, isLoading, error } = useFetch();

  const handleConfirmWithdraw = async () => {
    const formData = {
      amount: selectedBalance,
      bankId: selectedBank._id,
    };

    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${currentUser?.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    console.log(options);

    // const dataBank = await fetchData(options, `withdraw/request-bank`);
  };

  return (
    <div className="flex flex-col gap-4 justify-center">
      <div className="flex flex-col items-center">
        <p className=" text-gray-dark">Amount:</p>
        <p className="text-blue-light text-4xl font-semibold">
          {selectedBalance} USD
        </p>
      </div>
      <div>
        <p>Transferred to:</p>
        <MiniCard>
          <div className="flex gap-5 items-center">
            <Image
              src="/assets/img/bank.svg"
              width={40}
              height={40}
              alt="Bank"
            />
            <div>
              <p>
                {selectedBank?.bankName} - {selectedBank?.accountName}
              </p>
              <p>
                {selectedBank?.accountNumber}-001-{selectedBank?.ledger}-000
              </p>
            </div>
          </div>
        </MiniCard>
      </div>

      <MiniCard>
        <div className="flex justify-between">
          <div>
            <p>Transfer amount</p>
            <p>Fee</p>
          </div>
          <div>
            <p>${selectedBalance}</p>
            <p>Free</p>
          </div>
        </div>
        <hr className="my-1 bg-gray-dark h-0.5 "></hr>
        <div className="flex justify-between">
          <p>You'll get</p>
          <p>${selectedBalance}</p>
        </div>
      </MiniCard>
      <ul className="space-y-1 list-disc list-inside p-4">
        <li>Estimated arrival: 2 business days.</li>
        <li>Transfers made after 9:00 PM or on weekends takes longer.</li>
        <li>
          All transfers are subject to review and could be delayed or stopped if
          we identify an issue.
        </li>
      </ul>

      <Button
        type="submit"
        buttonSize="small"
        fullWidth
        className="text-2xl bg-blue-light"
        onClick={handleConfirmWithdraw}
      >
        Confirm
      </Button>
    </div>
  );
};
export default WithdrawPreview;
