import axios from "./interceptors.js"

export const upload = (data) => {
    const url = '/upload'
    const config = {
        method: 'post',
        url: url,
        data:data,
        headers:{'Content-Type':'multipart/form-data'}
    }
    return axios(config)
}