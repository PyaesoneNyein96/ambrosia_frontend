<template>
    <!-- ======= Header ======= -->
    <header id="header" class="fixed-top d-flex align-items-center ">
        <div class="container-fluid container-xl d-flex align-items-center justify-content-between">

            <div class="logo me-auto">
                <h1>
                    <router-link :to="{ name: 'home' }">
                        <img src="../../../public//assets//img//logo/GODlogopng.png" class="img-fluid rounded-circle">
                        <span class="d-none d-md-inline"> Ambrosia</span>
                        <h1 class="text-light">

                        </h1>
                        <!-- <span class="d-inline d-md-none" style="font-size: 20px;"> Ambrosia</span> -->
                    </router-link>
                </h1>

            </div>

            <!-- Logo end  -->



            <nav id="navbar" class="navbar order-last order-lg-0" :class="{ 'navbar-mobile': isMobile }">


                <TransitionGroup name="item">
                    <ul :key="elementKey">
                        <li>
                            <router-link class="nav-link scrollto dropdown-active  " :to="{ name: 'home' }">
                                Home
                            </router-link>
                        </li>
                        <li>
                            <router-link class="nav-link scrollto " :to="{ name: 'menu' }">Menu</router-link>
                        </li>
                        <li>
                            <router-link class="nav-link scrollto " :to="{ name: 'special' }">Special</router-link>
                        </li>
                        <li>
                            <router-link class="nav-link scrollto " :to="{ name: 'packages' }">Packages</router-link>
                        </li>

                        <li v-if="auth && (cartCounts > 0)">
                            <router-link class="nav-link scrollto  cart-link-wrap" :to="{ name: 'cart' }">
                                Cart
                                <span
                                    class="position-absolute cart-badge start-100  position-relative translate-middle badge rounded-pill bg-danger">
                                    {{ cartCounts }}
                                    <span class="visually-hidden">unread messages</span>
                                </span>
                            </router-link>
                        </li>


                        <li class="dropdown">
                            <a class="">
                                <span @click="moreDropDown">
                                    More
                                </span>
                                <i class="bi bi-chevron-down"></i></a>
                            <ul :class="{ 'dropdown-active': moreDrop }">



                                <li class="dropdown" v-if="auth">
                                    <a>
                                        <span class="fw-bold" @click="deepDropDown"> For Member Customers . .</span>
                                        <i class="bi bi-chevron-right"></i>
                                    </a>
                                    <ul :class="{ 'dropdown-active': deepDrop }">
                                        <li>
                                            <router-link class="nav-link scrollto " :to="{ name: 'coming_soon' }">
                                                Event for Members
                                            </router-link>

                                        </li>
                                        <li>
                                            <router-link class="nav-link scrollto " :to="{ name: 'coming_soon' }">
                                                Free Chef Class
                                            </router-link>
                                        </li>


                                    </ul>
                                </li>


                                <li>
                                    <router-link class="nav-link scrollto " :to="{ name: 'event' }">Event</router-link>
                                </li>
                                <li>
                                    <router-link class="nav-link scrollto " :to="{ name: 'gallery' }">Gallery</router-link>
                                </li>
                                <li>
                                    <router-link class="nav-link scrollto " :to="{ name: 'chef' }">Our Chefs</router-link>
                                </li>

                                <li>
                                    <router-link class="nav-link scrollto " :to="{ name: 'review' }">Reviews</router-link>
                                </li>

                                <li>
                                    <router-link class="nav-link scrollto " :to="{ name: 'about_us' }">About
                                        Us</router-link>
                                </li>
                                <li>
                                    <router-link class="nav-link scrollto " :to="{ name: 'contact' }">Contact
                                        Us</router-link>
                                </li>
                                <li>
                                    <router-link class="nav-link scrollto" :to="{ name: 'login' }" v-if="!auth">
                                        Login & Register
                                    </router-link>
                                </li>
                                <li><a class="nav-link scrollto logout" v-if="auth" @click="logout">Logout</a></li>
                            </ul>
                        </li>

                        <li>

                            <router-link class="nav-link scrollto" :to="{ name: 'main_dashboard' }"
                                v-if="auth && !navLinkToHide">
                                Dashboard <span v-if="auth">
                                    <span class="mx-2 bg-gradient small rounded-pill active-btn py-0 p-1">a
                                    </span>
                                </span>
                            </router-link>
                        </li>

                    </ul>
                </TransitionGroup>

                <i class="bi bi-x mobile-nav-toggle" @click="isMobileChange">
                    <div class="hamburger-menu d-block d-lg-none">
                        <div ref="bar_1" class="bar"></div>
                        <div ref="bar_2" class="bar"></div>
                        <div ref="bar_3" class="bar"></div>
                    </div>
                </i>



            </nav>

            <span>
                <button class=" book-a-table-btn scrollto py-2" @click="show">Reservation
                </button>

            </span>






        </div>
    </header>
</template>


<script>

/* eslint-disable  */


import store from '../../store'
import { smsInform, smsLogOut } from '../../store/Notify/notify.js'
import { mapGetters } from 'vuex';



