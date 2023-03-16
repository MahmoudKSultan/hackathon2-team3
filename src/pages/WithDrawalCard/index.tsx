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
  console.log(currentUser);
  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${currentUser?.accessToken}`,
      "Content-Type": "application/json",
    },
  });
  return res.data;
};
//bank 6410cb6387086b00f03d5f3f
//cash 640f5cb778fd73b40d217e37 /640f5ceb78fd73b40d217e72
//64121c5b7fb7075da8210629
const Withdrawal = () => {
  const withdrawId = "640f5cb778fd73b40d217e37";
  const { data, error, isLoading } = useSWR(
    `https://talents-valley-backend.herokuapp.com/api/withdraw/details/${withdrawId}`,
    WithdrawalFetcher
  );
  console.log(data?.data.withdraw.typeWithdraw);
  const typeWithdraw = data?.data.withdraw.typeWithdraw;
  let status = data?.data.withdraw.status;
  let colorClass;

  if (status === "pending") {
    colorClass = "bg-[#FFF9F0] text-[#DAA545]";
  } else if (status === "sent") {
    colorClass = "bg-[#F4F7FD] text-[#4375FF]";
  } else {
    colorClass = "bg-[#EFEFEF]";
  }

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
          <div>
            <span className={`rounded-lg px-2 pb-1 ${colorClass}`}>
              {status === "pending"
                ? "Pending"
                : status === "sent"
                ? "Sent"
                : "completed"}
            </span>
          </div>
        </div>
        <div className="border divide-[#707070] " />
        <div className="flex justify-between  ">
          {typeWithdraw === "bank" ? (
            <div>
              <p className="font-bold text-sm pt-2 ">
                {data?.data.withdraw.bank.bankName}
              </p>
              <p className="text-[#8C8C8C] text-sm pt-1 ">
                {data?.data.withdraw.bank.accountNumber}
              </p>
            </div>
          ) : (
            <div>
              <p className="font-bold text-sm pt-2 ">
                {data?.data.withdraw.office.name}
              </p>
            </div>
          )}

          {typeWithdraw === "bank" ? (
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
          {typeWithdraw === "bank" ? (
            <span className=" text-sm">
              {data?.data.withdraw.bank.accountName}
            </span>
          ) : (
            <span className=" text-sm">
              {data?.data.withdraw.recipient.name}
            </span>
          )}
        </div>

        <div className="flex justify-between pt-2">
          <p className="text-[#8C8C8C] text-sm ">Expected Date</p>
          <span className=" text-sm">Within 24 Hours (Avg: 2hrs)</span>
        </div>
      </Card>
      <Card className="mt-5 mx-4">
        <p className="font-bold text-sm">Instructions</p>
        {typeWithdraw === "bank" ? (
          <div className="pt-4">
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
          </div>
        ) : (
          <div className="pt-4">
            <li>
              <span className="text-[#000000] text-sm ">
                Address: {data?.data.withdraw.office.address}
              </span>
            </li>

            <li>
              <span className="text-[#000000] text-sm ">
                Working hours from 9:00 am to 7:00 pm{" "}
              </span>
            </li>
            <li>
              <span className="text-[#000000] text-sm ">
                Bring your ID for identification{" "}
              </span>
            </li>
            <li>
              <span className="text-[#000000] text-sm ">
                Confirm receiving your payment{" "}
              </span>
            </li>
            <li>
              <span className="text-[#000000] text-sm ">
                Office fees {data?.data.withdraw.office.fees}{" "}
              </span>
            </li>
          </div>
        )}
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
