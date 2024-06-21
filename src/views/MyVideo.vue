<template>
    <div>
        <h3>我的视频</h3>
        <el-table :data="paginatedVideos" style="width: 100%;height: 93%" >
            <el-table-column prop="vid" label="vid" width="180"></el-table-column>
            <el-table-column prop="description" label="Description"></el-table-column>
            <el-table-column label="Actions" width="100">
                <template v-slot="scope">
                    <el-button size="mini" type="danger" @click="handleDeleteVideo(scope.row.vid)">Delete</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                background
                layout="prev, pager, next"
                :total="totalVideos"
                :page-size="pageSize"
                @current-change="handleCurrentChange"
        ></el-pagination>
        <el-button @click="handleLogout">登出</el-button>
        <Footer/>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import {  deleteVideo } from '@/api/deleteVideo.js';
import {getMyVideo} from "@/api/getMyVideo.js";
import {getMyVideoCount} from "@/api/getMyVideoCount.js";
import Footer from "@/components/Footer.vue";
import {logout} from "@/api/logout.js";
import {useRouter} from "vue-router";

const currentPage = ref(1);
const pageSize = ref(5);
const totalVideos = ref(0);
const paginatedVideos = ref([]);
const router = useRouter();
const handleLogout = async ()=>{
    try{
        await logout();
        router.push("/login")
    }catch (err){}
    ElMessage.error("logout fail")
}

// 获取视频数据
const fetchVideos = async (page) => {
    const offset = (page - 1) * pageSize.value;
    try {
        const response = await getMyVideo(offset, pageSize.value);
        paginatedVideos.value = response.data.data; // 假设 API 返回的数据结构为 { videos: [...] }
        const total = await getMyVideoCount();
        totalVideos.value = total.data.data.videoCount; // 假设 API 返回的数据结构为 { total: ... }
    } catch (error) {
        ElMessage.error('Failed to load videos');
    }
};

// 删除视频
const handleDeleteVideo = async (vid) => {
    ElMessageBox.confirm('Are you sure you want to delete this video?', 'Warning', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        type: 'warning',
    }).then(async () => {
        try {
            await deleteVideo(vid);
            ElMessage.success('Video deleted successfully');
            await fetchVideos(currentPage.value); // 重新获取当前页的视频数据
        } catch (error) {
            ElMessage.error('Failed to delete video');
        }
    }).catch(() => {
        ElMessage.info('Deletion canceled');
    });
};

// 处理页码变化
const handleCurrentChange = (page) => {
    currentPage.value = page;
    fetchVideos(page);
};

onMounted(() => {
    fetchVideos(currentPage.value);
});
</script>

<style scoped>
.el-table th, .el-table td {
    text-align: center;
}
</style>
