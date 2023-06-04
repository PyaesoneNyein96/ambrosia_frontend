<template>
    <!-- ======= Header ======= -->
    <header id="header" class="fixed-top d-flex align-items-center">
        <div class="container-fluid container-xl d-flex align-items-center justify-content-between">

            <div class="logo me-auto">
                <h1>
                    <a href="/">
                        <!-- <img src="../../assets/logo.png" alt="" class="img-fluid rounded-circle"> -->
                        <span class="d-none d-md-inline"> Ambrosia</span>
                        <h1 class="text-light">

                        </h1>
                        <span class="d-inline d-md-none" style="font-size: 20px;"> Ambrosia</span>
                    </a>
                </h1>

            </div>

            <!-- Logo end  -->



            <nav id="navbar" class="navbar order-last order-lg-0" :class="{ 'navbar-mobile': isMobile }">
                <ul>
                    <li><router-link class="nav-link scrollto dropdown-active " :to="{ name: 'home' }">Home</router-link>
                    </li>
                    <li><router-link class="nav-link scrollto " :to="{ name: 'menu' }">Menu</router-link></li>



                    <li><a class="nav-link scrollto" href="#specials">Specials</a></li>



                    <li class="dropdown ">
                        <a class="text-warning">
                            <span @click="moreDropDown"> More . .

                            </span>
                            <i class="bi bi-chevron-down"></i></a>
                        <ul :class="{ 'dropdown-active': moreDrop }">
                            <li><a href="#">Our Chain-Store</a></li>

                            <li class="dropdown">
                                <a><span class="fw-bold" @click="deepDropDown">For Member Customers . .</span>
                                    <i class="bi bi-chevron-right"></i></a>
                                <ul :class="{ 'dropdown-active': deepDrop }">
                                    <li><a href="#">Event</a></li>
                                    <li><a href=""> Free Chef Class </a></li>
                                    <li><a href="#">Deep Drop Down 3</a></li>
                                    <li><a href="#">About Us</a></li>
                                    <li><a href="#">Contact Us</a></li>
                                </ul>
                            </li>
                            <li><a href="#">Gallery</a></li>
                            <li><a href="#">Our Chefs</a></li>
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Contact Us</a></li>
                        </ul>
                    </li>

                    <li><router-link class="nav-link scrollto" :to="{ name: 'login' }" v-if="!auth">Login</router-link>
                    </li>
                    <li><a class="nav-link scrollto logout" v-if="auth" @click="logout">Logout</a></li>

                    <li v-if="!navLinkToHide">
                        <router-link class="nav-link scrollto" :to="{ name: 'main_dashboard' }" v-if="auth">
                            Dashboard
                        </router-link>
                    </li>

                </ul>
                <i class="bi bi-x mobile-nav-toggle">
                    <div class="hamburger-menu d-block d-lg-none" @click="isMobile = !isMobile">
                        <div ref="bar-1" class="bar"></div>
                        <div ref="bar-2" class="bar"></div>
                        <div ref="bar-3" class="bar"></div>
                    </div>
                    <!-- <span class="d-block d-md-none" @click="isMobile = !isMobile">X</span> -->
                </i>



            </nav>

            <span>
                <button class=" book-a-table-btn scrollto" @click="show">Reservation</button>
            </span>




        </div>
    </header>
</template>


<script>

import store from '../../store'
import { smsInform, smsLogOut } from '../../store/Notify/notify.js'
import { mapGetters } from 'vuex';


export default {
    name: 'Header-index',

    data() {
        return {
            isMobile: false,
            deepDrop: false,
            moreDrop: false
        }
    },
    computed: {
        ...mapGetters({
            userData: 'auth/getUserData',
            auth: 'auth/getUserToken'
        }),


        navLinkToHide() {
            return this.$route.matched.some(r => r.name === 'dashboard')
            // return this.$route.path.startsWith('/dashboard');
            // return this.$route.path.startsWith('/dashboard/');
        }

    },
    methods: {
        show() {
            this.$swal({
                title: 'Order with Phone Number or As member ?',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'With Phone',
                denyButtonText: 'As Member'
            }).
                then((result) => {
                    if (result.isConfirmed) {
                        this.$router.push({ name: 'booking_phone' })
                    } else if (result.isDenied) {
                        if (!this.auth) {
                            smsInform(store.commit, 'Information', 'Firstly U have to Login for this Process')
                            this.$router.push({ name: 'login' })
                        } else {
                            this.$router.push({ name: 'booking' })

                        }
                    }
                })
        },
        // LOG OUT
        logout() {
            this.$store.dispatch('auth/logout')
                .then(() => {
                    this.$router.push({ name: 'home' })
                }).then(() => {
                    smsLogOut(store.commit)
                })
        },

        moreDropDown() {
            this.moreDrop = !this.moreDrop
        },

        deepDropDown() {
            this.deepDrop = !this.deepDrop
        }


    },
    mounted() {
        this.$router.beforeEach((to, from, next) => {
            this.isMobile = false; // Set isMenuOpen to false when the route changes
            next();
        });


    }


}
</script>


<style scoped>
#header {
    top: 0px !important;
}

.logout {
    cursor: pointer;
}

.router-link-active {
    color: rgb(210, 131, 53) !important;
    font-size: 17px !important;
    font-weight: bolder !important;
}

span .router-link-exact-active {
    color: rgb(131, 65, 35)
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
    height: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
}

.bar {
    width: 100%;
    height: 3px;
    background-color: #fffefe;
    margin-bottom: 5px;
    transition: transform 0.3s ease;
}

.hamburger-menu.active .bar:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
}

.hamburger-menu.active .bar:nth-child(2) {
    opacity: 0;
}

.hamburger-menu.active .bar:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
}
</style>
