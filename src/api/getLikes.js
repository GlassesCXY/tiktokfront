import axios from './interceptors.js';

// 获取视频点赞数
export const getLikeCount = (videoId) => {
    const url = `/likes/count/video/${videoId}`;
    const config = {
        method: 'get',
        url: url,
    };
    return axios(config);
}
