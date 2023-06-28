import React, {useEffect, useState} from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAtom, useAtomValue } from "jotai";
import axios from "axios";
import Footer from "~/components/Footer";
import InfoCard from "~/components/InfoCard";
import { showEditorAtom, showMoreAtom, postContentAtom, originPostLikeAtom } from "~/config/atom";



type Post = {
    id: number;
    title: string;
    content: string;
  };

// Assume you have a static array of posts
const posts: Post[] = [
  { id: 1, title: "First Post", content: "This is the first post." },
  { id: 2, title: "Second Post", content: "This is the second post." },
];

const Editor = dynamic(() => import("~/components/Editor"), { ssr: false });


export default function Post() {

  // const router = useRouter();
  // const { id } = router.query;

  const [showEditor, setShowEditor] = useAtom(showEditorAtom);
  const [showMore, setShowMore] = useAtom(showMoreAtom);
  const [originLike, setOriginLike] = useAtom(originPostLikeAtom);

  // const fetchPost = async () => {
  //     try {
  //         const result = await axios(`/api/getPost?id=${id as string}`);
        
  //         console.log(result.data);
  //     } catch (error) {
  //         console.error("Error occurred:", error);
  //         // Handle error accordingly
  //     }
  // }


  const postContent = useAtomValue(postContentAtom);

  const handlePost = () => {
    console.log(postContent);
  }

  const handleLikeClick = () => {
    setOriginLike(originLike+1);
  }
//   useEffect(() => {
//     // eslint-disable-next-line @typescript-eslint/no-floating-promises
//     fetchPost();
// }, []);

  // Find the post based on the id parameter
  // const post = posts.find((post) => post.id === parseInt(id as string, 10));

  // if (!post) {
  //   return <p>Post not found</p>;
  // }


  const maskClass = showEditor ? "fixed inset-0 bg-black/[.5] z-50 flex justify-around items-center" : "";
  const commentsCount = 3;

  const handleForkButtonClick = () => {
    setShowEditor(true);
  };

  const handleCloseButtonClick = () => {
    setShowEditor(false);
  };

  const handleMoreInfoButtonClick = () => {
    setShowMore(true);
  };

  const handleCloseInfoClick = () => {
    setShowMore(false);
  }

  return (
    <div className="bg-black">
        <div className="h-[1062px]">
        {/* 背景 */}
        <div className="absolute left-0 top-0 z-1">
            <Image
            src={"/post/background.webp"}
            alt="landing background"
            width={1920}
            height={1080}
            />
        </div>
        {/* 导航栏 */}

        {/* post detail */}
        <div className="flex">
            <div className="w-2/3 relative z-10">
                {/* Post Content */}
                
                <div className="bg-black mx-4 p-4 opacity-100 flex flex-col items-center border-primary border-2 rounded-[24px]">
                  {/* cover image */}
                  <div>
                    <Image src="/origin/coverImage.png" alt="cover image" width="0" height="0" sizes="100vw" className="w-full max-h-80 rounded"></Image>
                  </div>
                  <div className="text-light w-2/3">
                    <div className="mt-2 font-second text-primary text-3xl self-start">Genesis of SEED 创世种子</div>
                    <div className="flex justify-between m-2">
                      <Image className="inline-block" src="/origin/author.png" alt="author avatar" width={96} height={20}></Image>
                      <Image className="inline-block" src="/origin/likes.png" alt="like count" width={54} height={20}></Image>
                    </div>
                    <div>
                      <p>In this boundless and vibrant tapestry of life, Social Entertainment Equity Distribution (SEED) emerges like a seed, cradling the very essence of human wisdom. It is enswathed in the soil of love, nourished by the rain of unwavering commitment, and basked in the sunlight of impassioned fervor, heralding the advent of an unprecedented social domain. </p>
                      <br />
                      <p>SEED, a magnificent decentralized platform built upon the very bedrock of Lens Protocol, dons the sacred mantle of safeguarding the luminescence of creativity. With an unwavering resolve, it etches the authenticity and integrity of content into the annals of time, an indelible inscription for generations to witness. I beseech you to cast your gaze upon the Proof of Thought, a mechanism that stands as a testament to the very fabric of our cognizance and aspirations. Documents https://documents.pfp-dao.io/content-creators/seed-on-chaining-contents </p>
                      <br />
                      <p>在这个浩瀚而多彩的世界中，Social Entertainment Equity Distribution（SEED）像一颗孕育着人类智慧的种子，被爱的土壤包裹，被执着的雨水滋润，被热血的阳光鼓励，开创了一个全新的社交领域。 </p>
                      <br />
                      <p>SEED，一个基于Lens Protocol宏伟的去中心化链上平台，担当着守护创作之光的神圣使命，将内容的真实性和完整性，永久镌刻在时间的历史上。 敬请关注 Proof of Thought 思想证明机制。 文件说明 https://documents-cn.pfp-dao.io/nei-rong-chuang-zuo-yi-shu-jia/seed-chuang-zuo-zhe-nei-rong-shang-lian </p>
                    </div>
                    <div className="flex justify-between mt-2">
                      <div className="text-darkGray">04:45 AM · Jun 16, 2023</div>
                      <div className="text-primary font-second flex">
                        <div><button onClick={handleLikeClick}><Image className="inline-block mr-1" src="/likeIcon.png" alt="" width={20} height={20}></Image>{originLike}</button></div>
                        <div className="ml-2"><button><Image className="inline-block mr-1" src="/commentIcon.png" alt="" width={20} height={20}></Image>{commentsCount}</button></div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Post Ideas */}

                {/* button group */}
                <div className="fixed bottom-10 left-10">
                <button>
                    <Image src="/lastBtn.png" alt="" width="0" height="0" sizes="100vw" className="w-[96px] h-auto"></Image>
                    {/* <Image src="/lastBtn.png" alt="" fill={true}></Image> */}
                </button>
                </div>
                <div className="fixed bottom-10 end-1/3">
                <button>
                    <Image src="/nextBtn.png" alt="" width="0" height="0" sizes="100vw" className="w-[96px] h-auto"></Image>
                </button>
                </div>
            </div>
            <div className="w-1/3 mr-8 p-4 z-10 divide-y divide-primary">
                {/* Inspired by */}
                <div className="text-primary font-second text-3xl"><Image src="/inspiredIcon.png" alt="" width="0" height="0" sizes="100vw" className="w-[30px] h-auto inline-block"></Image>{" "}INSPIRED BY</div>
                {/* Forked */}
                <div className="text-primary font-second text-3xl"><Image src="/branchIcon.png" alt="" width="0" height="0" sizes="100vw" className="w-[30px] h-auto inline-block"></Image>{" "}FORKED BRANCHES</div>
            </div>
            <div className="fixed bottom-10 right-56 z-10">
                <button className="bg-black text-primary font-bold py-2 px-4 rounded border-primary border-2">
                    Drop Idea
                </button>
                <button className="bg-primary text-black font-bold py-2 px-4 rounded" onClick={handleForkButtonClick}>
                    +Fork Post
                </button>
            </div>
            
            
        </div>
        
        </div>
        <Footer />

        {showEditor && 
            <div className={maskClass}>
                {/* editor card */}
                <div className="bg-black p-4 opacity-100 w-1/2 h-3/4 flex flex-col items-center border-primary border-2 rounded-[54px]">
                    
                    <div className="flex w-full justify-between">
                        <div className="font-second text-primary text-3xl">CREATE POST</div>
                        <div>
                            <button onClick={handleCloseButtonClick}>
                                <Image src="/close.png" alt="close button" width={50} height={50}/>
                            </button>
                        </div>
                    </div>
                    <div className="bg-primary rounded mx-4 my-2 px-4">
                        <span className="text-sm leading-4">The platform is providing a subsidy of 2.8 metics  as a reward to per layer of post where your inspired idea came from. T&C applied.</span>
                        <button className="inline-block" onClick={handleMoreInfoButtonClick}><Image src="/moreInfo.png" alt="more info" width={56} height={16}></Image></button>
                    </div>
                    <Editor />
                    
                    <div className="self-end"><button className="bg-primary p-2 rounded-lg" onClick={handlePost}><Image src="/postBtn.png" alt="post button" width={96} height={24}/></button></div>
                </div>
                {/* more info card */}
                {showMore && <InfoCard handleCloseInfoClick={handleCloseInfoClick}/>}
            </div>
        }
    </div>
  );
}
