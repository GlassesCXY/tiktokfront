import axios from "./interceptors.js"

export const view = (vid) => {
    const url = '/view'+'?vid='+vid
    const config = {
        method: 'post',
        url: url,
    }
    return axios(config)
}