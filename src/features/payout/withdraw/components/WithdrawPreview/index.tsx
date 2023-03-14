import { Image, Button } from "components";
import { useState } from "react";
import { MiniCard } from "../MiniCard";
import { DeleteIcon, EditIcon } from "lib/@heroicons";

export const WithdrawPreview = () => {
  return (
    <div className="flex flex-col gap-4 justify-center">
      <div className="flex flex-col items-center">
        <p className=" text-gray-dark">Amount:</p>
        <p className="text-blue-light text-4xl font-semibold">300.00 USD</p>
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
              <p>Bank of Palestine - Safa Mousa</p>
              <p>0452-1064559-001-3100-000</p>
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
            <p>$300</p>
            <p>Free</p>
          </div>
        </div>
        <hr className="my-1 bg-gray-dark h-0.5 "></hr>
        <div className="flex justify-between">
          <p>You'll get</p>
          <p>$300</p>
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
      >
        Confirm
      </Button>
    </div>
  );
};
export default WithdrawPreview;
