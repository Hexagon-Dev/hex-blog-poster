import { createApp } from 'vue';

import { VueFire, VueFireAuth, VueFireFirestoreOptionsAPI } from 'vuefire';

import * as VueRouter from 'vue-router';
import { routes } from '@/routes';

import { authStore } from '@/store/auth';
import { firebaseApp } from './plugins/firebase';
import App from './App.vue';

import './assets/main.css';

// eslint-disable-next-line no-console
console.log('ENV VARIABLES', import.meta.env);

const app = createApp(App);

app.use(authStore);

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
});

app.use(VueFire, {
  firebaseApp,
  modules: [
    VueFireAuth(),
    VueFireFirestoreOptionsAPI(),
  ],
});

// eslint-disable-next-line consistent-return
router.beforeEach((to) => {
  if (to.meta.requiresAuth && !authStore.getters.getUser) {
    return { path: '/' };
  }
});

app.use(router);

app.mount('#app');
