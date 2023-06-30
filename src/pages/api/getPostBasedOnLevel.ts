// http://101.200.91.164:8080/post/getPostBasedOnLevel?level=1&postId=1-13

import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    try {
      const { level, postId } = req.query;
      const response = await axios.get(`http://101.200.91.164:8080/post/getPostBasedOnLevel?level=${level}&postId=${postId}`);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const posts = (response.data as PostRes).data;
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }