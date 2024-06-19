<template>
    <div class="container">
        <div class="upload-form">
            <h2>上传视频</h2>
            <form @submit.prevent="handleUpload">
                <div class="form-group">
                    <label for="file">选择视频文件</label>
                    <input
                            type="file"
                            id="file"
                            @change="onFileChange"
                            accept="video/mp4"
                            required
                    />
                </div>
                <div class="form-group">
                    <label for="description">描述</label>
                    <input
                            v-model="description"
                            type="text"
                            id="description"
                            placeholder="请输入描述"
                            required
                    />
                </div>
                <button type="submit">上传</button>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';
import {upload} from "@/api/upload.js";

export default {
    setup() {
        const file = ref(null);
        const description = ref('');

        const onFileChange = (event) => {
            file.value = event.target.files[0];
        };

        const handleUpload = async () => {
            if (!file.value) {
                alert('请选择一个视频文件');
                return;
            }

            const formData = new FormData();
            formData.append('file', file.value);
            formData.append('des', description.value);

            try {
                const response = await upload(formData);
                alert('上传成功: ' + response.data);
            } catch (error) {
                console.error('上传失败', error);
                alert('上传失败');
            }
        };

        return {
            file,
            description,
            onFileChange,
            handleUpload,
        };
    },
};
</script>

<style>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #f0f0f0;
}

.upload-form {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
}

h2 {
    margin-bottom: 1.5rem;
    text-align: center;
}

.form-group {
    margin-bottom: 1rem;
}

label {
    display: block;
    margin-bottom: 0.5rem;
}

input[type="file"],
input[type="text"] {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

button {
    width: 100%;
    padding: 0.75rem;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    font-size: 1rem;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}

@media (max-width: 600px) {
    .upload-form {
        padding: 1.5rem;
    }

    h2 {
        font-size: 1.5rem;
    }

    button {
        padding: 0.5rem;
        font-size: 0.875rem;
    }
}
</style>
