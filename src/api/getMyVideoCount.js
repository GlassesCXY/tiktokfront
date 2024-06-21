import axios from './interceptors.js';


export const getMyVideoCount = () => {
    const url = `/videos/count`;
    const config = {
        method: 'get',
        url: url,
    };
    return axios(config);
}
