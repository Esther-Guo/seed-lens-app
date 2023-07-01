import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    try {
        // console.log(req.body)
      const {img} = req.body as uploadImageReq;
      
      const response:uploadImageRes = await axios.post("http://101.200.91.164:8080/image/uploada", img);
    //   console.log(response.data)
      res.status(200).json(response.data.msg);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }