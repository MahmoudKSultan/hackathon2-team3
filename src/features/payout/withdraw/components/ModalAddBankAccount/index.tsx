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
  data,
  setBankData = (f) => f,
  register,
  onSubmit,
}) => {
  const optionsStatus = [
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
    { value: "3", label: "Option 3" },
  ];

  const getBankBranches = () => {
    return data?.data?.banks?.map((bank: any) => {
      return { value: bank._id, label: bank.bankBranch };
    });
  };
  const getCurrency = () => {
    return data?.data?.banks?.map((bank: any) => {
      return { value: bank._id, label: bank.currency };
    });
  };
  const getLedger = () => {
    return data?.data?.banks?.map((bank: any) => {
      return { value: bank._id, label: bank.ledger };
    });
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        {/* <Select
          options={optionsStatus}
          placeholder="Bank of Palestine"
          id="bank-select"
          label="Bank"
          selectSize="small"
          className="flex-1 basis-full  text-gray-dark font-semibold text-lg"
          selectClassName="h-16 bg-gray-light"
          disabled
          {...register("name")}
        /> */}
        <Dropdown
          data={getBankBranches()}
          disabled
          label="Bank"
          placeholder="Bank of Palestine"
        />
        <Input
          id="full-name-input"
          label="Account Owner Full Name"
          //   placeholder="$0.00"
          inputSize="small"
          inputClassName="h-16 text-base"
          labelClassName="text-gray-dark font-semibold text-lg"
          {...register("accountName")}
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
          data={getBankBranches()}
          label="Branch"
          register={register}
          name="bankBranch"
        />

        <Input
          id="account-number-input"
          label="Account Number"
          //   placeholder="Account Number"
          inputSize="small"
          inputClassName="h-16 text-base"
          labelClassName="text-gray-dark font-semibold text-lg"
          {...register("accountNumber")}
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
        <Dropdown
          data={getCurrency()}
          label="Currency"
          placeholder="USD"
          disabled
        />
        {/* <Select
          options={getLedger()}
          id="ledger-select"
          label="Ledger"
          selectSize="small"
          className="text-gray-dark font-semibold text-lg"
          selectClassName="h-16"
          {...register("ledger")}
        /> */}
        <Dropdown data={getLedger()} label="Ledger" />

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
