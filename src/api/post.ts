import API from "../service/axios";
import errorHandle from "./errorHandling";

//routes
import { postRoutes } from "../service/endPoints/postEndpoints";

import { postForm } from "../Types/postTypes";


export const createPost = async (postData: postForm) => {
    try {
        const res = await API.post(postRoutes.CreatePost, postData)
        return res
    } catch (error) {
        const err: Error = error as Error;
        errorHandle(err);
        throw err;
    }
}

export const getAllPosts = async () => {
    try {
        const res = await API.get(postRoutes.GetAllPosts)
        return res
    } catch (error) {
        const err: Error = error as Error;
        errorHandle(err);
        throw err;
    }
}

export const GetUserPosts = async (userid : string) => {
    try {
        const res = await API.post(postRoutes.getUserPosts, {userid})
        return res
    } catch (error) {
        const err: Error = error as Error;
        errorHandle(err);
        throw err;
    }
}

export const DeletePost = async (id : string, publicId: string) => {
    try {
        const res = await API.post(postRoutes.deletePost, {id, publicId})
        return res
    } catch (error) {
        const err: Error = error as Error;
        errorHandle(err);
        throw err;
    }
}


export const editPost = async (postData: Partial<postForm>) => {
    try {
        const res = await API.put(postRoutes.EditPost, postData)
        return res
    } catch (error) {
        const err: Error = error as Error;
        errorHandle(err);
        throw err;
    }
}


export const likePost = async(userid: string, postid: string) => {
    try {
        const res = await API.post(postRoutes.LikePost, {userid, postid})
        return res
    } catch (error) {
        
    }
}

export const UnLikePost = async(userid: string, postid: string) => {
    try {
        const res = await API.post(postRoutes.LikePost, {userid, postid})
        return res
    } catch (error) {
        
    }
}


export const reportPost = async (postid: string, userid: string, reason: string) => {
    try {
        const res = await API.post(postRoutes.ReportPost, { postid, userid, reason });
        return res;
    } catch (error) {
        const err: Error = error as Error;
        errorHandle(err);
        throw err;
    }
};

export const getReports = async () => {
    try {
        const res = await API.get(postRoutes.ReportPost);
        return res;
    } catch (error) {
        const err: Error = error as Error;
        errorHandle(err);
        throw err;
    }
};

export const hidePost = async (postid: string, status: boolean) => {
    try {
        const res = await API.post(postRoutes.HidePost, {postid, status});
        return res;
    } catch (error) {
        const err: Error = error as Error;
        errorHandle(err);
        throw err;
    }
};