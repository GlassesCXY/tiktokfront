import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/home.vue'
import Login from "../views/Login.vue";
import Register from "@/views/Register.vue";
import UploadFile from "@/views/UploadFile.vue";
import MyVideo from "@/views/MyVideo.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:"/",
      name:"home",
      component: Home
    },
    {
      path:"/login",
      name:"login",
      component: Login
    },
    {
      path:"/register",
      name:"register",
      component:Register
    },
    {
      path:"/upload",
      name:"upload",
      component:UploadFile
    },
    {
      path:"/myVideos",
      name:"myVideos",
      component: MyVideo
    }

  ]
})

export default router
