import { Card, Input } from "components";
import RadioButton from "components/RadioButton";
import { BankIcon } from "lib/@heroicons";
import { useState } from "react";
import Bank from "../Bank";
import Cash from "../Cash";
// import MyRadioGroup from "components/RadioButton";
import { RadioGroup } from "@headlessui/react";

export const WithdrawWrapper = () => {
  const [selected, setSelected] = useState("Cash");
  const [amount, setAmount] = useState();
  const handlePaymentChange = (value) => {
    setSelected(() => value);
  };
  const handleSetAmount = (value) => {
    setAmount(() => value);
  };

  //   const handleSetAmount = (value: any) => {
  //     console.log("test ", VALIDATION_RULES.isNumber.test(value), value);
  //     if (VALIDATION_RULES.isNumber.test(value.slice(1))) {
  //       setAmount((prevAmount) =>
  //         prevAmount?.indexOf("$") === -1 ? `$${value}` : value
  //       );
  //     }
  //   };

  return (
    <>
      <Card className="mt-7 ml-5 pb-10">
        <h3 className="font-bold text-sm border-b-2 pb-2">
          Choose Payment Method
        </h3>

        <div>
          {/* <MyRadioGroup /> */}
          <RadioGroup className="max-w-[450px] flex justify-center items-center gap-5 my-8 mx-auto">
            <RadioButton
              selected={selected}
              handleChange={() => handlePaymentChange("Cash")}
              label="Cash"
              className="flex-1 sm:flex-[0.5]"
            >
              <BankIcon className="w-8" />
            </RadioButton>
            <RadioButton
              selected={selected}
              handleChange={() => handlePaymentChange("Bank")}
              label="Bank"
              className="flex-1 sm:flex-[0.5]"
            >
              <BankIcon className="w-8" />
            </RadioButton>
          </RadioGroup>

          {/* Amount */}
          <div className="flex justify-center">
            <div className=" w-44">
              <div className="flex justify-between items-end text-xs leading-5 mb-1">
                <p className="text-base font-semibold">Amount</p>
                <div>
                  <span className="font-semibold text-[#9E9E9E]">
                    Available
                  </span>{" "}
                  <span
                    className="cursor-pointer font-bold text-blue-light"
                    onClick={() =>
                      handleSetAmount("240.19".slice(0, "240.19".indexOf(".")))
                    }
                  >
                    $240.19
                  </span>
                </div>
              </div>
              {/* <Input name="amount" type="number" min={0} /> */}
              <Input
                id="amount-input"
                inputSize="small"
                inputClassName="pl-7 py-3 text-center text-2xl font-bold text-black bg-[#FDFDFD]"
                type="number"
                min={0}
                max={250.19}
                value={amount}
                onChange={(e) => handleSetAmount(e.target.value)}
                startIcon="$"
                pattern="/[0-9]+"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center"></div>
        {selected === "Cash" ? <Cash /> : <Bank />}
      </Card>
    </>
  );
};
export default WithdrawWrapper;
