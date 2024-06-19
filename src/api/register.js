import axios from "./interceptors.js"

export const register = (data) => {
    const url = '/auth/register'
    const config = {
        method: 'post',
        url: url,
        data:data,
        headers: {
            'Content-Type': 'application/json',
        }
    }
    return axios(config)
}