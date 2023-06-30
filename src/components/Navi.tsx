import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import detectEthereumProvider from '@metamask/detect-provider'

function Navi() {
  let [injectedProvider, setInjectedProvider] = useState<Boolean>(false)
  let [isMetaMask, setIsMetaMask] = useState<Boolean>(false)
  const [hasProvider, setHasProvider] = useState<boolean | null>(null)
  const initialState = { accounts: [] }               /* New */
  const [wallet, setWallet] = useState(initialState)  /* New */
  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      setInjectedProvider(true)
      setIsMetaMask(window.ethereum.isMetaMask)
    }
    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true })
      setHasProvider(Boolean(provider))
    }
    getProvider()
  }, []);

  const updateWallet = async (accounts: any) => {     /* New */
    setWallet({ accounts })                          /* New */
  }                                                  /* New */

  const handleConnect = async () => {                /* New */
    console.log(window)
    let accounts = await window.ethereum.request({   /* New */
      method: "eth_requestAccounts",                 /* New */
    })                                           /* New */
    updateWallet(accounts)                           /* New */
  }                                                  /* New */

  let [loginModelShow, setLoginModelShow] = useState<Boolean>(false)

  function handleLogin() {
    setLoginModelShow(true)
  }

  function cancelLogin() {
    setLoginModelShow(false)
  }

  function signWidthLens() {

  }

  return (
    <nav className="fixed z-100 top-[1.5rem] left-[0] right-[0] z-20 container mx-auto px-6 py-2 flex justify-between items-center bg-black proto rounded-lg">
      <div className="flex space-x-4 text-white">
        <Image
          src="/favicon.ico"
          alt="seed"
          width={40}
          height={40}
          className="flex items-center justify-center text-md"
        />
        <p className="flex items-center justify-center text-md px-4 py-2 ">TESTNET ALPHR WITH TESTING TOKEN.</p>
      </div>
      <div className="flex space-x-4">
        <a href="https://documents.pfp-dao.io/content-creators/seed-on-chaining-contents" className="flex items-center justify-center proto text-green text-md px-4 py-2">GAS METIC</a>
        <a href="https://documents.pfp-dao.io/content-creators/seed-on-chaining-contents" className="flex items-center justify-center proto text-green text-md px-4 py-2">GET USDC</a>
        <a href="https://documents.pfp-dao.io/content-creators/seed-on-chaining-contents" className="flex items-center justify-center proto text-green text-md px-4 py-2">DOCUMENTS</a>
        <button className="flex items-center justify-center text-pink text-md px-4 py-2" onClick={handleLogin}>LOGIN</button>
      </div>

      {/* login modal */}
      {loginModelShow &&
        <div className="fixed inset-0 z-10 overflow-y-auto" data-testid="login-modal" id="headlessui-dialog-:r3n:" role="dialog" aria-modal="true" data-headlessui-state="open">
          <div className="flex min-h-screen items-center justify-center p-4 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500/75 transition-opacity dark:bg-gray-900/80 opacity-100" id="headlessui-dialog-overlay-:r3o:" aria-hidden="true" data-headlessui-state="open"></div>
            <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true"></span>
            <div className="sm:max-w-lg inline-block w-full scale-100 rounded-xl bg-white text-left align-bottom shadow-xl transition-all dark:bg-gray-800 sm:my-8 sm:align-middle opacity-100 translate-y-0 sm:scale-100">
              <div className="divider flex items-center justify-between px-5 py-3.5"><div className="flex items-center space-x-2 font-bold">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true" className="text-brand h-5 w-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <div>Login</div>
              </div>
                <button type="button" className="rounded-full p-1 text-gray-800 hover:bg-gray-200 dark:text-gray-100 dark:hover:bg-gray-700" onClick={cancelLogin}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true" className="h-5 w-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              <div className="p-5">
                <div className="space-y-5">
                  <div className="space-y-1">
                    <div className="text-xl font-bold">Connect your wallet.</div>
                    <div className="lt-text-gray-500 text-sm">Connect with one of our available wallet providers or create a new one.</div>
                  </div>
                  <div className="space-y-3">
                    <div className="space-y-2.5">
                      <button className="bg-primary hover:bg-brand-600 border-brand-600 focus:ring-brand-400/50 border text-white px-3 py-1 inline-flex items-center space-x-1.5 rounded-lg font-bold shadow-sm outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50" onClick={signWidthLens}>
                        <div>Sign-In with Lens</div>
                      </button>
                    </div>
                  </div>
                  <h2>Injected Provider {injectedProvider ? 'DOES' : 'DOES NOT'} Exist</h2>
                  {isMetaMask &&
                    <button type="button" className="hover:bg-gray-100 dark:hover:bg-gray-700 flex w-full items-center justify-between space-x-2.5 overflow-hidden rounded-xl border px-4 py-3 outline-none dark:border-gray-700" onClick={handleConnect}>
                      <span>MetaMask</span>
                      <img src="https://static-assets.lenster.xyz/images/wallets/browser-wallet.svg" draggable="false" className="h-6 w-6" height="24" width="24" alt="injected" />
                    </button>
                  }
                  {wallet.accounts.length > 0 &&                /* New */
                    <div>Wallet Accounts: {wallet.accounts[0]}</div>
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      }

    </nav>
  );
}

export default Navi;