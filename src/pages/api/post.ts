import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    try {
      const reqObj = req.body as PostMetadata;
      const response = await axios.post("http://101.200.91.164:8080/post/followPost", reqObj);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const metadataUrl = response.data;
      res.status(200).json(metadataUrl);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }