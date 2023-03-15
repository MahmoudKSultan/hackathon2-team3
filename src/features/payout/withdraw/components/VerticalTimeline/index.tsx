import React, { useState } from "react";
import { useSWR, type Fetcher } from "lib/swr";
import { getCookie } from "lib/js-cookie";
import { COOKIES_KEYS } from "data";
import axios from "axios";

const VerticalTimelineFetcher = async (url: string) => {
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
const VerticalTimeline = () => {
  const withdrawId = "6410cc5087086b00f03d5ff6";
  const { data, error, isLoading } = useSWR(
    `https://talents-valley-backend.herokuapp.com/api/withdraw/details/${withdrawId}`,
    VerticalTimelineFetcher
  );
  const timelineData = data?.data.withdraw.history;

  return (
    <ol className="text-gray-500 border-gray-200 dark:border-gray-700 dark:text-gray-400">
      {timelineData &&
        timelineData.map((item) => (
          <li key={item._id} className="mb-2 ml-4 grid grid-cols-3 divide-x relative">
              <div className="text-sm">{item.createdAt}</div>
              <span className="absolute w-3 h-3 bg-blue-200 rounded-full left-28 dark:ring-gray-900 dark:bg-blue-900"></span>
              <div className="font-medium ">{item.status}</div>
          </li>
        ))}
    </ol>
  );
};

export default VerticalTimeline;
