import React, { useState } from 'react';
import ReactQuill from 'react-quill';


import { useAtom } from "jotai";
import { postContentAtom } from "~/config/atom";

const modules = {
    toolbar: [
    //   [{ 'header': false }],
      ['bold', 'italic', 'code-block'],
      ['image']
    ],
  }
const formats = [
    'header',
    'bold', 'italic', 'code-block',
    'image'
  ]

const Editor = () => {
  const [postContent, setPostContent] = useAtom(postContentAtom);

  return <ReactQuill theme="snow" modules={modules} formats={formats} value={postContent} onChange={setPostContent} className="text-white w-full grow"/>;
}

export default Editor;
