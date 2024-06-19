<template>
    <div class="container">
        <div class="login-form">
            <h2>登录</h2>
            <form @submit.prevent="handleLogin">
                <div class="form-group">
                    <label for="email">用户名</label>
                    <input
                            v-model="username"
                            type="text"
                            id="email"
                            placeholder="请输入用户名"
                    />
                </div>
                <div class="form-group">
                    <label for="password">密码</label>
                    <input
                            v-model="password"
                            type="password"
                            id="password"
                            placeholder="请输入密码"
                    />
                </div>
                <button type="submit">登录</button>

            </form>
            <button type="button" @click="toRegister">注册</button>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import {login} from "@/api/login.js";
import {useRouter} from "vue-router";

export default {
    setup() {
        const router = useRouter();
        const username = ref('');
        const password = ref('');

        const handleLogin = async () => {

            const result = await login({
                username:username.value,
                password:password.value
            })
            if (result.data.code==200){
                router.push("/");
            }
        };

        const toRegister = ()=>{
            router.push("/register");
        }

        return {
            username,
            password,
            handleLogin,
            toRegister,
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

.login-form {
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

input {
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
    .login-form {
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
