import { lensProxyAddress } from "~/config/viem";
import {
  useAccount,
  useContractEvent,
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";

import { env } from "~/env.mjs";
import {
  lastCreateCommentEventDataAtom,
  profileIdToCheckAtom,
} from "~/config/atom";
import { useAtomValue, useSetAtom } from "jotai";
import { decodeEventLog, parseAbi } from "viem";

const LENS_PROXY_ABI = [
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "to", type: "address" },
          { internalType: "string", name: "handle", type: "string" },
          { internalType: "string", name: "imageURI", type: "string" },
          { internalType: "address", name: "followModule", type: "address" },
          {
            internalType: "bytes",
            name: "followModuleInitData",
            type: "bytes",
          },
          { internalType: "string", name: "followNFTURI", type: "string" },
        ],
        internalType: "struct DataTypes.CreateProfileData",
        name: "vars",
        type: "tuple",
      },
    ],
    name: "createProfile",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "profileId", type: "uint256" }],
    name: "getProfile",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "pubCount", type: "uint256" },
          { internalType: "address", name: "followModule", type: "address" },
          { internalType: "address", name: "followNFT", type: "address" },
          { internalType: "string", name: "handle", type: "string" },
          { internalType: "string", name: "imageURI", type: "string" },
          { internalType: "string", name: "followNFTURI", type: "string" },
        ],
        internalType: "struct DataTypes.ProfileStruct",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "uint256", name: "index", type: "uint256" },
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "uint256", name: "profileId", type: "uint256" },
          { internalType: "string", name: "contentURI", type: "string" },
          {
            internalType: "uint256",
            name: "profileIdPointed",
            type: "uint256",
          },
          { internalType: "uint256", name: "pubIdPointed", type: "uint256" },
          { internalType: "bytes", name: "referenceModuleData", type: "bytes" },
          { internalType: "address", name: "collectModule", type: "address" },
          {
            internalType: "bytes",
            name: "collectModuleInitData",
            type: "bytes",
          },
          { internalType: "address", name: "referenceModule", type: "address" },
          {
            internalType: "bytes",
            name: "referenceModuleInitData",
            type: "bytes",
          },
        ],
        internalType: "struct DataTypes.CommentData",
        name: "vars",
        type: "tuple",
      },
    ],
    name: "comment",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  { inputs: [], name: "CallerNotCollectNFT", type: "error" },
  { inputs: [], name: "CallerNotFollowNFT", type: "error" },
  { inputs: [], name: "CannotInitImplementation", type: "error" },
  { inputs: [], name: "DispatcherNotSet", type: "error" },
  { inputs: [], name: "EmergencyAdminCannotUnpause", type: "error" },
  { inputs: [], name: "InitParamsInvalid", type: "error" },
  { inputs: [], name: "Initialized", type: "error" },
  { inputs: [], name: "NotGovernance", type: "error" },
  { inputs: [], name: "NotGovernanceOrEmergencyAdmin", type: "error" },
  { inputs: [], name: "NotOwnerOrApproved", type: "error" },
  { inputs: [], name: "NotProfileOwner", type: "error" },
  { inputs: [], name: "NotProfileOwnerOrDispatcher", type: "error" },
  { inputs: [], name: "Paused", type: "error" },
  { inputs: [], name: "ProfileCreatorNotWhitelisted", type: "error" },
  { inputs: [], name: "ProfileImageURILengthInvalid", type: "error" },
  { inputs: [], name: "PublicationDoesNotExist", type: "error" },
  { inputs: [], name: "PublishingPaused", type: "error" },
  { inputs: [], name: "SignatureExpired", type: "error" },
  { inputs: [], name: "SignatureInvalid", type: "error" },
  { inputs: [], name: "ZeroSpender", type: "error" },
  {
    anonymous: false,
    inputs: [
      {
        index: true,
        internalType: "uint256",
        name: "profileId",
        type: "uint256",
      },
      { index: true, internalType: "uint256", name: "pubId", type: "uint256" },
      { internalType: "string", name: "contentURI", type: "string" },
      { internalType: "uint256", name: "profileIdPointed", type: "uint256" },
      { internalType: "uint256", name: "pubIdPointed", type: "uint256" },
      { internalType: "bytes", name: "referenceModuleData", type: "bytes" },
      { internalType: "address", name: "collectModule", type: "address" },
      { internalType: "bytes", name: "collectModuleReturnData", type: "bytes" },
      { internalType: "address", name: "referenceModule", type: "address" },
      {
        internalType: "bytes",
        name: "referenceModuleReturnData",
        type: "bytes",
      },
      { internalType: "uint256", name: "timestamp", type: "uint256" },
    ],
    name: "CommentCreated",
    type: "event",
  },
];

