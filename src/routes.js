// eslint-disable-next-line import/prefer-default-export
export const routes = [
  { path: '/', component: () => import('@/pages/IndexPage.vue') },
  { path: '/articles/:id', component: () => import('@/pages/ArticlePage.vue') },
  { path: '/login', component: () => import('@/pages/LoginPage.vue') },
  { path: '/dashboard', component: () => import('@/pages/DashboardPage.vue'), meta: { requiresAuth: true } },
  { path: '/articles/:id/edit', component: () => import('@/pages/DashboardPage.vue'), meta: { requiresAuth: true } },
  { path: '/settings', component: () => import('@/pages/SettingsPage.vue'), meta: { requiresAuth: true } },
  { path: '/profile', component: () => import('@/pages/ProfilePage.vue'), meta: { requiresAuth: true } },
];
