import { useAtom } from "jotai";
import Image from "next/image";
import Link from "next/link";
import { useState, useCallback, useEffect } from "react";
import { zeroAddress } from "viem";
import { useAccount, useBalance, useConnect, useDisconnect } from "wagmi";
import {
  allownaceAtom,
  hasLensHandleAtom,
  profileIdAtom,
  usdcBalanceAtom,
} from "~/config/atom";
import { env } from "~/env.mjs";
import useLensProxy from "~/hooks/useLensProxy";
import useUSDC from "~/hooks/useUSDC";

function Navi() {
  const { connectAsync, connectors } = useConnect();
  const { address } = useAccount();
  const { disconnectAsync } = useDisconnect();
  const [profileId, setProfileId] = useAtom(profileIdAtom);
  const [hasLensHandle, setHasLensHandle] = useAtom(hasLensHandleAtom);
  const [usdcBalance, setUsdcBalance] = useAtom(usdcBalanceAtom);
  const [allownace, setAllowance] = useAtom(allownaceAtom);

  const {
    createProfileWrite,
    profileResult,
    fetchProfileResult,
    fetchProfileID,
    fetchBalance: fetchNFTBalance,
    commentWrite,
  } = useLensProxy();
  const [inputHandle, setInputHandle] = useState("");

  useEffect(() => {
    if (address) {
      // 如果没有profileId, 去链上获取NFT余额，如果余额是0，setHasLensHandle为false，显示创建profile的组件
      // 如果NFT不是0，获取第一个lensNFT的ID，存到profileIdAtom中
      if (profileId == 0) {
        fetchNFTBalance()
          .then((res) => {
            if (res.isSuccess) {
              const balance = res.data as bigint;
              if (balance == 0n) {
                setHasLensHandle(false);
              } else {
                fetchProfileID()
                  .then((res) => {
                    if (res.isSuccess) {
                      const profileId = res.data as bigint;
                      setHasLensHandle(true);
                      setProfileId(Number(profileId));
                    } else {
                      console.warn(res.error);
                    }
                  })
                  .catch((err) => {
                    console.error("fetchProfileID:", err);
                  });
              }
            }
          })
          .catch((err) => {
            console.error("fetchNFTBalance:", err);
          });
      }

      fetchBalance()
        .then((res) => {
          if (res.isSuccess) {
            const balance = res.data as bigint;
            setUsdcBalance(balance);
          }
        })
        .catch((err) => {
          console.error("fetchUSDCBalance:", err);
        });

      fetchAllownace()
        .then((res) => {
          if (res.isSuccess) {
            const allownace = res.data as bigint;
            setAllowance(allownace);
          }
        })
        .catch((err) => {
          console.error("fetchAllownace:", err);
        });
    }
  }, [address]);
  const handleConnectButton = useCallback(() => {
    if (address) {
      disconnectAsync()
        .then(() => {
          console.log("disconnect");
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      connectAsync({
        chainId: env.NEXT_PUBLIC_CHAIN_ID,
        connector: connectors[0],
      })
        .then(() => {
          console.log("connect");
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [disconnectAsync, connectAsync, address, connectors]);

  const {
    claimWrite,
    claimError,
    fetchBalance,
    fetchAllownace,
    approveWrite,
    approveError,
  } = useUSDC();

  const handleClaimUSDC = useCallback(() => {
    if (address) {
      claimWrite();
    }
  }, [address, claimWrite]);

  const handleCreateProfile = useCallback(() => {
    if (address) {
      createProfileWrite({
        args: [
          {
            to: address,
            handle: inputHandle,
            imageURI: "",
            followModule: zeroAddress,
          },
        ],
      });
    }
  }, [address, createProfileWrite, inputHandle]);

  const handleCheckProfile = useCallback(() => {
    fetchProfileResult()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleApprove = useCallback(() => {
    if (address) {
      approveWrite();
    }
  }, [address, approveWrite]);

  const [loginModelShow, setLoginModelShow] = useState<boolean>(false);

  // function handleLogin() {
  //   setLoginModelShow(true);
  // }

  function cancelLogin() {
    setLoginModelShow(false);
  }

  // function signWidthLens() {}

  return (
    <nav className="proto container fixed left-[0] right-[0] top-[1.5rem] z-100 z-20 mx-auto flex items-center justify-between rounded-lg bg-black px-6 py-2">
      <div className="flex space-x-4 text-white">
        <Image
          src="/favicon.ico"
          alt="seed"
          width={40}
          height={40}
          className="text-md flex items-center justify-center"
        />
        <p className="text-md flex items-center justify-center px-4 py-2 font-second">
          TEST ALPAH WITH TESTING TOKEN.
        </p>
      </div>
      <div className="flex space-x-4 font-second">
        {address && (
          <a
            href="https://mumbaifaucet.com/"
            className="proto text-md flex items-center justify-center px-4 py-2 text-green"
            target="_blank"
          >
            GET TEST MATIC
          </a>
        )}

        {address && allownace == 0n && (
          <button
            className="proto text-md flex items-center justify-center px-4 py-2 text-green"
            onClick={handleClaimUSDC}
          >
            GET USDC
          </button>
        )}

        {address && allownace == 0n && (
          <button
            className="proto text-md flex items-center justify-center px-4 py-2 uppercase text-green"
            onClick={handleApprove}
          >
            approve
          </button>
        )}

        <Link target="_blank" href="https://documents.pfp-dao.io/content-creators/seed-on-chaining-contents" className="proto text-md flex items-center justify-center px-4 py-2 text-green">DOCUMENT</Link>

        <button
          className="text-md flex items-center justify-center px-4 py-2 uppercase text-pink"
          onClick={handleConnectButton}
        >
          {address ? "LogOut" : "LogIn"}
        </button>
      </div>
    </nav>
  );
}

export default Navi;
