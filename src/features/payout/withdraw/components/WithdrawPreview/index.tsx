import { Image, Button, Divider, Modal } from "components";
import { useState } from "react";
import { MiniCard } from "../MiniCard";
import { DeleteIcon, EditIcon } from "lib/@heroicons";
import { TransferCard } from "features/payout";

export const WithdrawPreview = ({ modalObj, recipient, office }) => {
  return (
    <Modal {...modalObj}>
      <TransferCard
        centerTitle={true}
        title="Transfer Preview"
        closeModal={modalObj.closeModal}
      >
        <div className="text-center mb-5">
          <p className="text-sm font-bold text-[#8C8C8C]">Amount</p>
          <h2 className="font-bold text-3xl text-[#4375FF]">240.00 USD</h2>
        </div>
        <div>
          <p className="text-sm text-[#8C8C8C] mb-2">Transferred to:</p>
          <MiniCard className="flex items-center justify-end mb-3 text-right gap-4">
            <div className="desc">
              <p className="text-sm text-blue-light">
                {office.name} - {recipient.name}
              </p>
              <p className="text-sm text-black">{office.address}</p>
            </div>
            <Image
              src="/assets/img/bank.png"
              alt="bankd image"
              width={35}
              height={35}
            />
          </MiniCard>
          <MiniCard className="text-black text-sm mb-3">
            <div className="flex justify-between items-center ">
              <p>Transfer amount</p>
              <p>$300</p>
            </div>
            <div className="flex justify-between items-center ">
              <p>Fee</p>
              <p>{office.fees == 0 ? office.fees : "Free"}</p>
            </div>
            <Divider />
            <div className="flex justify-between items-center ">
              <p>You'll get</p>
              <p>$300</p>
            </div>
          </MiniCard>
          {/* list of advises */}
          <ul className="text-sm mb-10 px-7">
            <li className='mb-2 before:content-["-"] -indent-1.5'>
              {" "}
              Estimated arrival: 2 business days.
            </li>
            <li className='mb-2 before:content-["-"] -indent-1.5'>
              {" "}
              Transfers made after 9:00 PM or on weekends takes longer.
            </li>
            <li className='mb-2 before:content-["-"] -indent-1.5'>
              {" "}
              All transfers are subject to review and could be delayed or
              stopped if we identify an issue.
            </li>
          </ul>
          <Button fullWidth={true} onClick={modalObj.closeModal}>
            Confirm
          </Button>
        </div>
      </TransferCard>
    </Modal>
  );
};
export default WithdrawPreview;
