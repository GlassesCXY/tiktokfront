import axios from './interceptors.js';

// 获取当前用户上传的视频，支持分页
export const getMyVideo = (offset, limit) => {
    const url = `/user/videos?offset=${offset}&limit=${limit}`;
    const config = {
        method: 'get',
        url: url,
    };
    return axios(config);
}
