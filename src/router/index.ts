import { createRouter, createWebHistory, RouteRecordRaw, } from 'vue-router'
import Home from '../views/Home/Home-index.vue'
import Booking from '../views/booking/Booking-index.vue'
import Menu from '../views/Menu/Menu-index.vue'
import Why_us from '../views/WhyChoose/why-us.vue'
import Login from '../views/Login&Register/Login_Register.vue'

// const routes: Array<RouteRecordRaw> = [
//   {
//     path: '/',
//     name: 'home',
//     component: HomeView
//   },

// ]

const router = createRouter({
  history: createWebHistory(),
  routes: [

    { path: '/', component: Home, name: 'home' },
    { path: '/menu', component: Menu, name: 'menu' },
    { path: '/book', component: Booking, name: 'booking' },
    { path: '/why_us', component: Why_us, name: 'why_us' },


    { path: '/login', component: Login, name: 'login' },





  ],

})




export default router
