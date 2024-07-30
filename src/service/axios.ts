import axios, {AxiosInstance} from "axios";

const baseURL = "http://localhost:5000/api"

const API: AxiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
})

export default API