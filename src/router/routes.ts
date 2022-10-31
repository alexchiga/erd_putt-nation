import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/registry',
    component: () => import('layouts/RegistryLayout.vue'),
    children: [
      { path: '', component: () => import('pages/registry/RegistryIndexPage.vue') },
      { path: 'team', component: () => import('pages/registry/RegistryTeamPage.vue') },
      { path: 'players', component: () => import('pages/registry/RegistryPlayersPage.vue') },
      { path: 'check', component: () => import('pages/registry/RegistryCheckPage.vue') },
      { path: 'finish', component: () => import('pages/registry/RegistryFinishPage.vue') },
    ],
  },
  {
    path: '/rating',
    component: () => import('layouts/RatingLayout.vue'),
    children: [
      { path: '', component: () => import('pages/rating/RatingIndexPage.vue') },
    ],
  },
  {
    path: '/hole/:hole',
    component: () => import('layouts/HoleLayout.vue'),
    children: [
      { path: '', component: () => import('pages/hole/HoleIndexPage.vue') },
      { path: 'login', component: () => import('pages/hole/HoleLoginPage.vue') },
      { path: 'score', component: () => import('pages/hole/HoleScorePage.vue') },
      { path: 'check', component: () => import('pages/hole/HoleCheckPage.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
