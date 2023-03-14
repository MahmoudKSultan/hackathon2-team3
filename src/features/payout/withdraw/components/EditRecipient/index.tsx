import React from "react";
import { MiniCard, TransferCard } from "features/payout";
import { Button, IconButton, Image } from "components";
import Modal from "components/Modal";
import { useState } from "react";
import { VerifyCodeForm } from "features/authentication";
import { DeleteIcon, EditIcon } from "lib/@heroicons";
import useModal from "hooks/useModal";

function EditRecipient() {
  const modalObj = useModal();

  return (
    <>
      <div className="mb-7">
        <MiniCard className="!py-1 mb-3">
          <div className="flex justify-between items-center">
            <div className="flex flex-col sm:flex-row">
              <IconButton>
                <DeleteIcon />
              </IconButton>
              <IconButton>
                <EditIcon />
              </IconButton>
            </div>
            <h3 className="text-lg font-semibold text-right">محمد خلف</h3>
          </div>
          <div className="flex justify-between items-center">
            <p>ID: 406093195</p>
            <p>Phone: 0595105833</p>
          </div>
        </MiniCard>
        <MiniCard className="!py-1 mb-3">
          <div className="flex justify-between items-center">
            <div className="flex flex-col sm:flex-row">
              <IconButton>
                <DeleteIcon />
              </IconButton>
              <IconButton>
                <EditIcon />
              </IconButton>
            </div>
            <h3 className="text-lg font-semibold text-right">محمد خلف</h3>
          </div>
          <div className="flex justify-between items-center">
            <p>ID: 406093195</p>
            <p>Phone: 0595105833</p>
          </div>
        </MiniCard>
      </div>
      <div className="flex gap-3">
        <Button
          fullWidth={true}
          className="!bg-transparent !text-blue-light hover:bg-blue hover:text-white border-gray-light border-2"
          buttonSize="small"
        >
          Add
        </Button>
        <Button fullWidth={true} buttonSize="small">
          Select
        </Button>
      </div>
    </>
  );
}
export default EditRecipient;
