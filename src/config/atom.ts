/* eslint-disable @typescript-eslint/no-unused-vars */
import { atom } from "jotai";
// import { avatarEquipPath } from "./role";
import { atomWithStorage } from "jotai/utils";
// import { type WhitelistRes } from "~/pages/api/whitelist";
// import { type Address } from "viem";

// interface AlertAtomProps {
//   isOpen: boolean;
//   message?: string;
//   subMessage?: string;
//   isShowOkButton?: boolean;
//   callback?: () => void;
// }

// export interface LootEvent {
//   user: `0x${string}`;
//   slot: bigint;
//   balance: number;
// }

// export interface LootResult {
//   balance: number;
//   imageUri: string;
//   roleId: number;
//   name: string;
//   variant: number;
//   rarity: number;
// }

// interface GuarResult {
//   user: string;
//   newSSGuar: number;
//   newSSSGuar: number;
//   isUpSSS: boolean;
// }

// interface LevelResultProps {
//   currentLevel: number;
//   newLevel: number;
//   rareGuar: number;
//   currentExp: number;
//   newExp: number;
//   legendaryGuar: number;
//   isPreciseGuar: boolean;
// }

// export const alertAtom = atom<AlertAtomProps>({
//   isOpen: false,
//   isShowOkButton: true,
// });

// export const isLootCompleteAtom = atom(true);
// export const isLootVideoPlayingAtom = atom(false);

// const testLootResult: LootResult[] = [
//   {
//     balance: 1,
//     imageUri: avatarEquipPath,
//     roleId: 0,
//     name: "weapon",
//     variant: 0,
//     rarity: 0,
//   },
//   {
//     balance: 1,
//     imageUri:
//       "https://pfpdao-0.4everland.store/role/3/V1_0/role_3_V1_0_0_Mila.jpg",
//     roleId: 4,
//     name: "Mila",
//     variant: 1,
//     rarity: 1,
//   },
//   {
//     balance: 2,
//     imageUri:
//       "https://pfpdao-0.4everland.store/role/4/V1_0/role_4_V1_0_0_Mico.jpg",
//     roleId: 3,
//     name: "Mico",
//     variant: 3,
//     rarity: 1,
//   },
//   {
//     balance: 1,
//     imageUri:
//       "https://pfpdao-0.4everland.store/role/2/V1_0/role_2_V1_0_0_Kazuki.jpg",
//     roleId: 2,
//     name: "Kazuki",
//     variant: 2,
//     rarity: 1,
//   },
//   {
//     balance: 1,
//     imageUri:
//       "https://pfpdao-0.4everland.store/role/1/V1_0/role_1_V1_0_0_Linger.jpg",
//     roleId: 1,
//     name: "Linger",
//     variant: 1,
//     rarity: 2,
//   },
// ];

// const testLootResult2 = [
//   {
//     balance: 2,
//     imageUri: "/result/avatar-equip.jpg",
//     roleId: 0,
//     rarity: 0,
//     variant: 0,
//     name: "weapon",
//   },
//   {
//     balance: 3,
//     imageUri:
//       "https://pfpdao-0.4everland.store/role/3/V1_0/role_3_V1_0_3_Mila.jpg",
//     roleId: 3,
//     rarity: 1,
//     variant: 3,
//     name: "Mila",
//   },
//   {
//     balance: 2,
//     imageUri:
//       "https://pfpdao-0.4everland.store/role/2/V1_0/role_2_V1_0_3_Kazuki.jpg",
//     roleId: 2,
//     rarity: 1,
//     variant: 3,
//     name: "Kazuki",
//   },
// ];

// const defaultGuarResult = {
//   user: "0x0000000",
//   newSSGuar: 3,
//   newSSSGuar: 1,
//   isUpSSS: false,
// };

// // uint256 indexed nftId, uint8 newLevel, uint32 newExp
// interface LevelEventProps {
//   nftId: bigint;
//   newLevel: number;
//   newExp: number;
// }

// const testLevelResult = {
//   currentLevel: 1,
//   newLevel: 2,
//   currentExp: 0,
//   newExp: 10,
//   rareGuar: 5,
//   legendaryGuar: 10,
//   isPreciseGuar: false,
// };

// const isTestLootResult = false;
// const isShowLevelResult = false;
// export const ablumAvaliable = false;
// export const isLootResultOpenAtom = atom(isTestLootResult);
// export const lootResultAtom = atom<LootResult[]>(
//   !isTestLootResult ? [] : testLootResult2
// );
// export const lootEventAtom = atom<LootEvent[]>([]);
// export const guarResultAtom = atom<GuarResult | undefined>(
//   isTestLootResult ? defaultGuarResult : undefined
// );
// export const levelResultAtom = atom<LevelResultProps | undefined>(
//   isTestLootResult && isShowLevelResult ? testLevelResult : undefined
// );
// export const lastLootTypeAtom = atom<0 | 1 | 10 | 90 | undefined>(undefined);

// export const ogSBTColors = [
//   "#453f3c",
//   "#c4fa00",
//   "#ff91af",
//   "#c9a063",
//   "#898989",
//   "#F8F2E6",
// ];

// export const ogSBTColorAtom = atom<0 | 1 | 2 | 3 | 4 | 5>(0);

// export const hasFreeMilaAtom = atom<boolean>(false);
// export const hasFreeMicoAtom = atom<boolean>(false);
// export const hasFreeKazukiAtom = atom<boolean>(false);
// export const hasFreeLingerAtom = atom<boolean>(false);

