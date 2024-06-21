<template>
    <view>
        <view class="tab-bar">
            <view class="tab-bar-item" @click="toRecommend">
                <text class="tab-text">推荐</text>
            </view>
            <view class="tab-bar-item center-button" @click="toUpload">
                <svg class="tab-icon" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" fill="none" stroke="white" stroke-width="2" />
                    <path d="M12 8v8m4-4H8" stroke="white" stroke-width="2" stroke-linecap="round" />
                </svg>
            </view>
            <view class="tab-bar-item" @click="toMine">
                <text class="tab-text">我的</text>
            </view>
        </view>
    </view>
</template>

<script setup>

    import {isLogin} from "@/api/isLogin.js";
    import {useRouter} from "vue-router";

    const router = useRouter();
    const toMine = async ()=>{
        const result = await isLogin();
        if(result.data.msg =="当前客户端是否登录：true"){
            router.push('/myVideos');
        }else{
            router.push('/login');
        }
    }

    const toRecommend = () =>{
        router.push("/");
    }

    const toUpload = async ()=>{
        const result = await isLogin();
        if(result.data.msg =="当前客户端是否登录：true"){
            router.push('/upload');
        }else{
            router.push('/login');
        }
    }


</script>

<style scoped>
.tab-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #000;
    color: #fff;

}

.tab-bar-item {
    flex: 1;
    text-align: center;
    color: white;
    font-size: 14px;
}

.tab-icon {
    width: 24px;
    height: 24px;
    margin-bottom: 4px;
}

.tab-text {
    font-size: 12px;
}

.center-button {
    position: relative;
    width: 30px;
    height: 30px;
    background-color: transparent;
    border: 2px solid white;
    border-radius: 20%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>