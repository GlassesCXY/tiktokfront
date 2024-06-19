import axios from "./interceptors.js"

export const getRecommend = () => {
    const url = '/getRecommend'
    const config = {
        method: 'GET',
        url: url,
    }
    return axios(config)
}