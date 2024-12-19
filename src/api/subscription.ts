import axios, { AxiosError, AxiosResponse } from "axios";
import API from "../service/axios";
import errorHandle from "./errorHandling";
import subscriptionRoutes from "@/service/endPoints/subscriptionEndpoints";
import { Subscription,SubscriptionFormProps } from "@/Types/SubscriptionTypes";

export const fetchSubscription = async ():Promise<Subscription[]> => {
    try {
        const response: AxiosResponse<Subscription[]> = await API.get(subscriptionRoutes.getSubscription)
        return response.data;
    } catch (error) {
        const err = error as AxiosError; 
        errorHandle(err);
        throw err;
    }
}

//create
export const createSubscription = async (data: SubscriptionFormProps): Promise<Subscription> => {
    try {
        const response = await API.post(subscriptionRoutes.createSubscription, data)
        return response.data
    } catch (error) {
        const err = error as AxiosError; 
        errorHandle(err);
        throw err;
    }
}