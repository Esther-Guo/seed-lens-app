import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Navi from "~/components/Navi";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAtom } from "jotai";
import {
  type Img,
  type ServerResponse,
  mainPageImgListAtom,
} from "~/config/atom";
import { serverURL } from "~/config/server";

const ImageList: NextPage = () => {
  const [currentImageUrl, setCurrentImageUrl] = useState<Img | null>(null);
  const [imgList, setImgList] = useAtom(mainPageImgListAtom);

  useEffect(() => {
    async function getImg() {
      const response = await axios.post<ServerResponse>(
        `${serverURL}/post/getRandomPost`
      );
      if (response.data.code === 200) {
        setImgList(response.data.data);
      } else {
        console.warn(response.data.msg);
      }
    }
    getImg().catch((err) => {
      console.error(err);
    });
  }, []);

  const handleMouseEnter = (index: number) => {
    const image = imgList[index];
    if (!image) return;
    setCurrentImageUrl(image);
  };

  const handleMouseLeave = () => {
    setCurrentImageUrl(null);
  };
  return (
    <>
      <Head>
        <title>SEED</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg-black">
        <div>
          {/* 导航栏 */}
          <Navi />
          {/* post show */}
          <div className="image-list grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
            {imgList.length > 0
              ? imgList.map((image, index) => (
                  <div
                    key={index}
                    className="image-item align-center relative flex h-320 w-320 transform justify-center overflow-hidden transition-transform duration-300 hover:scale-110"
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={() => handleMouseLeave}
                  >
                    <img
                      src={image ? image.images[0] : ""}
                      alt={`Image ${index + 1}`}
                      className="w-full object-cover"
                    />
                  </div>
                ))
              : ""}
            {currentImageUrl && (
              <div className="centered-box fixed left-1/2 top-1/2 z-20 max-h-600 -translate-x-1/2 -translate-y-1/2 transform overflow-hidden rounded-2xl bg-green text-center text-black">
                <Link href={`/posts/${currentImageUrl.postId}`}>
                  <img
                    src={currentImageUrl.images && currentImageUrl.images[0]}
                    alt="Highlighted Image"
                    className="mb-2 max-h-500 rounded-lg object-fill"
                  />
                  <p>{currentImageUrl.title}</p>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageList;
