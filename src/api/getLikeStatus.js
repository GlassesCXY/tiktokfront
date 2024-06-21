import axios from './interceptors.js';

// 获取视频点赞状态
export const getVideoLikedStatus = (videoId) => {
    const url = `/likes/isLiked/${videoId}`;
    const config = {
        method: 'get',
        url: url,
    };
    return axios(config);
}
