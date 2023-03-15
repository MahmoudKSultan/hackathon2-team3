import { Button, Input } from "components";
import Modal from "components/Modal";
import { useForm } from "react-hook-form";
import { TransferCard } from "features/payout";
import { getFieldHelperText } from "utils";
import { API_SERVICES_URLS } from "data";
import { useSwrFetch } from "hooks";
import { useState } from "react";

// type FormAddRecipient = {
//   fullName: string;
//   phone: number;
//   id: number;
// };

export const AddRecipient = ({ closeModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  const [values, setValues] = useState();

  const { data, error, isLoading } = useSwrFetch(
    API_SERVICES_URLS.FREELANCER.RECIPIENT_ADD_WITH_CODE,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ ...values }),
    }
  );

  const onSubmit = (data) =>
    setValues({ idNumber: data.idNumber, mobile: data.mobile });
  console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="my-7">
        {/* fullname field */}
        <Input
          type="text"
          name="name"
          label="Recipients Full Name (Arabic)"
          inputSize="small"
          {...register("name", { required: "field is empty" })}
          error={!!errors.name}
          helperText={getFieldHelperText("error", errors.name?.message)}
          placeholder="الاسم ثلاثي بالعربي"
        />
        {/* phone number field */}
        <Input
          type="text"
          label="Recipients Phone Number"
          inputSize="small"
          placeholder="Enter phone number"
          {...register("mobile", { required: "field is empty" })}
          error={!!errors.mobile}
          helperText={getFieldHelperText("error", errors.mobile?.message)}
        />
        {/* ID Number field */}
        <Input
          type="text"
          label="Recipients ID Number (National ID or Passport)"
          inputSize={"small"}
          placeholder="Enter ID number"
          {...register("idNumber", { required: "field is empty" })}
          error={!!errors.idNumber}
          helperText={getFieldHelperText("error", errors.idNumber?.message)}
        />
      </div>
      <div>
        <Button fullWidth={true} type="submit" className="mb-5">
          {isLoading ? "Loading..." : "Confirm"}
        </Button>
        <p className="text-xs text-center text-red">{error && error}</p>
      </div>
    </form>
  );
};

export default AddRecipient;
