import axios, {AxiosInstance, AxiosRequestConfig} from "axios";

export const KEY = "c5344dd122266faddd452f3bee6dcda9";
const API_SERVER_URL = 'https://api.themoviedb.org';

const config: AxiosRequestConfig = {
    baseURL: API_SERVER_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
};

const api: AxiosInstance = axios.create(config);

export default api;
