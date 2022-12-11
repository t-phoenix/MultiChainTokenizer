import { useRouter } from "next/router";
import { BaseERCTokenABI, OtherERCTokenABI } from "../../contractABI/TokenABI";
import {
  BaseERC20FactoryABI,
  OtherERC20FactoryABI,
} from "../../contractABI/FactoryABI";
import { useContractReads } from "wagmi";
import { fetchBalance } from "@wagmi/core";

export default function Token() {
  const router = useRouter();
  const { tid } = router.query;

  const { data } = useContractReads({
    contracts: [
      {
        address: "0x978e6e603d33380d3cD02AABcA0F44970b23BcBF",
        abi: BaseERC20FactoryABI,
        functionName: "getBaseTokenById",
        args: [tid],
      },
    ],
  });

  async function fetchBalance(event) {
    console.log("Input:", event.target.first.value)
  }



  console.log("Particular Token Read:", data);

  if(data){
  return (
    <div>
      <ul>
        Token {String(data[0].id)}: {data[0].projectName}
      </ul>
      <ul>Symbol: {data[0].symbol}</ul>
      <ul>Contract Address: {data[0].contractAddress}</ul>
      <ul>InitialSupply: {String(data[0].initialSupply)}</ul>
      <ul></ul>

      <form onSubmit={fetchBalance} style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', margin: '4%'}}>
        <label >Balance:</label>
        <input type="text" name="address" id="first"/>
        <button type="submit">Check Balance</button>
      </form>

    </div>
  );}else{
    <>Data is not fetched</>
  }
}
