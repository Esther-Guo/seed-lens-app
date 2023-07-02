import React, { useEffect, useRef } from "react";
import ReactQuill from "react-quill";

import { useAtom } from "jotai";
import { postContentAtom } from "~/config/atom";

const modules = {
  toolbar: [
    //   [{ 'header': false }],
    ["bold", "italic"],
    ["image"],
  ],
};
const formats = ["header", "bold", "italic", "image"];

const Editor = () => {
  const quillRef = useRef<ReactQuill | null>(null); // Quill instance
  const reactQuillRef = useRef<ReactQuill | null>(null); // ReactQuill component

  const [postContent, setPostContent] = useAtom(postContentAtom);

  const handleContentChange = (value: string) => {
    setPostContent(value);
    // const imgs = Array.from(
    //   value.matchAll(/img[src^=\"data:\"]/)
    // );
    // for (const img of imgs) {
    //   img.classList.add("loading");
    //   img.setAttribute("src", await uploadBase64Img(img.getAttribute("src")));
    //   img.classList.remove("loading");
    // }
    console.log(value);
    // console.log(imgs)
  };

  const attachQuillRefs = (): void => {
    if (reactQuillRef.current) {
      if (typeof reactQuillRef.current.getEditor !== "function") return;
      quillRef.current = reactQuillRef.current;
    }
  };

  useEffect(() => {
    attachQuillRefs();
  }, []);

  return (
    <ReactQuill
      ref={(el) => {
        reactQuillRef.current = el;
      }}
      theme="snow"
      modules={modules}
      formats={formats}
      value={postContent}
      onChange={handleContentChange}
      className="h-3/5 w-full text-white"
    />
  );
};

export default Editor;
