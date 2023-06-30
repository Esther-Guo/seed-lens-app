import { usdcAddress, seedModuleAddress } from "~/config/viem";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { env } from "~/env.mjs";

const USDC_ABI = [
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "address", name: "spender", type: "address" },
    ],
    name: "allowance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "amount", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "canClaim",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "claim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const CLAIM_AMOUNT = 100000000;

const useUSDC = () => {
  const { address } = useAccount();
  // read allownace
  const { data: allownace, refetch: fetchAllownace } = useContractRead({
    abi: USDC_ABI,
    address: usdcAddress,
    functionName: "allowance",
    args: [address, seedModuleAddress],
    chainId: env.NEXT_PUBLIC_CHAIN_ID,
    enabled: false,
  });

  // apprve USDC tx
  const {
    data: approveData,
    write: approveWrite,
    error: approveError,
    isLoading: isApproveWaitingSign,
  } = useContractWrite({
    address: usdcAddress,
    abi: USDC_ABI,
    functionName: "approve",
    args: [seedModuleAddress, CLAIM_AMOUNT],
    chainId: env.NEXT_PUBLIC_CHAIN_ID,
  });

  const { isLoading: isApproveLoading } = useWaitForTransaction({
    hash: approveData?.hash,
  });

  // claim tx
  const {
    data: claimData,
    write: claimWrite,
    error: claimError,
    isLoading: isClaimWaitingSign,
  } = useContractWrite({
    address: usdcAddress,
    abi: USDC_ABI,
    functionName: "claim",
    args: [],
    chainId: env.NEXT_PUBLIC_CHAIN_ID,
    onError: (error) => {
      console.warn("usdc claim error: ", error);
    },
  });

  const { isLoading: isClaimLoading } = useWaitForTransaction({
    hash: claimData?.hash,
  });

  // check balance view
  const { data: balance, refetch: fetchBalance } = useContractRead({
    abi: USDC_ABI,
    address: usdcAddress,
    functionName: "balanceOf",
    args: [address],
    chainId: env.NEXT_PUBLIC_CHAIN_ID,
    enabled: false,
  });

  return {
    allownace,
    fetchAllownace,
    isApproveLoading,
    approveWrite,
    approveError,
    isApproveWaitingSign,
    isClaimLoading,
    claimWrite,
    claimError,
    isClaimWaitingSign,
    balance: balance as number,
    fetchBalance,
  };
};

export default useUSDC;
