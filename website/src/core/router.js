import Vue from 'vue';
import VueRouter from 'vue-router';
import * as Auth from './auth';
import Login from '../component/login.vue';
import Home from '../component/home.vue';
import Project from '../component/project.vue';

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        { name: 'home', path: '/home', component: Home },
        { name: 'project', path: '/project/:name', component: Project },
        { name: 'login', path: '/login', component: Login },
    ],
});

router.beforeEach((to, from, next) => {
    if (Auth.isLogged()) {
        if (to.name === 'login') {
            next({ name: 'home' });
        } else {
            next();
        }
    } else {
        if (to.name === 'login') {
            next();
        } else {
            next({ name: 'login' });
        }
    }
});

export default router;