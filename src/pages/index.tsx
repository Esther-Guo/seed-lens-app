import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Navi from "~/components/Navi";
import { number, string } from "zod";
import { useState } from "react";
import axios from "axios";

interface Img {
  images: string[];
  title: string;
}

let imgList:Img[] = []

async function getImg() {
  const response = await axios.post(`/post/getRandomPost`);
  if(response.data.code === 200) {
    imgList = response.data.data
  } else {
    console.log(response.data.message)
  }
}
getImg()
const ImageList = () => {
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(null);



  
  
  const images: string[] = [
    "https://wechat-1258682338.cos.ap-beijing.myqcloud.com/2019-11-06/c56ceb280f4d43f795f02f245bf3765a.jpg",
    "https://wechat-1258682338.cos.ap-beijing.myqcloud.com/20191115/13df59de804248e7bc3f9547f1ea64c3.jpg",
    "https://wechat-1258682338.cos.ap-beijing.myqcloud.com/20191115/1b90f8eb0d194e52aca4b8748544f0f8.jpeg",
    "https://wechat-1258682338.cos.ap-beijing.myqcloud.com/2019-11-06/c56ceb280f4d43f795f02f245bf3765a.jpg",
    "https://wechat-1258682338.cos.ap-beijing.myqcloud.com/20191115/13df59de804248e7bc3f9547f1ea64c3.jpg",
    "https://wechat-1258682338.cos.ap-beijing.myqcloud.com/20191115/1b90f8eb0d194e52aca4b8748544f0f8.jpeg",
    "https://wechat-1258682338.cos.ap-beijing.myqcloud.com/2019-11-06/c56ceb280f4d43f795f02f245bf3765a.jpg",
    "https://wechat-1258682338.cos.ap-beijing.myqcloud.com/20191115/13df59de804248e7bc3f9547f1ea64c3.jpg",

    "https://wechat-1258682338.cos.ap-beijing.myqcloud.com/2019-11-06/c56ceb280f4d43f795f02f245bf3765a.jpg",
    "https://wechat-1258682338.cos.ap-beijing.myqcloud.com/20191115/13df59de804248e7bc3f9547f1ea64c3.jpg",
    "https://wechat-1258682338.cos.ap-beijing.myqcloud.com/20191115/1b90f8eb0d194e52aca4b8748544f0f8.jpeg",
    "https://wechat-1258682338.cos.ap-beijing.myqcloud.com/2019-11-06/c56ceb280f4d43f795f02f245bf3765a.jpg",
    "https://wechat-1258682338.cos.ap-beijing.myqcloud.com/20191115/13df59de804248e7bc3f9547f1ea64c3.jpg",
    "https://wechat-1258682338.cos.ap-beijing.myqcloud.com/20191115/1b90f8eb0d194e52aca4b8748544f0f8.jpeg",
    "https://wechat-1258682338.cos.ap-beijing.myqcloud.com/2019-11-06/c56ceb280f4d43f795f02f245bf3765a.jpg",
    "https://wechat-1258682338.cos.ap-beijing.myqcloud.com/20191115/13df59de804248e7bc3f9547f1ea64c3.jpg",

    "https://wechat-1258682338.cos.ap-beijing.myqcloud.com/2019-11-06/c56ceb280f4d43f795f02f245bf3765a.jpg",
    "https://wechat-1258682338.cos.ap-beijing.myqcloud.com/20191115/13df59de804248e7bc3f9547f1ea64c3.jpg",
    "https://wechat-1258682338.cos.ap-beijing.myqcloud.com/20191115/1b90f8eb0d194e52aca4b8748544f0f8.jpeg",
    "https://wechat-1258682338.cos.ap-beijing.myqcloud.com/2019-11-06/c56ceb280f4d43f795f02f245bf3765a.jpg",
    "https://wechat-1258682338.cos.ap-beijing.myqcloud.com/20191115/13df59de804248e7bc3f9547f1ea64c3.jpg",
    "https://wechat-1258682338.cos.ap-beijing.myqcloud.com/20191115/1b90f8eb0d194e52aca4b8748544f0f8.jpeg",
    "https://wechat-1258682338.cos.ap-beijing.myqcloud.com/2019-11-06/c56ceb280f4d43f795f02f245bf3765a.jpg",
    "https://wechat-1258682338.cos.ap-beijing.myqcloud.com/20191115/13df59de804248e7bc3f9547f1ea64c3.jpg",
  ];

  const handleMouseEnter = (index: number) => {
    const imageUrl = imgList[index];
    setCurrentImageUrl(imageUrl);
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
            {imgList.length > 0 ? imgList.map((image, index) => (
              <div
                key={index}
                className="image-item relative w-320 h-320 flex justify-center align-center overflow-hidden transition-transform duration-300 transform hover:scale-110"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave}
              ><img src={image ? image.images[0] : ''} alt={`Image ${index + 1}`}  className="w-full object-cover" />
              </div>
            )):''}
            {currentImageUrl && (
              <div className="centered-box fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-hidden max-h-600 bg-green text-black text-center rounded-2xl z-20">
                <img src={currentImageUrl.images && currentImageUrl.images[0]} alt="Highlighted Image" className="max-h-500 object-fill rounded-lg mb-2" />
                {/* <p> {currentImageUrl}</p> */}
                <p>{currentImageUrl.title}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageList;
