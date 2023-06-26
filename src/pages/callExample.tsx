import { useAtom, useAtomValue } from "jotai";
import React, { useEffect } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import {
  allownaceAtom,
  profileIdAtom,
  rewardAtom,
  rewardProps,
  usdcBalanceAtom,
} from "~/config/atom";
import { env } from "~/env.mjs";
import useSeedModule from "~/hooks/useSeedModule";
import useUSDC from "~/hooks/useUSDC";

const callExample = () => {
  const { address } = useAccount();
  const { connectAsync, connectors } = useConnect();
  const { disconnectAsync } = useDisconnect();

  const {
    claimWrite,
    claimError,
    fetchBalance,
    fetchAllownace,
    approveWrite,
    approveError,
  } = useUSDC();

  const { fetchRewardAmount, claimWrite: claimRewardWrite } = useSeedModule();

  const [usdcBalance, setUsdcBalance] = useAtom(usdcBalanceAtom);
  const [allownace, setAllowance] = useAtom(allownaceAtom);
  const [reward, setReward] = useAtom(rewardAtom);
  const profileId = useAtomValue(profileIdAtom);

  function handleConnectButton() {
    if (address) {
      disconnectAsync();
    } else {
      connectAsync({
        chainId: env.NEXT_PUBLIC_CHAIN_ID,
        connector: connectors[0],
      });
    }
  }

  function handleClaimUSDC() {
    if (address) {
      claimWrite();
    }
  }

  function handleApprove() {
    if (address) {
      approveWrite();
    }
  }

  function handleClaimReward() {
    if (address) {
      claimRewardWrite();
    }
  }

  useEffect(() => {
    if (address) {
      fetchBalance().then((res) => {
        if (res.isSuccess) {
          const balance = res.data as bigint;
          setUsdcBalance(balance);
        }
      });

      fetchAllownace().then((res) => {
        if (res.isSuccess) {
          const allownace = res.data as bigint;
          setAllowance(allownace);
        }
      });

      fetchRewardAmount().then((res) => {
        if (res.isSuccess) {
          const rewardAmount = res.data as rewardProps;
          setReward(rewardAmount);
        }
      });
    }
  }, [address]);

  return (
    <div>
      <h1>Call Contract Examples</h1>
      {/* connect */}
      <button
        className="border-2 border-solid border-black"
        onClick={handleConnectButton}
      >
        {address ? "LogOut" : "LogIn"}
      </button>
      <div>{address ?? "not connect"}</div>

      {/* lens proxy (need lens sdk here to fetch) */}
      <div>
        profileID:
        {address ? profileId : "connect to check"}
      </div>

      {/* call usdc */}
      {address && usdcBalance == 0n && (
        <button
          className="border-2 border-solid border-black"
          onClick={handleClaimUSDC}
        >
          Claim 100U
          {claimError && <div>{claimError.message}</div>}
        </button>
      )}

      <div>
        usdc balance:{" "}
        {address ? (usdcBalance / BigInt(1e6)).toString() : "connect to check"}
      </div>

      {address && allownace == 0n && (
        <button
          className="border-2 border-solid border-black"
          onClick={handleApprove}
        >
          approve
          {approveError && <div>{approveError.message}</div>}
        </button>
      )}
      <div>
        approve to seed amount:{" "}
        {address ? (allownace / BigInt(1e6)).toString() : "connect to check"}
      </div>

      {/* call seed module */}
      <div>sun: {address ? reward.sun.toString() : "connect to check"} </div>
      <div>rain: {address ? reward.rain.toString() : "connect to check"} </div>
      <div>soil: {address ? reward.soil.toString() : "connect to check"} </div>

      {address && (
        <button
          className="border-2 border-solid border-black disabled:cursor-not-allowed disabled:border-gray-200 disabled:text-gray-200"
          onClick={handleClaimReward}
          disabled={reward.rain == 0n && reward.soil == 0n && reward.sun == 0n}
        >
          Claim Reward
        </button>
      )}
    </div>
  );
};

export default callExample;
