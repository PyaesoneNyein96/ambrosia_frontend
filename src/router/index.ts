
/* eslint-disable  */


import { createRouter, createWebHistory, RouteRecordRaw, START_LOCATION } from 'vue-router'
import store from '../store'

import Home from '../views/Home/Home-index.vue'
import Booking from '../views/booking/Booking-index.vue'
import Menu from '../views/Menu/Menu-index.vue'
import Why_us from '../views/WhyChoose/why-us.vue'
import Login from '../views/Login&Register/Login_Register.vue'

import Dashboard from '../views/Dashboard/AdminSide/Dashboard-route.vue'
import MainDashboard from '../views/Dashboard/AdminSide/Main-Dashboard.vue'
import Food_Add from '../views/Dashboard/AdminSide/Food-add.vue'
import Food_Edit from '../views/Dashboard/AdminSide/Food-edit.vue'
import Food_List from '../views/Dashboard/AdminSide/Food-list.vue'

import Category from '../views/Dashboard/AdminSide/category-add-list.vue'

import UserProfile from '../views/Dashboard/UserSide/user-profile.vue'
import UserCheck from '../views/Dashboard/UserSide/user-order-check.vue'




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


    { path: '/login', component: Login, name: 'login', meta: { login: true } },


    {
      path: '/dashboard', component: Dashboard, name: 'dashboard', meta: { dashboard: true },
      children: [
        { path: '', component: MainDashboard, name: 'main_dashboard' },
        { path: 'food_add', component: Food_Add, name: 'food-Add' },
        { path: 'food_edit/:id', component: Food_Edit, name: 'food-Edit' },
        { path: 'food_list', component: Food_List, name: 'food-List' },
        { path: 'categories', component: Category, name: 'category' },

        { path: 'user_profile', component: UserProfile, name: 'user_Profile' },
        { path: 'user_check', component: UserCheck, name: 'user_Check' }
      ]
    }


  ],

})




const LocalStorage_Check = localStorage.getItem('userCredentials');

// VALIDATION

const validation = (to, from, next) => {


  if ((to.meta.dashboard) && !LocalStorage_Check) {

    router.push({ name: 'login' })
  }
  else if ((to.meta.login) && LocalStorage_Check) {

    router.push({ name: 'home' })

  } else {

    next()
  }

}

// EACH ROUTE CHECK 

router.beforeEach((to, from, next) => {

  store.commit('tool/setLoading', true)

  if (from === START_LOCATION) {


    if (!LocalStorage_Check) {

      validation(to, from, next)

    } else {

      store.dispatch('auth/autoLogin').then(() => {

        validation(to, from, next)
      })

    }

  } else {

    validation(to, from, next)
  }
  // setTimeout(() => {
  store.commit('tool/setLoading', false)
  // }, 1500);




})





export default router
