import React, {useEffect, useState} from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAtom, useAtomValue } from "jotai";
import axios from "axios";
import Footer from "~/components/Footer";
import InfoCard from "~/components/InfoCard";
import { showEditorAtom, showMoreAtom, postContentAtom } from "~/config/atom";



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

  const router = useRouter();
  const { id } = router.query;

  const [showEditor, setShowEditor] = useAtom(showEditorAtom);
  const [showMore, setShowMore] = useAtom(showMoreAtom);

  const fetchPost = async () => {
      try {
          const result = await axios(`/api/getPost?id=${id as string}`);
        
          console.log(result.data);
      } catch (error) {
          console.error("Error occurred:", error);
          // Handle error accordingly
      }
  }


  const postContent = useAtomValue(postContentAtom);

  const handlePost = () => {
    console.log(postContent);
  }
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchPost();
}, []);

  // Find the post based on the id parameter
  const post = posts.find((post) => post.id === parseInt(id as string, 10));

  if (!post) {
    return <p>Post not found</p>;
  }


  const maskClass = showEditor ? "fixed inset-0 bg-black/[.5] z-50 flex justify-around items-center" : "";


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
                {/* Post Ideas */}
                <div className="max-w-full p-4">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vestibulum eros eget sollicitudin eleifend. Pellentesque nec mollis dolor. Duis hendrerit cursus vulputate. Proin accumsan velit vitae lacus sodales gravida. Proin tincidunt tellus efficitur blandit lobortis. Quisque quam ligula, vulputate non eleifend in, lobortis eget dolor. Suspendisse vitae augue ut ligula consectetur accumsan. Sed blandit tellus tortor, in porttitor eros cursus vel. Curabitur rutrum ipsum tellus, vel laoreet justo bibendum in. Cras lobortis, risus quis consectetur sollicitudin, velit lacus ultricies arcu, vel gravida mi sapien sed lorem.

                Sed sed congue mi. Vivamus ultricies arcu vel lacus placerat, vitae blandit orci blandit. Duis nec massa faucibus, varius arcu sed, sodales nisi. Nam viverra erat id lectus tincidunt dictum. Donec eros elit, consectetur ut purus eget, tincidunt volutpat nulla. Sed nec elit tempus, elementum orci sit amet, condimentum nunc. Vivamus faucibus a quam vitae porta. Proin nec ante ultrices, viverra nunc eu, aliquam quam. Suspendisse potenti. Sed sapien ligula, fermentum nec mollis sagittis, pulvinar vel metus.</p>
                </div>

                <div className="fixed bottom-10 left-10 ">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                    Fixed Button
                </button>
                </div>
                <div className="fixed bottom-10 right-1/3">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                    Fixed Button
                </button>
                </div>
            </div>
            <div className="w-1/3">
                {/* Inspired by */}
                {/* Forked */}
                <p>{post.content}</p>
            </div>
            <div className="fixed bottom-10 right-56">
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
