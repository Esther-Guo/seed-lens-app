type PostRes = {
    code: number;
    data: PostStruct;
    msg: string;
};

interface PostStruct {
    comments: IdeaStruct[];
    content: string;
    createTime: string;
    id: number | null;
    images: string[];
    inspirationId: string;
    likeNum: number | null;
    postId: string;
    profileId: number | null;
    title: string;
}

type IdeaStruct = {
    content: string;
    createTime: string;
    id: number;
    likeNum: number;
    postPointId: string;
}

type PostMetadata = {
    metadataId?: string,
    inspirationId?: string,
    content: string,
    image?: string[],
    title?: string,
    postId?: number,
    postPointId?: string | null,
    profileId: number,
    profilePointId?: number,
    type: number, //0-帖子 1-评论
}

interface uploadImageReq {
    img: string
}

interface uploadImageRes {
    code: number;
    data: {msg: string};
    msg: string;
}

interface axiosRes {
    code: number;
    data: any;
}

interface likePostRes {
    code: number;
    data: {
        id: number;
        profileId: number;
        ifLike: number;
        likeNum: number;
    }
    msg: string
}

interface addPubIdReq {
    id: number;
    psotId: string;
}