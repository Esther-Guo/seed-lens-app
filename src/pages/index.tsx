import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Navi from "~/components/Navi";
import { number, string } from "zod";
import { useState } from "react";
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
    const imageUrl = images[index];
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
        <div className="h-[1062px]">
          {/* 导航栏 */}
          <Navi />
          {/* post show */}       
          <div className="image-list grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
            {images.map((image, index) => (
              <div
                key={index}
                className={`image-item relative w-100 h-100 overflow-hidden transition-transform duration-300 transform hover:scale-110`}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={() => handleMouseLeave}
              >
                <img src={image} alt={`Image ${index + 1}`}  className="w-full h-full object-cover" />
              </div>
            ))}

            {currentImageUrl && (
              <div className="centered-box fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-100 h-100  bg-green text-black p-4 text-center rounded-2xl z-20">
                <img src={currentImageUrl} alt="Highlighted Image" className="w-66 h-66 object-cover rounded-lg mb-2" />
                {/* <p> {currentImageUrl}</p> */}
                <p>这是标题</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageList;
