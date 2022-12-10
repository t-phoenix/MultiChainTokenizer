import { useContractReads } from "wagmi";
import {
  BaseERC20FactoryABI,
  OtherERC20FactoryABI,
} from "../contractABI/FactoryABI";
import styles from "../styles/Home.module.css";


const BaseERC20FactoryGoerli = {
  address: "0x978e6e603d33380d3cD02AABcA0F44970b23BcBF",
  abi: BaseERC20FactoryABI,
};

export default function ListToken({props}) {
    const CardData = [{projectName: "Chimpakchu", contractAddress:"0xoi2jfi3jfiercecj0eircmeircmeicmeo0cm0e", initialSupply: 13000000, symbol: "CMP"},{projectName: "Makupichi", contractAddress:"0x9329dh92nd92n9j2nd9i2n3d9i2j39dj29", initialSupply: 21410000, symbol: "MPC"}] ;

    console.log("Contract DATA FETCHED: ", props);

  return (
    <>
      <p className={styles.description}>Base ERC20 Tokens</p>

      <div className={styles.grid}>
        {CardData.map((i, index) => {
          return (
            <a href="/token" className={styles.card} key={index}>
              <ul>Token: {i.projectName}</ul>
              <ul>contract: {i.contractAddress}</ul>
            </a>
          );
        })}
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const { data, isError, isFetched } = useContractReads({
    contracts: [
      {
        ...BaseERC20FactoryGoerli,
        functionName: "getAllBaseTokens",
      },
      {
        address: "0xBc87f2708A5D49A15Fec09439be26327FB93159C",
        abi: OtherERC20FactoryABI,
        functionName: "getAllOtherChainTokens",
      },
    ],
  });
  return { props: { data } };
}
