import axios from "./interceptors.js"

export const isLogin = () => {
    const url = '/auth/isLogin'
    const config = {
        method: 'post',
        url: url,
    }
    return axios(config)
}