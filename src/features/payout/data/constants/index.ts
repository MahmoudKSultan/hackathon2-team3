import { Select } from 'components';
export const columns = [
  // { id: "name", header: "Name", className:"pr-40" },
  // { id: "data", header: "Data" ,className:"" },
  { id: "amount", header: "Amount" ,className:"pr-5 pb-2"},
  { id: "nameClient", header: "Name",className:" pb-2" },
  { id: "status", header: "Status",className:"pb-2" },
];

export const options = [
  {id:"all" , select:"All"},
  {id:"pending" , select: "Pending"} 
  ,{id:"ready" ,select:"Ready"}
  ,{id:"sent" ,select:"Sent"}
  ,{id:"completed" ,select:"Completed"}
  ,{id:"canceled" ,select:"Canceled"}

];
