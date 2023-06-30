import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export interface PostCreateRequest {
    id: number;
    profileId: number;
  }

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    try {
      const { id, profileId } = req.body as PostCreateRequest;
    //   const response = await axios.post("http://101.200.91.164:8080/post/like?id=1&profileId=1");
      const response = await axios.post(`http://101.200.91.164:8080/post/like?id=${id}&profileId=${profileId}`);
      const likeRes = (response.data as PostRes).data;
      res.status(200).json(likeRes);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }