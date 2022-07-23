import VueRouter from 'vue-router'


const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/components/Home.vue')
    },
    {
        path: '/about',
        name: 'about',
        component: () => import('@/components/About.vue')
    }
]

const router = new VueRouter({
    routes,
    mode: 'history',
    base: '/'
})

// router.beforeEach((to, from, next) => {
//     console.log(to, from)
//     next()
// })

export default router