import Vue from 'vue';
import VueRouter from 'vue-router';
import VueQrcodeReader from 'vue-qrcode-reader';
import Home from '../views/Home.vue';
import Task from '../views/Task.vue';

Vue.use(VueRouter);
Vue.use(VueQrcodeReader);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path:'/task/:id',
        name: 'task',
        component: Task,
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
