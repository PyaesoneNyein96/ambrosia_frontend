
/* eslint-disable  */


import { createRouter, createWebHistory, RouteRecordRaw, START_LOCATION } from 'vue-router'
import store from '../store'

import Home from '../views/Home/Home-index.vue'
import Booking from '../views/booking/Booking-index.vue'
import Booking_Phone from '../views/booking/Booking-phone.vue'
import Menu from '../views/Menu/Menu-index.vue'
import Why_us from '../views/WhyChoose/why-us.vue'
import Login from '../views/Login&Register/Login_Register.vue'
import Page404 from '../page-404.vue'

import Dashboard from '../views/Dashboard/AdminSide/Dashboard-route.vue'
import MainDashboard from '../views/Dashboard/AdminSide/Main-Dashboard.vue'
import Food_Add from '../views/Dashboard/AdminSide/Food-add.vue'
import Food_Edit from '../views/Dashboard/AdminSide/Food-edit.vue'
import Food_List from '../views/Dashboard/AdminSide/Food-list.vue'

import UserList from '../views/Dashboard/AdminSide/User-list.vue'
import UserEdit from '../views/Dashboard/AdminSide/User-edit.vue'

import Category from '../views/Dashboard/AdminSide/category-add-list.vue'
import Tag from '../views/Dashboard/AdminSide/tag-add-list.vue'

import Package from '../views/Dashboard/AdminSide/Package-add.vue'

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
    { path: '/book', component: Booking, name: 'booking', meta: { book: true } },
    { path: '/book_phone', component: Booking_Phone, name: 'booking_phone', meta: { book_phone: true } },
    { path: '/why_us', component: Why_us, name: 'why_us' },



    { path: '/login', component: Login, name: 'login', meta: { login: true } },


    {
      path: '/dashboard', component: Dashboard, name: 'dashboard', meta: { dashboard: true },
      children: [
        { path: 'user_profile', component: UserProfile, name: 'user_Profile' },
        { path: 'user_check', component: UserCheck, name: 'user_Check' },

        { path: '', component: MainDashboard, name: 'main_dashboard', meta: { main_dashboard: true } },
        { path: 'food_add', component: Food_Add, name: 'food-Add', meta: { food_add: true } },
        { path: 'food_edit/:id', component: Food_Edit, name: 'food-Edit', meta: { food_edit: true } },
        { path: 'food_list', component: Food_List, name: 'food-List', meta: { food_list: true } },
        { path: 'categories', component: Category, name: 'category', meta: { categories: true } },
        { path: 'tags', component: Tag, name: 'tag', meta: { tags: true } },
        { path: 'package', component: Package, name: 'package', meta: { package: true } },
        { path: 'user_list', component: UserList, name: 'user_list', meta: { user_list: true } },


      ]
    },

    { path: '/:pathMatch(.*)', component: Page404, name: 'page404' }

  ],

})






// VALIDATION

const validation = (to, from, next) => {


  if ((to.meta.dashboard) && !localStorage.getItem('userCredentials')) {
    router.push({ name: 'login' })
  }
  else if ((to.meta.login) && localStorage.getItem('userCredentials')) {
    router.push({ name: 'home' })
  }
  else if ((to.meta.food_edit) && store.getters['food/getSpecific'].id != to.params.id) {
    router.push({ name: 'food-List' })
  }
  else if ((to.meta.book_phone) && (localStorage.getItem('userCredentials') || store.getters['auth/isAdmin'] == 1)) {
    router.push({ name: 'booking' })
  }

  else if (((to.meta.food_add) || (to.meta.edit) ||
    (to.meta.food_list) || (to.meta.categories) ||
    (to.meta.user_list) ||
    (to.meta.tags) || (to.meta.package)) && store.getters['auth/isAdmin'] == 0) {
    router.push({ name: 'main_dashboard' })
  }
  else {
    next()
  }
  store.commit('tool/setLoading', false)
}

// EACH ROUTE CHECK 

router.beforeEach((to, from, next) => {

  store.commit('tool/setLoading', true)

  if (from === START_LOCATION) {


    if (!localStorage.getItem('userCredentials')) {

      validation(to, from, next)

    } else {

      store.dispatch('auth/autoLogin').then(() => {
        validation(to, from, next)
      })

    }

  } else {

    validation(to, from, next)
  }







})





export default router
