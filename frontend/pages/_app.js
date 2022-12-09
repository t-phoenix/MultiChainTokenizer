import "../styles/globals.css";
import Layout from "../components/layout";

import {
  EthereumClient,
  modalConnectors,
  walletConnectProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet, goerli} from 'wagmi/chains'

// const chains = [ chain.polygon, chain.optimism, chain.arbitrum];

// Wagmi client
const { chains, provider } = configureChains([mainnet, goerli],[
  walletConnectProvider({ projectId: "0ec4a219df81a3fc7c09f6ea9dadfd24" }),
]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({ appName: "web3Modal", chains }),
  provider,
});

// Web3Modal Ethereum Client
const ethereumClient = new EthereumClient(wagmiClient, chains);

function MyApp({ Component, pageProps }) {
  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </WagmiConfig>

      <Web3Modal
        projectId="0ec4a219df81a3fc7c09f6ea9dadfd24"
        ethereumClient={ethereumClient}
      />
    </>
  );
}

export default MyApp;
