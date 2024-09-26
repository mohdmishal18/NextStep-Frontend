import API from "../service/axios";
import errorHandle from "./errorHandling";

//routes
import { commentRoutes } from "../service/endPoints/commentEndpoints";



export const createComment = async (postid: string, content: string, userid: string) => {
    try {
        const res = await API.post(commentRoutes.CreateComment, {postid, content, userid})
        return res
    } catch (error) {
        const err: Error = error as Error;
        errorHandle(err);
        throw err;
    }
}

export const getComment = async (postid: string) => {
    try {
        const res = await API.get(`${commentRoutes.GetComments}/${postid}`)
        return res
    } catch (error) {
        
    }
}