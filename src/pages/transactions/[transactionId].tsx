import { useRouter } from "next/router";

const TransactionDetails = ()=>{
 const router = useRouter ()
 const transactionId = router.query.transactionId
 return <h1>hwllo {transactionId}</h1>
}
export default TransactionDetails