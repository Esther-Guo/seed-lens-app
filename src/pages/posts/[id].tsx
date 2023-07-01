import React, {useEffect, useState, useCallback} from "react";
import { GetServerSideProps, type NextPage } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAtom, useAtomValue } from "jotai";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import Footer from "~/components/Footer";
import InfoCard from "~/components/InfoCard";
import Idea from "~/components/Idea";
import { 
  showEditorAtom, 
  showMoreAtom, 
  postContentAtom, 
  commentTextAtom, 
  postDataAtom, 
  ifLikeAtom,
  imageListAtom,
  postTextAtom
} from "~/config/atom";
import useLensProxy from "~/hooks/useLensProxy";
import { revertCollectModule, seedModuleAddress } from "~/config/viem";
import { ParsedUrlQuery } from "querystring";


const Editor = dynamic(() => import("~/components/Editor"), { ssr: false });

// const {
//   createProfileWrite,
//   profileResult,
//   fetchProfileResult,
//   fetchProfileID,
//   fetchBalance: fetchNFTBalance,
//   commentWrite,
// } = useLensProxy();

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = (context.params as ParsedUrlQuery).id;
  const result = await axios(`/api/getPost?id=${id as string}`);
  return {
    props: {
      post: result.data as PostStruct
    }
  };
}



