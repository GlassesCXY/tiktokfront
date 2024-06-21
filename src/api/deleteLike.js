import axios from './interceptors.js';

// 取消点赞视频
export const cancelLikeVideo = (videoId) => {
    const url = `/likes/video/${videoId}`;
    const config = {
        method: 'delete',
        url: url,
    };
    return axios(config);
}
