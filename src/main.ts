import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { v4 as uuidv4 } from 'uuid'

import DateFormat from '@voidsolutions/vue-dateformat'

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.css';

import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'




import 'bootstrap/dist/js/bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'



import Header from './views/Header/Header-index.vue';
import Footer from './views/Footer/Footer-index.vue';
import Loader from './components/Tools/mini-Loader.vue';
import Search from './components/Tools/search-index.vue'




import '../public/assets/css/style.css'


const app = createApp(App);

app.config.globalProperties.$toast = iziToast;
app.config.globalProperties.$uuid = uuidv4;

app.component('app-Header', Header);
app.component('app-Footer', Footer);
app.component('app-Loader', Loader);
app.component('app-Search', Search)
// app.component('date-format', DateFormat)



app
    .use(store)
    .use(router)
    .use(VueSweetalert2)
    .use(DateFormat)
    .mount('#app');

    // createApp(App).use(store).use(router).mount('#app')
