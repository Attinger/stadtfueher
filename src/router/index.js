import Vue from 'vue';
import VueRouter from 'vue-router';
import VueQrcodeReader from 'vue-qrcode-reader';
import VueGeolocation from 'vue-browser-geolocation';
import * as VueGoogleMaps from 'vue2-google-maps';
import Home from '../views/Home.vue';
import Map from '../views/Map.vue';

Vue.use(VueRouter);
Vue.use(VueQrcodeReader);
Vue.use(VueGeolocation);
Vue.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyC-nvXVO6b3bAqGgXyGm9f_tLJwraoOCAQ',
    },
})

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/map',
        name: 'Map',
        component: Map,
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
