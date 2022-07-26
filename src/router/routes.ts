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

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
