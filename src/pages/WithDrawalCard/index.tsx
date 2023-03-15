import { Button } from "components";
import { ChevronLeftIconMini, Point } from "lib/@heroicons";
import { Card } from "components";
import { Image } from "components";
import React from "react";
import { useSWR, type Fetcher } from "lib/swr";
import { getCookie } from "lib/js-cookie";
import { COOKIES_KEYS } from "data";
import axios from "axios";
import VerticalTimeline from "features/payout/withdraw/components/VerticalTimeline";

const WithdrawalFetcher = async (url: string) => {
  const currentUser = getCookie(COOKIES_KEYS.currentUser);
  console.log(currentUser)
  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${currentUser?.accessToken}`,
      "Content-Type": "application/json",
    },
  });
  return res.data;
};

const Withdrawal = () => {
  const withdrawId = "64121e087fb7075da8210797";
  const type = "bank";
  const { data, error, isLoading } = useSWR(
    `https://talents-valley-backend.herokuapp.com/api/withdraw/details/${withdrawId}`,
    WithdrawalFetcher
  );
  console.log(data?.data.withdraw.amount);
  return (
    <div className="bg-[#F2F4F7] w-[30%] shadow-md h-full top-12 fixed  ">
      <div className="relative p-8 ">
        <ChevronLeftIconMini className="h-7 absolute" />
        <p className="text-base font-medium tracking-wide text-center">
          Withdrawal
        </p>
      </div>
      <Card className="mx-4">
        <div className="flex justify-between  ">
          <p className="font-bold text-lg pb-2">
            ${data?.data.withdraw.amount}
          </p>
          <span className="bg-[#FFF9F0] text-[#DAA545] rounded-md px-2 ">
            {data?.data.withdraw.status}
          </span>
        </div>
        <div className="border divide-[#707070] " />
        <div className="flex justify-between  ">
          <div>
            <p className="font-bold text-sm pt-2 ">
              {data?.data.withdraw.bank.bankName}
            </p>
            <p className="text-[#8C8C8C] text-sm pt-1 ">
              {data?.data.withdraw.bank.accountNumber}{" "}
            </p>
          </div>
          {type === "bank" ? (
            <div className="pt-2 pr-5">
              <Image
                src="/assets/img/bank.png"
                alt="Our Services"
                width={30}
                height={20}
              />
            </div>
          ) : (
            <Image
              src="/assets/img/Cash.svg"
              alt="Our Services"
              width={30}
              height={20}
            />
          )}
        </div>
      </Card>

      <Card className="mx-4 mt-5">
        <div>
          <p className="font-bold text-sm ">Timeline</p>
          <VerticalTimeline />
        </div>
      </Card>

      <Card className="mt-5 mx-4">
        <p className="font-bold text-sm ">Details</p>
        <div className="flex justify-between">
          <p className="text-[#8C8C8C] text-sm ">Bank Account Name</p>
          <span className=" text-sm">
            {" "}
            {data?.data.withdraw.bank.accountName}
          </span>
        </div>

        <div className="flex justify-between pt-2">
          <p className="text-[#8C8C8C] text-sm ">Expected Date</p>
          <span className=" text-sm"> Bank Account Name</span>
        </div>
      </Card>
      <Card className="mt-5 mx-4">
        <p className="font-bold text-sm ">Instructions</p>
        <li>
          <span className="text-[#000000] text-sm ">
            Open your bank account app to ensure payment delivery
          </span>
        </li>

        <li>
          <span className="text-[#000000] text-sm ">
            Avoid opening support ticket before expected date{" "}
          </span>
        </li>
        <li>
          <span className="text-[#000000] text-sm ">
            Confirm receiving your payment{" "}
          </span>
        </li>
      </Card>
      <div className="p-4">
        <Button
          className="mt-5 py-4 !bg-[#FFFFFF] !text-black shadow-md"
          type="submit"
          buttonSize="small"
          fullWidth
        >
          Cancel Withdrawal{" "}
        </Button>
      </div>
    </div>
  );
};
Withdrawal.mainLayoutProps = {
  contentClassName: "!justify-end !p-0  ",
};

export default Withdrawal;