export default {
    name: 'Header-index',

    props: [
        'count'
    ]
    ,
    data() {
        return {
            elementKey: 'key',
            isMobile: false,
            deepDrop: false,
            moreDrop: false,
            cartHide: false,

            cartCounts: 0,
        }
    },
    computed: {
        ...mapGetters({
            userData: 'auth/getUserData',
            auth: 'auth/getAuth',
            userBadge: 'auth/getUserData',
            cartCount: 'cart/getCartListByUser',

        }),


        navLinkToHide() {
            return this.$route.matched.some(r => r.name === 'dashboard')
            // return this.$route.path.startsWith('/dashboard');
            // return this.$route.path.startsWith('/dashboard/');
        },


    },



    methods: {
        show() {

            if (!this.auth) {
                this.$store.commit('tool/setReservationPath', true)
            }


            this.$swal({
                title: "Order As a member ?",
                // showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'Book a table?',
                // denyButtonText: 'Member',
                cancelButtonText: 'Cancel',
                color: 'white',
                confirmButtonColor: '#a78f06ec',
                // denyButtonColor: '#a78f06ec',
                cancelButtonColor: '#gray',
                background: '#dbbd1049',
            }).
                then((result) => {
                    if (result.isConfirmed) {
                        if (!this.auth) {
                            smsInform(store.commit, 'Information', 'Firstly U have to Login for this Process')
                            this.$router.push({ name: 'login' });
                        }
                        else if (this.auth && this.cartCounts !== 0) {
                            this.$router.push({ name: 'cart' })
                        }
                        else {
                            this.$router.push({ name: 'menu' })
                                .then(() => {
                                    smsInform(store.commit, 'Reservation', 'U need to pick food or package at least 1 for book a table')
                                })
                        }

                    }
                })
        },

        // LOG OUT
        logout() {
            this.isMobile = false
            this.$store.dispatch('auth/logout')

        },

        moreDropDown() {
            this.moreDrop = !this.moreDrop
        },

        deepDropDown() {
            this.deepDrop = !this.deepDrop
        },

        //=================

        isMobileChange() {

            this.isMobile = !this.isMobile;

            if (this.isMobile) {
                this.animate()
            } else {
                this.back()
            }

        },
        animate() {
            this.$refs.bar_1.classList.add('top-change');
            this.$refs.bar_2.style.opacity = 0;
            this.$refs.bar_3.classList.add('bot-change');
        },


        back() {
            this.$refs.bar_1.classList.remove('top-change');
            this.$refs.bar_2.style.opacity = 1;
            this.$refs.bar_3.classList.remove('bot-change');

        },

        countMath() {
            this.cartCounts = 0;
            if (this.cartCount) {
                this.cartCount.filter(i => {
                    this.cartCounts += i.count
                })
            };
        }



    },
    watch: {

        $route(to, from) {
            this.isMobile = false;
            this.back(); //Important ***;
            this.countMath();
        },

        cartCount() {
            this.countMath();
        },

        auth() {
            if (this.auth) {
                this.$store.dispatch('cart/getCartListByUser');
            }
            this.countMath();
        }
    },
















}
</script>


<style scoped>
nav * {
    cursor: pointer;
}

#header {
    top: 0px !important;
}

.logout {
    cursor: pointer;
}

.router-link-active {
    color: rgb(210, 131, 53) !important;
    /* font-size: 15px !important; */
    font-weight: bolder !important;
}

span .router-link-exact-active {
    color: rgb(131, 123, 35)
}

.toggle-ul {
    background-color: rgba(251, 246, 239, 0.781) !important;
}

.toggle-ul li a {
    color: rgb(93, 51, 4) !important;
}

.toggle-ul li {
    transition: all 0.6s ease-in-out;
}

.toggle-ul li :hover {
    transform: scale(1.01);
    font-size: 14px;
    background-color: rgba(246, 232, 216, 0.727);
}

/* Mobile Toggle  */

.hamburger-menu {
    width: 30px;
    height: 10px;
    display: flex;
    margin-bottom: 10px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    /* background-color: green; */
}

.bar {
    width: 100%;
    height: 3px;
    background-color: #fffefe;
    margin-bottom: 5px;
    transition: transform 0.3s ease-in-out;
}

.top-change {
    transform: rotate(-315deg) translate(16px, 6px);
    background-color: rgb(242, 227, 15);
}

.bot-change {
    transform: rotate(-45deg) translate(5px, 5px);
    background-color: rgb(144, 123, 8);
}

.active-btn {
    box-shadow: 1px 1px 30px 2px rgb(0, 255, 60);
    background-color: rgb(30, 125, 30);
    color: rgb(30, 125, 30);
}

.cart-badge {
    top: 6px;
    left: 100px;
}

@media (max-width: 1200px) {

    .cart-badge {
        position: absolute;
        left: 70px !important;
        background-color: gray !important;
    }

}


/* Transition  */

.item-enter-from,
.item-leave-to {
    opacity: 0;
}

.item-enter-active {
    transition: 1s;
}

.item-leave-active {
    width: 100%;
    transition: all 0.3s;
    position: absolute;
}

.item-enter-to,
.item-leave-from {
    opacity: 1;
}

.item-move {
    transition: transform 0.3s;
}
</style>
