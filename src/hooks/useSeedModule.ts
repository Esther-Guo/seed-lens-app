import { seedModuleAddress } from "~/config/viem";
import {
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { env } from "~/env.mjs";
import { useAtomValue } from "jotai";
import { profileIdAtom } from "~/config/atom";

const SEED_MODULE_ABI = [
  {
    inputs: [
      { internalType: "uint256", name: "profileId_", type: "uint256" },
      { internalType: "uint256", name: "amountToClaim_", type: "uint256" },
    ],
    name: "claim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "profileId_", type: "uint256" }],
    name: "getReward",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "sun", type: "uint256" },
          { internalType: "uint256", name: "rain", type: "uint256" },
          { internalType: "uint256", name: "soil", type: "uint256" },
        ],
        internalType: "struct ReferenceSeedModule.SeedReward",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const useSeedModule = () => {
  const profileId = useAtomValue(profileIdAtom);

  const { data: rewardAmount, refetch: fetchRewardAmount } = useContractRead({
    abi: SEED_MODULE_ABI,
    address: seedModuleAddress,
    functionName: "getReward",
    args: [profileId],
  });

  const {
    data: claimData,
    write: claimWrite,
    error: claimError,
    isLoading: claimIsWaitingSign,
  } = useContractWrite({
    abi: SEED_MODULE_ABI,
    address: seedModuleAddress,
    functionName: "claim",
    chainId: env.NEXT_PUBLIC_CHAIN_ID,
  });

  const { isLoading: isClaimLoading } = useWaitForTransaction({
    hash: claimData?.hash,
  });

  return {
    rewardAmount,
    fetchRewardAmount,
    claimWrite,
    claimError,
    claimIsWaitingSign,
    isClaimLoading,
  };
};

export default useSeedModule;
