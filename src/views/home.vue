<template>
  <div>
      <van-swipe
              :loop="false"
              vertical
              :height="height"
              :width="width"
              :show-indicators="false"
              @change="onChange"
              :style="{ height: height + 'px' }"
      >
          <van-swipe-item v-for="(item, index) in videoList" :key="index" class="swiperItem" >
              <div @click="onVideoClick(item, index)" z-index="1" class="swiperItemVideo">
                  <video
                          class="videoPlayer"
                          :id="'videoPlayer_' + index"
                          ref="player"
                          :key="index"
                          :autoplay="true"
                          :controls="false"
                          :height="height"
                          :width="width"
                          :src="item.src"
                          :muted="false"
                          :loop="true"
                          preload="preload"
                          language="zh-CN"
                          x5-video-player-type="h5"
                          x5-video-player-fullscreen="true"
                          x5-video-player-style="position:fixed;z-index:0;"
                          x5-video-orientation="portraint"
                          playsinlin
                          z-index="0"
                  ></video>
              </div>
          </van-swipe-item>
      </van-swipe>
      <div class="heart-container" @click="toggleLike">
          <svg
              class="heart-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              :fill="isLiked ? 'red' : 'white'"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
          >
              <path
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              />
          </svg>
          <span class="like-count">{{ likeCount }}</span>
      </div>
      <Footer/>
  </div>
</template>

<script setup>
import {ref, onMounted, onBeforeUnmount, markRaw} from "vue";
import { showToast, showNotify, showConfirmDialog } from "vant";
import Footer from "@/components/Footer.vue";
import {getRecommend} from "@/api/getRecommend.js";
import {getUrl} from "@/api/getUrl.js";
import {view} from "@/api/view.js";
import {isLogin} from "@/api/isLogin.js";
import {useRouter} from "vue-router";
import {getLikeCount} from "@/api/getLikes.js";
import {getVideoLikedStatus} from "@/api/getLikeStatus.js";
import {likeVideo} from "@/api/addLike.js";
import {cancelLikeVideo} from "@/api/deleteLike.js";

const player = ref(null);
const currentIndex = ref(0);
const playing = ref(true);
const width = ref(window.innerWidth);
const height = ref(window.innerHeight - 50);
const noMoreFlag = ref(false);
const commentList = ref([]);
const starCount = ref(Math.ceil(Math.random() * 1000));
const shareCount = ref(Math.ceil(Math.random() * 1000));
const currentVideoInfo = ref({});
const router = useRouter();


const isLiked = ref(false);
const likeCount = ref(0); // 初始点赞数

const toggleLike = async () => {
    console.log(currentIndex.value);
    console.log(videoList.value[currentIndex.value]);
    if (!isLiked.value) {
        const res = await likeVideo(videoList.value[currentIndex.value].vid);
        if(res.data.code==200){
            isLiked.value = !isLiked.value
            likeCount.value = Number(likeCount.value)+1;
        }

    } else {
        const res = await cancelLikeVideo(videoList.value[currentIndex.value].vid);
        if(res.data.code==200){
            isLiked.value = !isLiked.value
            likeCount.value = Number(likeCount.value)-1;
        }
    }
};

/**
 * 切换视频
 */
const onChange = async (index) => {
    console.log(index);
    console.log(videoList.value.length);
    const vid1 = videoList.value[index].vid;
    if(index==videoList.value.length-1) {
        const viw1 = await view(vid1);
        const res2 = await getRecommend();
        const vid2 = res2.data.data;
        const url2 = await getUrl(vid2);
        const src2 = url2.data.data;
        videoList.value.push({
            vid: vid2,
            src: src2
        })
    }
    commentList.value = [];currentVideoInfo.value = {};
    const preVideoId = "videoPlayer_" + currentIndex.value;
    const preVideo = document.getElementById(preVideoId);
    if (preVideo) preVideo.pause();
    const nextVideoId = "videoPlayer_" + index;
    const nextVideo = document.getElementById(nextVideoId);
    if (nextVideo) nextVideo.play();
    currentIndex.value = index;
    player.value = nextVideo;
    getVideoCount(videoList.value[index]);
    const count = await getLikeCount(vid1);
    likeCount.value = count.data.data.count;
    const liked = await getVideoLikedStatus(vid1);
    isLiked.value = liked.data.data.status;
    if (index == videoList.value.length - 1) {
        showNotify({ type: "danger", message: "没有更多了..." });
        noMoreFlag.value = true;
        showToast("到底了！");
        return false;
    }
};
/**
 * 获取视频信息
 */
