import { useAtom, useAtomValue } from "jotai";
import { type NextPage } from "next";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { encodePacked, toBytes, toHex, zeroAddress } from "viem";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import {
  allownaceAtom,
  profileIdAtom,
  rewardAtom,
  type rewardProps,
  usdcBalanceAtom,
  newMetadataURLAtom,
  pubIdPointedAtom,
  hasLensHandleAtom,
  profileIdToCheckAtom,
  profileIdPointedAtom,
  lastCreateCommentEventDataAtom,
} from "~/config/atom";
import { revertCollectModule, seedModuleAddress } from "~/config/viem";
import { env } from "~/env.mjs";
import useLensProxy from "~/hooks/useLensProxy";
import useSeedModule from "~/hooks/useSeedModule";
import useUSDC from "~/hooks/useUSDC";

interface profileResult {
  handle: string;
  imageURI: string;
}

const CallExample: NextPage = () => {
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

  const {
    createProfileWrite,
    profileResult,
    fetchProfileResult,
    fetchProfileID,
    fetchBalance: fetchNFTBalance,
    commentWrite,
  } = useLensProxy();

  const [usdcBalance, setUsdcBalance] = useAtom(usdcBalanceAtom);
  const [allownace, setAllowance] = useAtom(allownaceAtom);
  const [reward, setReward] = useAtom(rewardAtom);
  const [hasLensHandle, setHasLensHandle] = useAtom(hasLensHandleAtom);
  const [profileId, setProfileId] = useAtom(profileIdAtom);

  const newMetadataURL = useAtomValue(newMetadataURLAtom);
  const profileIdPointed = useAtomValue(profileIdPointedAtom);
  const pubIdPointed = useAtomValue(pubIdPointedAtom);

  const [inputHandle, setInputHandle] = useState("");
  const [profileIdToCheck, setProfileIdToCheck] = useAtom(profileIdToCheckAtom);
  const lastCreateCommentEventData = useAtomValue(
    lastCreateCommentEventDataAtom
  );

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
  }, [disconnectAsync, connectAsync]);

  const handleClaimUSDC = useCallback(() => {
    if (address) {
      claimWrite();
    }
  }, [address, claimWrite]);

  const handleApprove = useCallback(() => {
    if (address) {
      approveWrite();
    }
  }, [address, approveWrite]);

  const handleClaimReward = useCallback(() => {
    if (address) {
      claimRewardWrite();
    }
  }, [address, claimRewardWrite]);

  const handleComment = useCallback(() => {
    if (address) {
      const args = {
        profileId: profileId,
        contentURI: newMetadataURL,
        profileIdPointed: profileIdPointed,
        pubIdPointed: pubIdPointed,
        referenceModuleData: toBytes("0x"),
        collectModule: revertCollectModule,
        collectModuleInitData: encodePacked(["bool"], [true]),
        referenceModule: seedModuleAddress,
        referenceModuleInitData: encodePacked([], []),
      };
      console.log("args", args);

      commentWrite({
        args: [args],
      });
    }
  }, [
    address,
    commentWrite,
    newMetadataURL,
    profileId,
    profileIdPointed,
    pubIdPointed,
  ]);

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

      fetchRewardAmount()
        .then((res) => {
          if (res.isSuccess) {
            const rewardAmount = res.data as rewardProps;
            setReward(rewardAmount);
          }
        })
        .catch((err) => {
          console.error("fetchRewardAmount:", err);
        });
    }
  }, [address]);

  const handleInputRef = useRef<HTMLInputElement>(null);

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

      {/* create Profile */}
      {address && !hasLensHandle && (
        <div>
          <div>input handle</div>
          <input
            className="border-2 border-solid border-black"
            onChange={(e) => {
              setInputHandle(e.target.value);
            }}
            ref={handleInputRef}
          ></input>
          <button
            className="border-2 border-solid border-black disabled:cursor-not-allowed disabled:border-gray-200 disabled:text-gray-200"
            onClick={handleCreateProfile}
            disabled={inputHandle.length == 0}
          >
            Create Profile
          </button>
        </div>
      )}
      <br />

      {/* Get Profile */}
      <div>check profile: {profileIdToCheck}</div>
      <input
        type="number"
        placeholder="profileId?"
        onChange={(e) => {
          setProfileIdToCheck(Number(e.target.value));
        }}
      ></input>
      <button
        className="border-2 border-solid border-black"
        onClick={handleCheckProfile}
      >
        check profile
      </button>
      {profileResult != null && (
        <div>
          <div>{(profileResult as profileResult).handle ?? "null"}</div>
          <div>{(profileResult as profileResult).imageURI ?? "null"}</div>
        </div>
      )}

      <br />
      {/* lens proxy */}
      <div>
        my default profileID:
        {address ? profileId : "connect to check"}
      </div>
      <br />

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
      <br />

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

      <br />
      {/* comment */}
      <div>
        <div>metadata url (get from server): {newMetadataURL}</div>
        <div>
          ProfileId PointTo (can get from router): {toHex(profileIdPointed)}
        </div>
        <div>PubId PointTo (can get from router): {toHex(pubIdPointed)}</div>

        <button
          className="border-2 border-solid border-black disabled:cursor-not-allowed disabled:border-gray-200 disabled:text-gray-200"
          onClick={handleComment}
          disabled={!address}
        >
          Create Comment
        </button>
      </div>

      <div>new pubId: {lastCreateCommentEventData[1]?.toString() ?? ""}</div>
    </div>
  );
};

export default CallExample;
