import { createRouter, createWebHistory } from 'vue-router'
import StartView from '../views/StartView.vue'
import BattleView from '../views/BattleView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'start',
      component: StartView
    },
    {
      path: '/battle',
      name: 'battle',
      component: BattleView
    }
  ]
})

export default router
