import axios from './interceptors.js';

// 删除指定视频
export const deleteVideo = (vid) => {
    const url = `/video/${vid}`;
    const config = {
        method: 'delete',
        url: url,
    };
    return axios(config);
}
