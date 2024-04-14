import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  { path: '/',
    component: () => import('../page/cover.vue')
  },
  {
    path:"/layout",
    redirect: '/layout/HomePage',
    component:() => import('../page/layout.vue'),
    children: [
      {
        path: "HomePage",
        component: () => import('../page/HomePage.vue')
      },
      {
        path: "Transaction",
        component: () => import('../page/Transaction.vue')
      },
      {
        path: "Mine",
        component: () => import('../page/Mine.vue')
      }
    ]
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
