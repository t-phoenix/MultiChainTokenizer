import { useContractReads } from "wagmi";
import {
  BaseERC20FactoryABI,
  OtherERC20FactoryABI,
} from "../contractABI/FactoryABI";
import styles from "../styles/Home.module.css";
import Link from 'next/link'


export default function ListToken({props}) {
    const CardData = [{id:0, projectName: "Chimpakchu", contractAddress:"0xoi2jfi3jfiercecj0eircmeircmeicmeo0cm0e", initialSupply: 13000000, symbol: "CMP"},{id:1, projectName: "Makupichi", contractAddress:"0x9329dh92nd92n9j2nd9i2n3d9i2j39dj29", initialSupply: 21410000, symbol: "MPC"}] ;
    const { data, isError, isFetched } = useContractReads({
      contracts: [
        {
          address: "0x978e6e603d33380d3cD02AABcA0F44970b23BcBF",
          abi: BaseERC20FactoryABI,
          functionName: "getAllBaseTokens",
        },
        {
          address: "0xBc87f2708A5D49A15Fec09439be26327FB93159C",
          abi: OtherERC20FactoryABI,
          functionName: "getAllOtherChainTokens",
        },
      ],
    });
    {data && console.log("Contract DATA FETCHED: ", data[0][0], data[1])};
    console.log("Error:", isError, isFetched);

  return (
    <>

      <p className={styles.description}>Base ERC20 Tokens</p>

      <div className={styles.grid}>
        {data && data[0].map((i, index) => {
          return (
            <a href="/tokens/0" className={styles.card} key={index}>
              <ul>Token {String(i.id)}: {i.projectName}  </ul>
              <ul>Symbol: {i.symbol}</ul>
              <ul>contract: {i.contractAddress}</ul>
            </a>
          );
        })}
      </div>
      

      <p className={styles.description}>Other ERC20 Tokens</p>

      <div className={styles.grid}>
        {CardData.map((i, index) => {
          return (
            <Link href={`/tokens/${index}`} className={styles.card} key={index}>
              <ul>Token {String(i.id)}: {i.projectName}</ul>
              <ul>contract: {i.contractAddress}</ul>
            </Link>
          );
        })}
      </div>
    </>
  );
}

export async function getServerSideProps() {
  
  return { props: { data } };
}
