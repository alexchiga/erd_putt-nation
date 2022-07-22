import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/registry',
    component: () => import('layouts/RegistryLayout.vue'),
    children: [
      { path: '', component: () => import('pages/registry/RegistryIndexPage.vue') },
      { path: 'team', component: () => import('pages/registry/RegistryTeamPage.vue') },
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
