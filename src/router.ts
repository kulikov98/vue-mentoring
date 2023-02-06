/* eslint-disable import/prefer-default-export */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import NotFoundPage from '@/pages/NotFoundPage.vue';
import MoviesPage from '@/pages/MoviesPage.vue';
import MovieDescription from '@/components/MovieDescription.vue';
import MovieSearch from '@/components/MovieSearch.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/movies',
  },
  {
    path: '/movies',
    component: MoviesPage,
    children: [
      {
        path: '',
        name: 'search',
        component: MovieSearch,
      },
      {
        path: 'details/:id',
        name: 'details',
        component: MovieDescription,
        props: true,
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFoundPage,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
