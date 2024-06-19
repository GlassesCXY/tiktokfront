import axios from "./interceptors.js"

export const getUrl = (vid) => {
    const url = '/getUrl'+'?vid='+vid
    const config = {
        method: 'post',
        url: url,
    }
    return axios(config)
}