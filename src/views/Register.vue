<template>
    <div class="container">
        <div class="register-form">
            <h2>注册</h2>
            <form @submit.prevent="handleRegister">
                <div class="form-group">
                    <label for="username">用户名</label>
                    <input
                            v-model="username"
                            type="text"
                            id="username"
                            placeholder="请输入用户名"
                    />
                </div>
                <div class="form-group">
                    <label for="email">邮箱</label>
                    <input
                            v-model="email"
                            type="email"
                            id="email"
                            placeholder="请输入邮箱"
                    />
                </div>
                <button type="button" @click="sendCode" >发送验证码</button>
                <div class="form-group">
                    <label for="password">密码</label>
                    <input
                            v-model="password"
                            type="password"
                            id="password"
                            placeholder="请输入密码"
                    />
                </div>
                <div class="form-group">
                    <label for="code">验证码</label>
                    <input
                            v-model="code"
                            type="text"
                            id="code"
                            placeholder="请输入验证码"
                    />
                </div>
                <button type="submit">注册</button>
            </form>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import {register} from "../api/register.js";
import {useRouter} from "vue-router";
import {getCode} from "@/api/getCode.js";

export default {
    setup() {
        const router = useRouter();
        const username = ref('');
        const email = ref('');
        const password = ref('');
        const code = ref('');

        const handleRegister = async () => {
            const result = await register({
                username:username.value,
                email:email.value,
                password:password.value,
                code:code.value,
            })
            if(result.data.code==200){
                alert('success')
                router.push('/login')
            }else {
                alert('fail');
            }


            console.log('Username:', username.value);
            console.log('Email:', email.value);
            console.log('Password:', password.value);
            console.log('Code:', code.value);
        };

        const sendCode = async ()=>{
            const res = await getCode({
                username:username.value,
                email:email.value,
            })
            if(res.data.code==200){
                alert('发送成功');
            }else {
                alert('fail');
            }
        }


        return {
            username,
            email,
            password,
            code,
            handleRegister,
            sendCode,
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

.register-form {
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
    .register-form {
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
