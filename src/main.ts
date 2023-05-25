import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

import Header from './views/Header/Header-index.vue';
import Footer from './views/Footer/Footer-index.vue';
import Loader from './components/Tools/mini-Loader.vue';
import '../public/assets/js/main.js'



const app = createApp(App);

app.component('app-Header', Header);
app.component('app-Footer', Footer);
app.component('app-Loader', Loader);

app
    .use(store)
    .use(router)
    .use(VueSweetalert2)
    .mount('#app');

// createApp(App).use(store).use(router).mount('#app')
