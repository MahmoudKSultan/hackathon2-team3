import React, { useState } from "react";
import { useSWR } from "lib/swr";
import { getCookie } from "lib/js-cookie";
import { COOKIES_KEYS } from "data";
import axios from "lib/axios";
import { Button, IconButton, Input } from "components";
import { ArrowDoewnIcon, ArrowLeft, ArrowRight, ChevronIcon, SearchIcon } from "lib/@heroicons";
import SelectCheckBox from "../SelectCheckBox";



const BalanceTransactionsFetcher = async (url: string) => {
  const currentUser = getCookie(COOKIES_KEYS.currentUser);
  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${currentUser?.accessToken}`,
      "Content-Type": "application/json",
    },

  })
  console.log(res.data.data);
  return res.data.data;
};

const Transaction= ({ columns  }) => {

  const[search,setSearch] =useState("")
  const [selectedOption, setSelectedOption] = useState("pending");
  const { data, error, isLoading } = useSWR(
    `https://talents-valley-backend.herokuapp.com/api/withdraw/list?offset=0&limit=10&sort=-amount&filter=${selectedOption}&search=${search}`,
    BalanceTransactionsFetcher
  );
  
 
  return (
    <>
      <p className="my-2 font-[600] text-[#8C8C8C] text-lg">Transactions</p>
      <div className="flex flex-row justify-between align-center -mb-4">
        <Input  className="w-[50%]" placeholder="Search"  endIcon={<SearchIcon className="w-5 h-5" />}  value={search} onChange={(e)=>setSearch(e.target.value)}/>
        <div className="flex justify-between  "> 
        <Button className="flex flex-row h-12 mr-10 bg-white text-[#4375FF] hover:bg-slate-50">
          <ArrowDoewnIcon className="h-5 w-5 mr-1 " />
          <span>Withdraw</span>
        </Button>
        <SelectCheckBox selectedOption={selectedOption} setSelectedOption={setSelectedOption}/>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md py-2 ">
        <table className="w-full ">
          <thead>
            <tr className="text-[#9E9E9E] text-left text-base" >
              <td className="pl-8 pb-2" onClick={() => handleSort('name')} >
                Name
                {sortOrder ==='name'&&
                <IconButton className="hover:bg-white ">
                  <ChevronIcon className="mt-1 text-[#9E9E9E]"  />
                </IconButton>
}
                <span className="pl-8 hover:bg-white ">
                  Data
                  <IconButton>
                    <ChevronIcon className="mt-1 text-[#9E9E9E]"/>
                  </IconButton>
                </span>
              </td>
              {columns.map((column) => (
                <td key={column.id} className={column.className} >
                  {column.header}
                  <IconButton className="hover:bg-white ">
                    <ChevronIcon  className="mt-1 text-[#9E9E9E]"/>
                  </IconButton>
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            {data &&
              data?.withdraws?.map((row) => (
                <tr key={row._id} className="border-y text-base h-[75px]" >
                  {
                    <>
                      <td className="pl-8 text-[#707070] font-[600]">
                        {row.typeWithdraw === "cash" ? (
                          <td>{row.office.name}</td>
                        ) : (
                          <td>{row.bank.bankName}</td>
                        )}
                        <p className="text-[#BEC2C6] text-sm font-normal">{row.createdAt}</p>
                      </td>
                      <td className="text-[#151617] font-[600]">${row.amount.toString()}</td>
                      <td className="text-[#707070]">
                        {row.typeWithdraw === "cash" ? (
                          <td>{row.recipient.name}</td>
                        ) : (
                          <td>{row.bank.accountName}</td>
                        )}
                      </td>
                      <td className="font-[600]">
                        {row.status}
                        <p className="text-[#BEC2C6] text-sm font-normal">
                          {row.status === "pending"
                            ? "Expected within 24 hours"
                            : null}
                        </p>
                      </td>
                    </>
                  }
                </tr>
              ))}
              <tr >
                <td className=" text-[#9E9E9E] flex  content-center">
              <IconButton><ArrowLeft className="text-[#9E9E9E]"/></IconButton>
              <span className="pt-1">Page 1 - 10</span>
              <IconButton><ArrowRight className="text-[#9E9E9E]"/></IconButton>
              </td>
              </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Transaction;

{
  /* {data &&
            data?.data?.withdraws.map((row) => (
              <tr key={row._id}>
                {columns.map((col) => (
                  <td key={col}>{row[col.field]}</td>
                ))}
              </tr>
            ))} */
}