const getVideoCount = (videoInfo) => {
    likeCount.value = Math.ceil(Math.random() * 10000);
    starCount.value = Math.ceil(Math.random() * 1000);
    shareCount.value = Math.ceil(Math.random() * 1000);
};
/**
 * 播放|暂停
 */
const onVideoClick = (item, index) => {
    const video = document.getElementById("videoPlayer_" + index);
    if (video && playing.value) {
        video.pause();
        playing.value = false;
        showToast("已暂停播放");
    } else {
        video.play();
        playing.value = true;
        showToast("继续播放");
    }
};

const videoInit = async () =>{
    try {
        const islogin = await isLogin();
        if(islogin.data.msg !=="当前客户端是否登录：true"){
            router.push("/login");
            return;
        }
        const res1 = await getRecommend();
        const vid1 = res1.data.data;
        const url1 = await getUrl(vid1);
        const src1 = url1.data.data;
        const count = await getLikeCount(vid1);
        likeCount.value = count.data.data.count;
        const liked = await getVideoLikedStatus(vid1);
        isLiked.value = liked.data.data.status;
        videoList.value.push({
            vid:vid1,
            src:src1
        });
        const viw1 = await view(vid1);
        const res2 = await getRecommend();
        const vid2 = res2.data.data;
        const url2 = await getUrl(vid2);
        const src2 = url2.data.data;
        videoList.value.push({
            vid:vid2,
            src:src2
        });
    }catch (err){
        alert(err)
    }

}

const initializeVideos = async () => {
    await videoInit(); // 等待 videoInit 完成
    const index = currentIndex.value;
    const videos = document.querySelectorAll("video");
    for (const video of videos) {
        console.log(1);
        let videoId = "videoPlayer_" + index;
        if (video && video.id && video.id != videoId) {
            video.pause();
        } else {
            player.value = video;
        }
    }
};

onMounted(() => {
    initializeVideos();
});

onBeforeUnmount(() => {
    const videos = document.querySelectorAll("video");
    for (const video of videos) {
        if (video && video.id) {
            video.pause();
        }
    }
});

/**
 * 短视频列表
 */
const videoList = ref([]);
</script>
<style scoped>
.videoInfo {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    color: #f5f5f5;
    padding: 5px;
    text-align: left;
}
.videoAuthor {
    font-size: 15px;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-wrap: break-word;
    display: -webkit-box;
    overflow: hidden;
}
.videoTitle {
    font-size: 13px;
    max-height: 50px;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    word-wrap: break-word;
    display: -webkit-box;
    overflow: hidden;
}
.swiperItem {
    z-index: 9;
}
.swiperItemVideo {
    z-index: 1;
}
.videoPlayer {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    object-fit: cover;
    object-position: center;
    z-index: 0;
}

.rightView {
    position: absolute;
    right: 0;
    top: 35%;
    bottom: 25%;
    width: 50px;
    color: #f5f5f5;
    text-align: center;
    font-size: 15px;
    line-height: 50px;
}

.rightView > div {
    margin: 15px auto;
    text-align: center;
    color: #f5f5f5;
    line-height: 15px;
}
.userAvatar {
    display: flex;
    width: 40px;
    height: 40px;
    background: aliceblue;
    border-radius: 100%;
    align-items: center;
    justify-content: center;
    object-fit: cover;
}
.addFollowIcon {
    position: absolute;
    top: 45px;
    left: 17px;
    width: 13px;
    height: 13px;
    padding: 3px;
    border-radius: 100%;
    background-color: #ff0000;
    color: #fff;
}
.viewPopup {
    background-color: #f5f5f5;
}
.videoCommentTitle {
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 40px;
    color: #464646;
}
.videoCommentInput {
    position: absolute;
    background-color: #f5f5f5;
    width: 100%;
    bottom: 0;
    color: #464646;
}
.van-cell {
    background-color: #f5f5f5;
    color: #464646;
}
::v-deep .van-field__control {
    color: #464646;
}
::v-deep .van-share-sheet__cancel {
    background-color: #f5f5f5;
}
::v-deep .van-popup {
    background-color: #f5f5f5;
}
::v-deep .van-share-sheet__cancel:before {
    background-color: #f5f5f5;
}

.heart-container {
    position: fixed;
    top: 50%;
    right: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    transform: translateY(-50%);
    user-select: none;
}

.heart-icon {
    width: 40px;
    height: 40px;
    transition: fill 0.3s;
}

.like-count {
    margin-top: 8px;
    font-size: 14px;
    color: #ffffff;

}
</style>