const PostDetail: NextPage<PostStruct> = (props) => {

  // const router = useRouter();
  const [profileId, pubId] = (props.postId).split("-");

  const [showEditor, setShowEditor] = useAtom(showEditorAtom);
  const [showMore, setShowMore] = useAtom(showMoreAtom);
  const [commentText, setCommentText] = useAtom(commentTextAtom);
  const [postData, setPostData] = useAtom(postDataAtom);
  const [ifLike, setIfLike] = useAtom(ifLikeAtom);
  const [imageList, setImageList] = useAtom(imageListAtom);
  const [postText, setPostText] = useAtom(postTextAtom);

  useEffect(() => {setPostData(props)}, [props, setPostData]);

  const fetchPost = async (id: string) => {
      try {
          const result = await axios(`/api/getPost?id=${id}`);
          // console.log(result);
          setPostData(result.data as PostStruct);
      } catch (error) {
          console.error("Error occurred:", error);
      }
  }
 
  const postContent = useAtomValue(postContentAtom);

  const extractImage = async (postContent: string) => {
    const imageRegex = /<img.*?src="(.*?)".*?>/g;
    const matches = postContent.matchAll(imageRegex);
    const images: string[] = [];
    let remainingHTML = postContent;

    for (const match of matches) {
      const imageUrl = match[1];
      const response: axiosRes = await axios.post("/api/uploadImage", {img: imageUrl});
      // console.log(response.data)
      images.push(response.data as string);
      remainingHTML = remainingHTML.replace(match[0], ""); // Remove the matched image tag
    }

    setImageList(images);
    setPostText(remainingHTML);
  }

  const handlePost = async () => {
    const uuid = uuidv4();
    // console.log(postContent);
    void extractImage(postContent);

    const reqObj: PostMetadata = {
      content: postText, 
      metadataId: uuid, 
      inspirationId: props.postId,
      image: imageList,
      title: "test post",
      profileId: 24, 
      type: 0,
    } 
    const response: axiosRes = await axios.post("/api/post", reqObj);
    console.log("Post posted:", response.data);

  }
 
  const handleLikeClick = async () => {
    const response: likePostRes = await axios.post("/api/like", { id: postData.id, profileId: 1 });
    setPostData((prevPostData: PostStruct) => ({...prevPostData, likeNum: response.data.likeNum} ))
    setIfLike(response.data.ifLike);
    console.log("liked:", response); 
  }

  const handleIdeaSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const handler = async () => {
      // Make the API request to post the comment
      const response: axiosRes = await axios.post("/api/post", { content: commentText, postPointId: postData.postId, profilePointId: parseInt(profileId as string), profileId: 24, type: 1 });
      console.log("Comment posted:", response.data);

      // // contract interaction
      // const args = {
      //   profileId: profileId,
      //   contentURI: response.data.msg,
      //   profileIdPointed: parseInt(profileId as string),
      //   pubIdPointed: id as string,
      //   referenceModuleData: toBytes("0x"),
      //   collectModule: revertCollectModule,
      //   collectModuleInitData: encodePacked(["bool"], [true]),
      //   referenceModule: seedModuleAddress,
      //   referenceModuleInitData: encodePacked([], []),
      // };
      // console.log("comment args", args);

      // commentWrite({
      //   args: [args],
      // });

      // Clear the comment input
      setCommentText("");
      await fetchPost(postData.postId);
    };

    void handler();
  };

  const handleCommentTextChange = (event: React.FormEvent<HTMLInputElement>) => {
    setCommentText((event.target as HTMLInputElement).value);
  };

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
            <div className="w-2/3 z-10">
                {/* Post Content */}
                
                <div className="bg-black mx-4 p-4 opacity-100 flex flex-col items-center border-primary border-2 rounded-[24px]">
                  {/* cover image */}
                  <div>
                    <Image src={postData.images[0] as string} alt="cover image" width="0" height="0" sizes="100vw" className="w-full max-h-80 rounded"></Image>
                  </div>
                  <div className="text-light w-2/3">
                    <div className="mt-2 font-second text-primary text-3xl self-start">{postData.title}</div>
                    <div className="flex justify-between m-2 text-primary">
                      <Image className="inline-block" src="/origin/author.png" alt="author avatar" width={96} height={20}></Image>
                      <div><Image className="inline-block mr-1" src="/likeIcon.png" alt="" width={20} height={20}></Image>{postData.likeNum}</div>
                    </div>
                    <div>
                      {postData.content}
                      {/* <p>In this boundless and vibrant tapestry of life, Social Entertainment Equity Distribution (SEED) emerges like a seed, cradling the very essence of human wisdom. It is enswathed in the soil of love, nourished by the rain of unwavering commitment, and basked in the sunlight of impassioned fervor, heralding the advent of an unprecedented social domain. </p>
                      <br />
                      <p>SEED, a magnificent decentralized platform built upon the very bedrock of Lens Protocol, dons the sacred mantle of safeguarding the luminescence of creativity. With an unwavering resolve, it etches the authenticity and integrity of content into the annals of time, an indelible inscription for generations to witness. I beseech you to cast your gaze upon the Proof of Thought, a mechanism that stands as a testament to the very fabric of our cognizance and aspirations. Documents https://documents.pfp-dao.io/content-creators/seed-on-chaining-contents </p>
                      <br />
                      <p>在这个浩瀚而多彩的世界中，Social Entertainment Equity Distribution（SEED）像一颗孕育着人类智慧的种子，被爱的土壤包裹，被执着的雨水滋润，被热血的阳光鼓励，开创了一个全新的社交领域。 </p>
                      <br />
                      <p>SEED，一个基于Lens Protocol宏伟的去中心化链上平台，担当着守护创作之光的神圣使命，将内容的真实性和完整性，永久镌刻在时间的历史上。 敬请关注 Proof of Thought 思想证明机制。 文件说明 https://documents-cn.pfp-dao.io/nei-rong-chuang-zuo-yi-shu-jia/seed-chuang-zuo-zhe-nei-rong-shang-lian </p> */}
                    </div>
                    <div className="flex justify-between mt-2">
                      <div className="text-darkGray">{postData.createTime}</div>
                      <div className="text-primary font-second flex">
                        <div><button onClick={()=> {void handleLikeClick();}}>{ifLike? (<Image className="inline-block mr-1" src="/likeIcon.png" alt="" width={20} height={20}></Image>):(<Image className="inline-block mr-1" src="/likeIconFilled.png" alt="" width={20} height={20}></Image>)}{postData.likeNum}</button></div>
                        <div className="ml-2"><button><Image className="inline-block mr-1" src="/commentIcon.png" alt="" width={20} height={20}></Image>{postData.comments.length}</button></div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Post Ideas */}
                <div className="bg-black m-4 p-4 opacity-100 flex flex-col items-center border-primary border-2 rounded-[24px] divide-y-2 divide-primary">
                  {/* add comment */}
                  <div className="my-4 w-2/3">
                    <form onSubmit={handleIdeaSubmit} className="flex justify-between">
                      <input type="text" value={commentText} onChange={handleCommentTextChange} placeholder="DROP YOUR IDEA!" className="w-2/3 appearance-none bg-transparent border-b border-primary text-light mr-3 py-1 px-2 leading-tight focus:outline-none"/>
                      <button type="submit" className="bg-primary text-black font-bold py-2 px-4 rounded">DROP</button>
                    </form>
                  </div>
                  {/* display comment */}
                  <Idea ideaData={postData.comments} />
                </div>

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
                    <div className="self-end mt-16"><button className="bg-primary p-2 rounded-lg" onClick={() => {void handlePost();}}><Image src="/postBtn.png" alt="post button" width={96} height={24}/></button></div>
                </div>
                {/* more info card */}
                {showMore && <InfoCard handleCloseInfoClick={handleCloseInfoClick}/>}
            </div>
        }
    </div>
  );
}

export default PostDetail;