// export const isObtainOrBulletAtom = atom<boolean>(false);

// export const messageCoolDownAtom = atom<number>(0); // wait seconds
// export const messageCoolDownTextAtom = atom<string>("");
// export const likeCoolDownAtom = atom<number>(0);
// export const likeCoolDownTextAtom = atom<string>("");

// export const renderCanvasAtom = atom<boolean>(false);
// export const showPageBarrageAtom = atom<boolean>(false);

// export const freeLootAmountAtom = atom<number>(0);

// export const showRulePageAtom = atom<boolean>(false);

// export const sideMenuScrollTo = [
//   0, // L: loot
//   1080, // S: seed
//   3240, // E: earn
//   4320, // H: how
//   6480, // T: team
//   7560, // R: roadmap
//   8640, // P: partners
// ];

export const zoomAtom = atom(1);

export const showEditorAtom = atom(false);

export const showMoreAtom = atom(false);

export const showEarnDetailAtom = atom(false);

export const postContentAtom = atom("Hello world!!");

export const langAtom = atom("中文");

export const commentTextAtom = atom("");

export const ifLikeAtom = atom(1);

export const postDataAtom = atom<PostStruct>({
  comments: [],
  content: "",
  createTime: "",
  id: null,
  images: [],
  inspirationId: "",
  likeNum: 0,
  postId: "",
  profileId: null,
  title: "",
});

export const imageListAtom = atom<string[]>([]);

export const postTextAtom = atom("");

// export const zoomedScrollToAtom = atom((get) => {
//   const zoom = get(zoomAtom);
//   return sideMenuScrollTo.map((v) => v * zoom);
// });

// export const menuToAtom = atom((get) => {
//   const zoomedScrollTo = get(zoomedScrollToAtom);
//   return [
//     [zoomedScrollTo[0]],
//     [zoomedScrollTo[1], zoomedScrollTo[2], zoomedScrollTo[3]],
//     [zoomedScrollTo[4]],
//     [zoomedScrollTo[5]],
//     [zoomedScrollTo[6]],
//   ];
// });

// export const scrollYAtom = atom(0);

// export const activePageIndexAtom = atom((get) => {
//   const zoom = get(zoomAtom);
//   const scrollY = get(scrollYAtom) / zoom;

//   const index = sideMenuScrollTo.findIndex((value) => scrollY < value);
//   return index === -1 ? sideMenuScrollTo.length - 1 : index - 1;
// });

// export const isFreeLootedAtom = atom<boolean | undefined>(true);

// export const whitelistLootTimesAtom = atomWithStorage("whitelistLootTimes", 0);

// export const addressAtom = atom<Address | undefined | null>(undefined);

// export const whitelistSignatureAtom = atomWithStorage("signature", "");

// export const getSignatureAtom = atom(
//   (get) => get(whitelistSignatureAtom),
//   async (get, set) => {
//     const address = get(addressAtom);
//     if (address) {
//       const res = await fetch(`/api/whitelist?address=${address}`);
//       const whitelistRes = (await res.json()) as WhitelistRes;
//       if (whitelistRes.signature) {
//         set(whitelistSignatureAtom, whitelistRes.signature);
//       }
//     }
//   }
// );

// export const showWalletSelectAtom = atom<boolean>(false);

export const profileIdAtom = atomWithStorage("profileId", 0);

export const usdcBalanceAtom = atom<bigint>(0n);
export const allownaceAtom = atom<bigint>(0n);

export interface rewardProps {
  sun: bigint;
  rain: bigint;
  soil: bigint;
}

export const rewardAtom = atom<rewardProps>({
  sun: 0n,
  rain: 0n,
  soil: 0n,
});

export const newMetadataURLAtom = atom<string>("");
export const pubIdPointedAtom = atom<number>(3);
export const profileIdPointedAtom = atom<number>(658);

export const hasLensHandleAtom = atom<boolean>(true);
export const profileIdToCheckAtom = atom<number>(0);

export const lastCreateCommentEventDataAtom = atom<(string | bigint)[]>([]);

export const testImgs = {
  msg: "操作成功",
  code: 200,
  data: [
    {
      postId: "3-1",
      title: "Bullet Screen Event",
      images: [],
      type: 1,
    },
    {
      postId: "1-1",
      title: "Genesis Post 创世贴",
      images: ["http://124.221.52.47:9000/lens/1688277968769.jpg"],
      type: 2,
    },
    {
      postId: "2-1",
      title: "Saiber Reading Club 赛博读书会",
      images: ["http://124.221.52.47:9000/lens/1688278546346.jpg"],
      type: 3,
    },
    {
      postId: "1-2",
      title: "PFP-DAO Co-Creation",
      images: ["http://124.221.52.47:9000/lens/1688278317381.jpg"],
      type: 0,
    },
    {
      postId: "1-4",
      title: "Future 未来",
      images: ["http://124.221.52.47:9000/lens/1688278914723.jpg"],
      type: 0,
    },
    {
      postId: "1-5",
      title: "Present 现在",
      images: ["http://124.221.52.47:9000/lens/1688279064498.jpg"],
      type: 0,
    },
    {
      postId: "1-3",
      title: "Past 过去",
      images: ["http://124.221.52.47:9000/lens/1688278737587.jpg"],
      type: 0,
    },
  ],
};

export interface Img {
  postId: string;
  title: string;
  images: string[];
  type: number;
}

export const mainPageImgListAtom = atom<Img[]>([]);

export interface ServerResponse {
  msg: string;
  code: number;
  data: Img[];
}
