import axios from "./interceptors.js"

export const login = (data) => {
    const url = '/auth/login'
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