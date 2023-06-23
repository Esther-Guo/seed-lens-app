/* eslint-disable @typescript-eslint/no-unused-vars */

import { env } from "~/env.mjs";
export const isTestnet =
  env.NEXT_PUBLIC_CHAIN_ID == 80001 ||
  String(env.NEXT_PUBLIC_CHAIN_ID) == "80001";

// export const equipmentAddr = isTestnet
//   ? "0xC71AC2E39067d1D1E57130807616d727b18E6223"
//   : "0x2871e92209D9B0936FbbB178483877f51C7c9321";
// export const poolAddr = isTestnet
//   ? "0x8CF168b08D0f8776FB8cf9B1aEB47DE8EF61262A"
//   : "0xE9728Ed5E1FD05665C44a17082d77049801435f0";
// export const roleAddr = isTestnet
//   ? "0x7fF299F0B1b23859AE112c3139978A0d819D1D00"
//   : "0xbE0A8ce3Ca98d5806B7f8dA015eaBcFb4738592A";
// export const ogSBTAddr = isTestnet
//   ? "0x379CB09a02A0D51A959C958a0662c05E331Bc8BA"
//   : "0x2C0Ad86061F88CC6f1Ff2b38b7b5f41dd7BBd447";
export const alchemyNetwork = isTestnet ? "polygon-mumbai" : "polygon-mainnet";

// export const whiteListActiveNonce = isTestnet ? 1 : 1;

// export const loot1PriceSendValue = isTestnet ? "0.000028" : "2.8";
// export const loot10PriceSendValue = isTestnet ? "0.00022" : "22";

// export const loot1Gas = 500000n;
// export const loot10Gas = 1000000n;
// export const whitelistLootGas = 1000000n;
// export const baseGasPrice = isTestnet ? 2n : 180n;
