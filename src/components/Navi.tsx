import Link from "next/link";
import Image from "next/image";
import { WagmiConfig, createConfig, configureChains, mainnet, useAccount, useEnsName, useConnect, useBalance } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { MetaMaskConnector } from "wagmi/connectors/metaMask"
import { InjectedConnector } from 'wagmi/connectors/injected'
import { color } from "framer-motion";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [publicProvider()],
)
const config = createConfig({
  autoConnect: true,
  connectors: [new MetaMaskConnector({ chains })],
  publicClient,
  webSocketPublicClient,
})

function Profile() {
  const { address, isConnected } = useAccount()
  const { data: ensName } = useEnsName({ address })
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
 console.log(useBalance({ address }).data)
  if (isConnected) return <div style={{color:'#fff'}} className="space-x-2">Connected to {ensName ?? address}</div>
  return <button style={{color:'#fff'}} className="space-x-2" onClick={() => connect()}>Connect Wallet</button>
}

function Navi() {
  return (
    <WagmiConfig config={config}>
      <nav className="fixed top-[1.5rem] left-[0] right-[0] z-20 container mx-auto px-6 py-2 flex justify-between items-center bg-black proto rounded-lg">
        <div className="flex space-x-4 text-white">
          <Image
            src="/public/favicon.ico"
            alt="seed"
            width={40}
            height={40}
            className="flex items-center justify-center text-md px-4 py-2"
          />
          <p className="flex items-center justify-center text-md px-4 py-2 ">TESTNET ALPHR WITH TESTING TOKEN.</p>
        </div>
        <div className="flex space-x-4">
          <a href="https://documents.pfp-dao.io/content-creators/seed-on-chaining-contents" className="flex items-center justify-center proto text-green text-md px-4 py-2">GAS METIC</a>
          <a href="https://documents.pfp-dao.io/content-creators/seed-on-chaining-contents" className="flex items-center justify-center proto text-green text-md px-4 py-2">GET USDC</a>
          <a href="https://documents.pfp-dao.io/content-creators/seed-on-chaining-contents" className="flex items-center justify-center proto text-green text-md px-4 py-2">DOCUMENTS</a>
          <a href="#" className="flex items-center justify-center text-pink text-md px-4 py-2">LOGIN</a>
        </div>
        {Profile()}
      </nav>
    </WagmiConfig>
  );
}

export default Navi;