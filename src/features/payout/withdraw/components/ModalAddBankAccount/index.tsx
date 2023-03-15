import { Button, Input, Select } from "components";
import { useState } from "react";
import { MiniCard } from "../MiniCard";
import { DeleteIcon, EditIcon } from "lib/@heroicons";
import { getCookie } from "lib/js-cookie";
import { COOKIES_KEYS } from "data";
import axios from "axios";
import { useSWR } from "lib/swr";
import { useForm, Controller } from "react-hook-form";

import Dropdown from "../Dropdown";

export const ModalAddBankAccount = ({
  bankData = null,
  setBankData = (f) => f,
  handleInput = (f) => f,
  handleSubmit = (f) => f,
}) => {
  console.log(bankData);

  const branches = [
    {
      value: "Rimal",
      label: "0454 - Rimal",
    },
    {
      value: "Nussairat",
      label: "0448 - Nussairat",
    },
    {
      value: "Main Branch",
      label: "0451 - Main Branch",
    },
    {
      value: "Khan Younis",
      label: "0452 - Khan Younis",
    },
    {
      value: "Jabalia",
      label: "0453 - Jabalia",
    },
    {
      value: "Rafah",
      label: "0454 - Rafah",
    },
  ];

  const ledger = [
    {
      value: "Cuurent",
      label: "3000 - Cuurent",
    },
    {
      value: "Saving",
      label: "3100 - Saving",
    },
    {
      value: "Saving For Every Citizen",
      label: "3102 - Saving For Every Citizen",
    },
  ];

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Dropdown
          // data={branches}
          disabled
          label="Bank"
          placeholder="Bank of Palestine"
        />
        <Input
          id="full-name-input"
          label="Account Owner Full Name"
          name="accountName"
          //   placeholder="$0.00"
          inputSize="small"
          inputClassName="h-16 text-base"
          labelClassName="text-gray-dark font-semibold text-lg"
          onChange={handleInput}
          value={bankData?.accountName}
          // setValue={data?.accountName}
          // value={data?.accountName}
        />
        {/* <Select
          options={getBankBranches()}
          id="branch-select"
          label="Branch"
          selectSize="small"
          className="flex-1 basis-full text-gray-dark font-semibold text-lg"
          selectClassName="h-16"
          {...register("branch")}
        /> */}
        <Dropdown
          data={branches}
          label="Branch"
          name="bankBranch"
          bankData={bankData}
          setBankData={setBankData}
        />

        <Input
          id="account-number-input"
          label="Account Number"
          name="accountNumber"
          //   placeholder="Account Number"
          inputSize="small"
          inputClassName="h-16 text-base"
          labelClassName="text-gray-dark font-semibold text-lg"
          onChange={handleInput}
          value={bankData?.accountNumber}
        />

        {/* <Select
          options={getCurrency()}
          id="currency-select"
          label="Currency"
          selectSize="small"
          className="text-gray-dark font-semibold text-lg"
          selectClassName="h-16 bg-gray-light"
          {...register("currency")}
        /> */}
        <Dropdown label="Currency" placeholder="USD" disabled />
        {/* <Select
          options={getLedger()}
          id="ledger-select"
          label="Ledger"
          selectSize="small"
          className="text-gray-dark font-semibold text-lg"
          selectClassName="h-16"
          {...register("ledger")}
        /> */}
        <Dropdown
          data={ledger}
          label="Ledger"
          name="ledger"
          bankData={bankData}
          setBankData={setBankData}
          getValues={() => setBankData()}
        />

        <Button
          type="submit"
          buttonSize="small"
          fullWidth
          className="text-2xl bg-blue-light"
        >
          Confirm
        </Button>
      </form>
    </div>
  );
};
export default ModalAddBankAccount;
