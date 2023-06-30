import { createApp } from 'vue';

import { VueFire, VueFireAuth, VueFireFirestoreOptionsAPI } from 'vuefire';

import * as VueRouter from 'vue-router';
import { routes } from '@/routes';

import { authStore } from '@/store/auth';
import { firebaseApp } from './plugins/firebase';
import App from './App.vue';

import './assets/main.css';

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

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !authStore.getters.getUser) {
    return { path: '/' };
  }

  return to;
});

app.use(router);

app.mount('#app');