const useLensProxy = () => {
  const { address } = useAccount();
  const profileIdToCheck = useAtomValue(profileIdToCheckAtom);
  const setLastCreateCommentEventData = useSetAtom(
    lastCreateCommentEventDataAtom
  );

  const {
    data: createProfileData,
    write: createProfileWrite,
    error: createProfileError,
    isLoading: createProfileIsWaitingSign,
  } = useContractWrite({
    abi: LENS_PROXY_ABI,
    address: lensProxyAddress,
    functionName: "createProfile",
    chainId: env.NEXT_PUBLIC_CHAIN_ID,
  });

  const { isLoading: isCreateProfileLoading } = useWaitForTransaction({
    hash: createProfileData?.hash,
  });

  const { data: profileResult, refetch: fetchProfileResult } = useContractRead({
    abi: LENS_PROXY_ABI,
    address: lensProxyAddress,
    functionName: "getProfile",
    args: [profileIdToCheck],
    chainId: env.NEXT_PUBLIC_CHAIN_ID,
    enabled: false,
  });

  const { data: profileId, refetch: fetchProfileID } = useContractRead({
    abi: LENS_PROXY_ABI,
    address: lensProxyAddress,
    functionName: "tokenOfOwnerByIndex",
    args: [address, 0],
    chainId: env.NEXT_PUBLIC_CHAIN_ID,
    enabled: false,
  });

  const { data: balance, refetch: fetchBalance } = useContractRead({
    abi: LENS_PROXY_ABI,
    address: lensProxyAddress,
    functionName: "balanceOf",
    args: [address],
    chainId: env.NEXT_PUBLIC_CHAIN_ID,
    enabled: false,
  });

  const {
    data: commentData,
    write: commentWrite,
    error: commentError,
    isLoading: commentIsWaitingSign,
  } = useContractWrite({
    abi: LENS_PROXY_ABI,
    address: lensProxyAddress,
    functionName: "comment",
    chainId: env.NEXT_PUBLIC_CHAIN_ID,
    gas: 250000n,
  });

  const { isLoading: isCommentLoading } = useWaitForTransaction({
    hash: commentData?.hash,
  });

  const commentCreated =
    "event CommentCreated(uint256 indexed, uint256 indexed, string contentURI, uint256 profileIdPointed, uint256 pubIdPointed, bytes referenceModuleData, address collectModule, bytes collectModuleReturnData, address referenceModule, bytes referenceModuleReturnData, uint256 timestamp)";
  useContractEvent({
    address: lensProxyAddress,
    abi: LENS_PROXY_ABI,
    eventName: "CommentCreated",
    listener(logs) {
      const log = logs.pop();
      if (log !== undefined) {
        const logData: { eventName: string; args: (string | bigint)[] } =
          decodeEventLog({
            abi: parseAbi([commentCreated]),
            data: log.data,
            topics: log.topics,
          });
        console.warn(logData.args);
        setLastCreateCommentEventData(logData.args);
      }
    },
  });

  return {
    createProfileWrite,
    createProfileError,
    createProfileIsWaitingSign,
    isCreateProfileLoading,
    profileResult,
    fetchProfileResult,
    profileId,
    fetchProfileID,
    balance,
    fetchBalance,
    commentWrite,
    commentError,
    commentIsWaitingSign,
    isCommentLoading,
  };
};

export default useLensProxy;
