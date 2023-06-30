import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    try {
        // console.log(req.body)
      const reqObj = req.body;
      
      const response = await axios.post("http://101.200.91.164:8080/post/insertPostId", reqObj);
      console.log(response.data)
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }