import { Web3Button } from "@web3modal/react";
import { useAccount, useNetwork} from 'wagmi';



export default function Navbar({}) {
    const { address} = useAccount();
    const { chain } = useNetwork()
    console.log("Connected Chain:", chain)
  return (
    <div
      style={{
        margin: 16,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
    
    <h1>MultiChain Tokenizer </h1>
    <div style={{display: "flex", flexDirection: "row", alignItems: "center",}}>
        {address && <ul style={{margin: 12}}>Network: {chain.name}</ul>}
        <Web3Button />
    </div>
    
    </div>
  );
}
