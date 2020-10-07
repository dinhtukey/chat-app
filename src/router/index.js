import Vue from "vue";
import VueRouter from "vue-router"

Vue.use(VueRouter)

    const routes = [
        {
            path:"/",
            component:()=>import('../components/index.vue')
        },
        {
            path:"/chat",
            component:()=>import('../components/chat.vue')
        },
        {
            path : "*",
            component: () => import ('../views/pageNotFound')
          }
    ];

const router = new VueRouter({
    mode:'history',
    base:process.env.BASE_URL,
    routes,
})
export default router