import axios from './interceptors.js';

// 点赞视频
export const likeVideo = (videoId) => {
    const url = `/likes/video/${videoId}`;
    const config = {
        method: 'post',
        url: url,
    };
    return axios(config);
}
