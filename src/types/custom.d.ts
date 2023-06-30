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
    inspirationId: number | null;
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
    inspirationId?: number,
    content: string,
    image?: string[],
    title?: string,
    postId?: number,
    postPointId?: string | null,
    profileId: number,
    profilePointId?: number,
    type: number, //0-帖子 1-评论
}