import axios, { AxiosError, AxiosResponse } from "axios";
import API from "../service/axios";
import errorHandle from "./errorHandling";
//endpoints
import blogRoutes from "../service/endPoints/blogEndpoints";
//interfaces
import { blog, BlogFormProps } from "../Types/blogTypes";


//fetch
export const fetchBlog = async ():Promise<blog[]> => {
    try {
        const response: AxiosResponse<blog[]> = await API.get(blogRoutes.getBlog)
        return response.data;
    } catch (error) {
        const err = error as AxiosError; 
        errorHandle(err);
        throw err;
    }
}

export const fetchBlogById = async (id: string):Promise<blog> => {
    try {
        const response: AxiosResponse<blog> = await API.get(`${blogRoutes.getBlog}${id}`)
        return response.data;
    } catch (error) {
        const err = error as AxiosError; 
        errorHandle(err);
        throw err;
    }
}

//create
export const createBlog = async (data: BlogFormProps): Promise<blog> => {
    try {
        const response = await API.post(blogRoutes.createBlog, data)
        return response.data
    } catch (error) {
        const err = error as AxiosError; 
        errorHandle(err);
        throw err;
    }
}