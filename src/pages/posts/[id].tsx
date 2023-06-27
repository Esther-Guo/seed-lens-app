import React, {useEffect, useState} from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { socialLinks } from "~/constant/social";
import Footer from "~/components/Footer";
import { showEditorAtom } from "~/config/atom";



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
  

  // Find the post based on the id parameter
  const post = posts.find((post) => post.id === parseInt(id as string, 10));

  if (!post) {
    return <p>Post not found</p>;
  }


  const maskClass = showEditor ? "fixed inset-0 bg-black/[.5] z-50 flex justify-center" : "";

  const handleForkButtonClick = () => {
    setShowEditor(true);
  };

  const handleCloseButtonClick = () => {
    setShowEditor(false);
  };

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
        <div className="flex justify-center">
        <Link className="relative" href={socialLinks.collab} target="_blank">
            <Image
              src="/contact.svg"
              alt="contact button"
              width={222}
              height={86}
            />
        </Link>
        </div>
        <Footer />
        {showEditor && 
            <div className={maskClass}>
                <div className="bg-black p-4 opacity-100 w-1/2 h-1/2 flex flex-col items-center border-primary border-2 rounded-[54px]">
                    <div className="flex w-full justify-between">
                        <div className="font-second text-primary text-3xl">CREATE POST</div>
                        <div>
                            <button onClick={handleCloseButtonClick}>
                                <Image src="/close.png" alt="close button" width={50} height={50}/>
                            </button>
                        </div>
                    </div>
                    <Editor />
                    <div className="self-end"><button className="bg-primary p-2 rounded-lg"><Image src="/postBtn.png" alt="post button" width={96} height={24}/></button></div>
                </div>
            </div>
        }
    </div>
  );
}
