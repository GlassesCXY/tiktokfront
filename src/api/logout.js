import axios from "./interceptors.js"

export const logout = () => {
    const url = '/auth/logout'
    const config = {
        method: 'post',
        url: url,
    }
    return axios(config)
}