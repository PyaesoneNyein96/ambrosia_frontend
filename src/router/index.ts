
/* eslint-disable  */

import { createRouter, createWebHistory, RouteRecordRaw, START_LOCATION } from 'vue-router'
import store from '../store'

import Page404 from '../page-404.vue'

import Home from '../views/Home/Home-index.vue'
import Booking from '../views/booking/Booking-index.vue'
import Event from '../views/Home/Event-index.vue'
import Menu from '../views/Menu/Menu-index.vue'
import Detail from '../views/Menu/Detail-index.vue'
import Login from '../views/Login&Register/Login_Register.vue'
import Special from '../views/Home/Special-index.vue'
import Gallery from '../views/Home/Gallery-index.vue'
import Chef from '../views/Home/Chef-index.vue'
import Contact from '../views/Home/Contact-index.vue'
import About from '../views/Home/About-Us.vue'
import Coming_soon from '../views/Home/Coming_soon.vue'
import Packages from '../views/Home/Package-index.vue'
import Cart from '../views/booking/Cart-index.vue'
import Reviews from '../views/Home/Review-index.vue'

import UserProfile from '../views/Dashboard/UserSide/user-profile.vue'
import UserCheck from '../views/Dashboard/UserSide/user-order-check.vue'
import UserReviews from '../views/Dashboard/UserSide/user-reviews-index.vue'
import Suggestion from '../views/Dashboard/UserSide/user-suggestion.vue'



// Admin Side

import Dashboard from '../views/Dashboard/AdminSide/Dashboard-route.vue'
import MainDashboard from '../views/Dashboard/AdminSide/Main-Dashboard.vue'
import Food_Add from '../views/Dashboard/AdminSide/Food-add.vue'
import Food_Edit from '../views/Dashboard/AdminSide/Food-edit.vue'
import Food_List from '../views/Dashboard/AdminSide/Food-list.vue'

import UserList from '../views/Dashboard/AdminSide/User-list.vue'

import Category from '../views/Dashboard/AdminSide/category-add-list.vue'
import Tag from '../views/Dashboard/AdminSide/tag-add-list.vue'

import Package_Add from '../views/Dashboard/AdminSide/Package-add.vue'
import Package_List from '../views/Dashboard/AdminSide/Package-list.vue'
import Package_Edit from '../views/Dashboard/AdminSide/Package-edit.vue'
import Order_List from '../views/Dashboard/AdminSide/Order-list.vue'
import Order_Detail from '../views/Dashboard/AdminSide/Order-detail.vue'
import Carousel_List from '../views/Dashboard/AdminSide/Carousel-list.vue'
import Carousel_Add from '../views/Dashboard/AdminSide/Carousel-add.vue'



import { smsInform } from '../store/Notify/notify.js'



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
    { path: '/login', component: Login, name: 'login', meta: { login: true } },
    { path: '/menu', component: Menu, name: 'menu' },
    { path: '/detail/:id', component: Detail, name: 'detail', meta: { detail: true } },
    { path: '/book', component: Booking, name: 'booking', meta: { book: true } },
    { path: '/event', component: Event, name: 'event', meta: { event: true } },
    { path: '/special', component: Special, name: 'special' },
    { path: '/gallery', component: Gallery, name: 'gallery' },
    { path: '/chef', component: Chef, name: 'chef' },
    { path: '/about_us', component: About, name: 'about_us' },
    { path: '/Contact', component: Contact, name: 'contact' },
    { path: '/coming_soon', component: Coming_soon, name: 'coming_soon' },
    { path: '/packages', component: Packages, name: 'packages' },
    { path: '/cart', component: Cart, name: 'cart', meta: { cart: true } },
    { path: '/reviews', component: Reviews, name: 'review', },




    {
      path: '/dashboard', component: Dashboard, name: 'dashboard', meta: { dashboard: true },
      children: [
        { path: '', component: MainDashboard, name: 'main_dashboard', meta: { main_dashboard: true } },
        { path: 'user_profile', component: UserProfile, name: 'user_Profile' },
        { path: 'user_check', component: UserCheck, name: 'user_Check' },
        { path: 'user_reviews', component: UserReviews, name: 'user_review' },
        { path: 'user_suggestion', component: Suggestion, name: 'user_suggestion' },

        { path: 'food_add', component: Food_Add, name: 'food_Add', meta: { food_add: true } },
        { path: 'food_edit/:id', component: Food_Edit, name: 'food_Edit', meta: { food_edit: true } },
        { path: 'food_list', component: Food_List, name: 'food_List', meta: { food_list: true } },
        { path: 'categories', component: Category, name: 'category', meta: { categories: true } },
        { path: 'tags', component: Tag, name: 'tag', meta: { tags: true } },
        { path: 'user_list', component: UserList, name: 'user_list', meta: { user_list: true } },
        { path: 'package_add', component: Package_Add, name: 'package_add', meta: { package_add: true } },
        { path: 'package_list', component: Package_List, name: 'package_list', meta: { package_list: true } },
        { path: 'package_edit/:id', component: Package_Edit, name: 'package_edit', meta: { package_edit: true } },
        { path: 'order_list', component: Order_List, name: 'order_list', meta: { order_list: true } },
        { path: 'order_detail/:id', component: Order_Detail, name: 'order_detail', meta: { order_detail: true } },

        { path: 'carousel_list', component: Carousel_List, name: 'carousel_list', meta: { carousel: true } },
        { path: 'carousel_add', component: Carousel_Add, name: 'carousel_add', meta: { carousel_add: true } },



      ]
    },

    { path: '/:pathMatch(.*)', component: Page404, name: 'page404' }

  ],

})




// VALIDATION

const validation = (to, from, next) => {


  if (((to.meta.dashboard) && localStorage.getItem('userCredentials')) && store.getters['tool/getReservationPath'] == true) {
    router.push({ name: 'booking' }).then(() => {
      store.commit('tool/setReservationPath', false)
    })
  }
  if ((to.meta.dashboard) && !localStorage.getItem('userCredentials')) {
    router.push({ name: 'login' }).then(() => {
      smsInform(store.commit, 'Hey Dude', "Don't try something like this :/")
    })
  }
  else if ((to.meta.login) && localStorage.getItem('userCredentials')) {
    router.push({ name: 'home' })
  }
  else if ((to.meta.food_edit) && store.getters['food/getSpecific'].id != to.params.id) {
    router.push({ name: 'food_List' })
  }
  else if ((to.meta.package_edit) && store.getters['package/getEditPackage'].id != to.params.id) {
    router.push({ name: 'package_list' })

  }

  else if ((to.meta.cart) && !store.getters['auth/getUserData']) {
    router.push({ name: 'home' })
  }

  else if ((to.meta.detail) && store.getters['food/getDetailFood'].id !== Number(to.params.id)) {
    router.push({ name: 'menu' })
  }
  else if ((to.meta.order_detail) && store.getters['cart/getOrderCode'] !== to.params.id) {
    router.push({ name: 'order_list' })

  }

  else if (((to.meta.food_add) || (to.meta.edit) ||
    (to.meta.food_list) || (to.meta.categories) ||
    (to.meta.user_list) || (to.meta.tags) ||
    (to.meta.package_add) || (to.meta.package_list)
    || (to.meta.order_list)
    // || (to.meta.carousel)

  )

    && store.getters['auth/isAdmin'] == 0) {



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
