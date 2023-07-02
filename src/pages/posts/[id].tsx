import React, { useEffect, useState, useCallback } from "react";
import { type GetServerSideProps, type NextPage } from "next";
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
  postTextAtom,
  profileIdAtom,
  lastCreateCommentEventDataAtom,
} from "~/config/atom";

import { type ParsedUrlQuery } from "querystring";
import { serverURL } from "~/config/server";

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
  const result = await axios(
    `${serverURL}/post/getPost?postId=${id as string}`
  );
  return {
    props: (result.data as { data: PostStruct }).data,
  };
};

const PostDetail: NextPage<PostStruct> = (props) => {
  const router = useRouter();
  const { id } = router.query;
  const profileId = useAtomValue(profileIdAtom);

  const [showEditor, setShowEditor] = useAtom(showEditorAtom);
  const [showMore, setShowMore] = useAtom(showMoreAtom);
  const [commentText, setCommentText] = useAtom(commentTextAtom);
  const [postData, setPostData] = useAtom(postDataAtom);
  const [ifLike, setIfLike] = useAtom(ifLikeAtom);
  const [imageList, setImageList] = useAtom(imageListAtom);
  const [postText, setPostText] = useAtom(postTextAtom);

  const lastCreateCommentEventData = useAtomValue(
    lastCreateCommentEventDataAtom
  );

  const [profileIdPointTo, setProfileIdPointTo] = useState<number>();
  const [postIdPointTo, setPostIdPointTo] = useState<number>();

  useEffect(() => {
    const profileIdPointTo = (id as `${number}-${number}`).split("-")[0];
    const pubIdPointTo = (id as `${number}-${number}`).split("-")[1];
    setProfileIdPointTo(parseInt(profileIdPointTo ?? "0"));
    setPostIdPointTo(parseInt(pubIdPointTo ?? "0"));
    setPostData(props);
  }, []);

  const fetchPost = async (id: string) => {
    try {
      const result = await axios(`${serverURL}/post/getPost?id=${id}`);
      setPostData(result.data as PostStruct);
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  const postContent = useAtomValue(postContentAtom);

  const extractImage = async (postContent: string) => {
    const imageRegex = /<img.*?src="(.*?)".*?>/g;
    const matches = postContent.matchAll(imageRegex);
    const images: string[] = [];
    let remainingHTML = postContent;

    for (const match of matches) {
      const imageUrl = match[1];
      const response: axiosRes = await axios.post(
        `${serverURL}/image/uploada`,
        {
          image: imageUrl,
        }
      );
      // console.log(response.data)
      images.push(response.data as string);
      remainingHTML = remainingHTML.replace(match[0], ""); // Remove the matched image tag
    }

    setImageList(images);
    setPostText(remainingHTML);
  };

  const handlePost = async () => {
    const uuid = uuidv4();
    // console.log(postContent);
    await extractImage(postContent);

    const reqObj: PostMetadata = {
      content: postText,
      metadataId: uuid,
      inspirationId: postIdPointTo,
      image: imageList,
      title: postData.title,
      profileId: profileId,
      type: 0,
      profilePointId: profileIdPointTo,
      postPointId: postIdPointTo,
      postId: Number(lastCreateCommentEventData[1] as bigint) ?? 0,
    };
    const response: axiosRes = await axios.post(
      `${serverURL}/post/followPost`,
      reqObj
    );
    console.log("Post posted:", response.data);
  };

  const handleLikeClick = async () => {
    const response: likePostRes = await axios.post(`${serverURL}/api/like`, {
      id: postData.id,
      profileId: 1,
    });
    setPostData((prevPostData: PostStruct) => ({
      ...prevPostData,
      likeNum: response.data.likeNum,
    }));
    setIfLike(response.data.ifLike);
    console.log("liked:", response);
  };

  const handleIdeaSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const handler = async () => {
      // Make the API request to post the comment
      const response: axiosRes = await axios.post(
        `${serverURL}/post/followPost`,
        {
          content: commentText,
          postPointId: postData.postId,
          profilePointId: profileId,
          profileId: 24,
          type: 1,
        }
      );
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

  const handleCommentTextChange = (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    setCommentText((event.target as HTMLInputElement).value);
  };

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
  };

  return (
    <div className="bg-black">
      {/* 背景 */}
      <div className="z-1 absolute left-0 top-0">
        <Image
          src={"/post/background.webp"}
          alt="landing background"
          width={1920}
          height={1080}
        />
      </div>
      {/* 导航栏 */}

      {/* post detail */}
      {postData && (
        <div className="flex">
          <div className="z-10 w-2/3">
            {/* Post Content */}

            <div className="mx-4 flex flex-col items-center rounded-[24px] border-2 border-primary bg-black p-4 opacity-100">
              {/* cover image */}
              {postData.images && postData.images.length > 0 && (
                <div>
                  <Image
                    src={postData.images[0] ?? ""}
                    alt="cover image"
                    width="0"
                    height="0"
                    sizes="100vw"
                    className="max-h-80 w-full rounded"
                  ></Image>
                </div>
              )}
              <div className="w-2/3 text-light">
                <div className="mt-2 self-start font-second text-3xl text-primary">
                  {postData.title}
                </div>
                <div className="m-2 flex justify-between text-primary">
                  <Image
                    className="inline-block"
                    src="/origin/author.png"
                    alt="author avatar"
                    width={96}
                    height={20}
                  ></Image>
                  <div>
                    <Image
                      className="mr-1 inline-block"
                      src="/likeIcon.png"
                      alt=""
                      width={20}
                      height={20}
                    ></Image>
                    {postData.likeNum}
                  </div>
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
                <div className="mt-2 flex justify-between">
                  <div className="text-darkGray">{postData.createTime}</div>
                  <div className="flex font-second text-primary">
                    <div>
                      <button
                        onClick={() => {
                          void handleLikeClick();
                        }}
                      >
                        {ifLike ? (
                          <Image
                            className="mr-1 inline-block"
                            src="/likeIcon.png"
                            alt=""
                            width={20}
                            height={20}
                          ></Image>
                        ) : (
                          <Image
                            className="mr-1 inline-block"
                            src="/likeIconFilled.png"
                            alt=""
                            width={20}
                            height={20}
                          ></Image>
                        )}
                        {postData.likeNum}
                      </button>
                    </div>
                    <div className="ml-2">
                      <button>
                        <Image
                          className="mr-1 inline-block"
                          src="/commentIcon.png"
                          alt=""
                          width={20}
                          height={20}
                        ></Image>
                        {postData.comments.length}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Post Ideas */}
            <div className="m-4 flex flex-col items-center divide-y-2 divide-primary rounded-[24px] border-2 border-primary bg-black p-4 opacity-100">
              {/* add comment */}
              <div className="my-4 w-2/3">
                <form
                  onSubmit={handleIdeaSubmit}
                  className="flex justify-between"
                >
                  <input
                    type="text"
                    value={commentText}
                    onChange={handleCommentTextChange}
                    placeholder="DROP YOUR IDEA!"
                    className="mr-3 w-2/3 appearance-none border-b border-primary bg-transparent px-2 py-1 leading-tight text-light focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="rounded bg-primary px-4 py-2 font-bold text-black"
                  >
                    DROP
                  </button>
                </form>
              </div>
              {/* display comment */}
              <Idea ideaData={postData.comments} />
            </div>

            {/* button group */}
            <div className="fixed bottom-10 left-10">
              <button>
                <Image
                  src="/lastBtn.png"
                  alt=""
                  width="0"
                  height="0"
                  sizes="100vw"
                  className="h-auto w-[96px]"
                ></Image>
                {/* <Image src="/lastBtn.png" alt="" fill={true}></Image> */}
              </button>
            </div>
            <div className="fixed bottom-10 end-1/3">
              <button>
                <Image
                  src="/nextBtn.png"
                  alt=""
                  width="0"
                  height="0"
                  sizes="100vw"
                  className="h-auto w-[96px]"
                ></Image>
              </button>
            </div>
          </div>
          <div className="z-10 mr-8 w-1/3 divide-y divide-primary p-4">
            {/* Inspired by */}
            <div className="font-second text-3xl text-primary">
              <Image
                src="/inspiredIcon.png"
                alt=""
                width="0"
                height="0"
                sizes="100vw"
                className="inline-block h-auto w-[30px]"
              ></Image>{" "}
              INSPIRED BY
            </div>
            {/* Forked */}
            <div className="font-second text-3xl text-primary">
              <Image
                src="/branchIcon.png"
                alt=""
                width="0"
                height="0"
                sizes="100vw"
                className="inline-block h-auto w-[30px]"
              ></Image>{" "}
              FORKED BRANCHES
            </div>
          </div>
          <div className="fixed bottom-10 right-56 z-10">
            <button className="rounded border-2 border-primary bg-black px-4 py-2 font-bold text-primary">
              Drop Idea
            </button>
            <button
              className="rounded bg-primary px-4 py-2 font-bold text-black"
              onClick={handleForkButtonClick}
            >
              +Fork Post
            </button>
          </div>
        </div>
      )}

      <Footer />

      {showEditor && (
        <div
          className={
            showEditor
              ? "fixed inset-0 z-50 flex items-center justify-around bg-black/[.5]"
              : ""
          }
        >
          {/* editor card */}
          <div className="flex h-3/4 w-1/2 flex-col items-center rounded-[54px] border-2 border-primary bg-black p-4 opacity-100">
            <div className="flex w-full justify-between">
              <div className="font-second text-3xl text-primary">
                CREATE POST
              </div>
              <div>
                <button onClick={handleCloseButtonClick}>
                  <Image
                    src="/close.png"
                    alt="close button"
                    width={50}
                    height={50}
                  />
                </button>
              </div>
            </div>
            <div className="mx-4 my-2 rounded bg-primary px-4">
              <span className="text-sm leading-4">
                The platform is providing a subsidy of 2.8 metics as a reward to
                per layer of post where your inspired idea came from. T&C
                applied.
              </span>
              <button
                className="inline-block"
                onClick={handleMoreInfoButtonClick}
              >
                <Image
                  src="/moreInfo.png"
                  alt="more info"
                  width={56}
                  height={16}
                ></Image>
              </button>
            </div>
            <Editor />
            <div className="mt-16 self-end">
              <button
                className="rounded-lg bg-primary p-2"
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onClick={handlePost}
              >
                <Image
                  src="/postBtn.png"
                  alt="post button"
                  width={96}
                  height={24}
                />
              </button>
            </div>
          </div>
          {/* more info card */}
          {showMore && <InfoCard handleCloseInfoClick={handleCloseInfoClick} />}
        </div>
      )}
    </div>
  );
};

export default PostDetail;
