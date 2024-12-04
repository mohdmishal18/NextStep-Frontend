import axios, {AxiosInstance} from "axios";

const baseURL = import.meta.env.VITE_BASE_URL

const API: AxiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
})

export default API