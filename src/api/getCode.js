import axios from "./interceptors.js"

export const getCode = (data) => {
    const url = '/auth/sendRegisterCode'
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