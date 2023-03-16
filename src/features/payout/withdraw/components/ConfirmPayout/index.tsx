import { Image, Button, OtpInput, HelperText } from "components";
import { useState } from "react";
import { useForm } from "react-hook-form";

export const ConfirmPayout = ({
  sendCode: { trigger, isMutating },
  data,
  closeModal,
  handleRecipientAdd,
}) => {
  const [otpCode, setOtpCode] = useState("");
  const otpChangeHandler = (value: string) => setOtpCode(value);
  const [error, setError] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    verify();
  };
  const verify = async () => {
    const newResponse = await trigger({ ...data, code: otpCode });
    if (newResponse.status == "failed") {
      setError(newResponse.message);
      return;
    }
    handleRecipientAdd({ ...data, _id: newResponse.data._id });
    closeModal();
  };

  return (
    <div className="flex flex-col gap-8 items-center">
      <Image
        src="/assets/img/smartphone.svg"
        width={40}
        height={50}
        alt="confirm"
      />
      <p className="w-[280px]">
        We have sent you a verification code to your phone number ********789
      </p>
      <form onSubmit={onSubmit}>
        <OtpInput onOtpChange={otpChangeHandler} />
        <p className="text-center my-5">02:00</p>
        <p className="text-center mb-8">
          Didn't get the code?
          <span className="text-blue-light cursor-pointer" onClick={verify}>
            {" "}
            Resend
          </span>
        </p>
        <Button
          type="submit"
          buttonSize="small"
          fullWidth
          // className="text-2xl bg-blue-light "
        >
          {isMutating ? "Loading..." : "Continue"}
        </Button>
        {error && (
          <HelperText
            className="text-red w-full text-xs justify-center min-h-[20px] mb-8"
            text={error}
          />
        )}
      </form>
    </div>
  );
};
export default ConfirmPayout;
