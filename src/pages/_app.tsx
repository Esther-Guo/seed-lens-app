import { type AppType } from "next/dist/shared/lib/utils";
import "~/styles/globals.css";
import 'react-quill/dist/quill.snow.css';
import "~/styles/editor.scss";
import { Provider } from "jotai";

import { WagmiConfig, createConfig, configureChains } from "wagmi";

import { polygon, polygonMumbai } from "wagmi/chains";

import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";

import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { env } from "~/env.mjs";

import useZoom from "~/hooks/useZoom";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [polygonMumbai, polygon],
  [
    publicProvider(),
    alchemyProvider({
      apiKey: env.NEXT_PUBLIC_ALCHEMY_RPC,
    }),
  ]
);

const config = createConfig({
  autoConnect: false,
  connectors: [
    new MetaMaskConnector({ chains }),
    // new WalletConnectConnector({
    //   chains: [polygonMumbai, polygon],
    //   options: {
    //     projectId: env.NEXT_PUBLIC_WALLETCONNECT,
    //   },
    // }),
    // new ParticleAuthConnector({
    //   chains,
    //   options: {
    //     projectId: env.NEXT_PUBLIC_PROJECT_ID,
    //     clientKey: env.NEXT_PUBLIC_CLIENT_KEY,
    //     appId: env.NEXT_PUBLIC_APP_ID,
    //     chainId: env.NEXT_PUBLIC_CHAIN_ID,
    //     wallet: {
    //       //optional: by default, the wallet entry is displayed in the bottom right corner of the webpage.
    //       displayWalletEntry: true, //show wallet entry when connect particle.
    //       defaultWalletEntryPosition: WalletEntryPosition.BR, //wallet entry position
    //       supportChains: [
    //         { id: env.NEXT_PUBLIC_CHAIN_ID, name: env.NEXT_PUBLIC_CHAIN_NAME },
    //       ], // optional: web wallet support chains.
    //       customStyle: {
    //         priorityNFTContractAddresses: [roleAddr, equipmentAddr],
    //       }, //optional: custom wallet style
    //     },
    //   },
    // }),
    // new InjectedConnector({
    //   chains,
    //   options: {
    //     name: "Injected",
    //     shimDisconnect: false,
    //   },
    // }),
  ],
  publicClient,
  webSocketPublicClient,
});

const MyApp: AppType = ({ Component, pageProps }) => {
  const { zoom } = useZoom();
  return (
    <Provider>
      <WagmiConfig config={config}>
        <Component {...pageProps} style={{ zoom: zoom }}/>
      </WagmiConfig>
    </Provider>
  )
};

export default MyApp;
