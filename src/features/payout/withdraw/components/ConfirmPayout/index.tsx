import { Image, Button, OtpInput } from "components";
import { useState } from "react";

export const ConfirmPayout = () => {
  const [otpCode, setOtpCode] = useState("");
  const otpChangeHandler = (value: string) => setOtpCode(value);

  return (
    <div className="flex flex-col gap-8 items-center">
      <Image
        src="/assets/img/smartphone.svg"
        width={50}
        height={75}
        alt="confirm"
      />
      <p>
        We have sent you a verification code to your phone number ********789
      </p>
      <form>
        <OtpInput onOtpChange={otpChangeHandler} />
        <p>02:00</p>
        <p>
          Didn't get the code?
          <span className="text-blue-light cursor-pointer">Resend</span>
        </p>
        <Button
          type="submit"
          buttonSize="small"
          fullWidth
          // className="text-2xl bg-blue-light "
        >
          Continue
        </Button>
      </form>
    </div>
  );
};
export default ConfirmPayout;
