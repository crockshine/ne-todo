import axios, {AxiosInstance, AxiosResponse, InternalAxiosRequestConfig} from "axios"

const axiosInstance: AxiosInstance = axios.create({
    baseURL: process.env.BACKEND_URL || 'http://localhost:8000'
})

axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        config.withCredentials = true
        const token = localStorage.getItem("accessToken")
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    }
)

axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        const token: string | undefined = response.data.accessToken || undefined
        if (token) {
            window.localStorage.setItem("accessToken", token)
        }

        return response
    }
)


export default axiosInstance

