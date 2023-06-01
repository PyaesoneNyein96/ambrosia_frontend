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
                        <span class="d-inline d-md-none text-muted" style="font-size: 18px;"> Ambrosia</span>
                    </a>
                </h1>


            </div>

            <nav id="navbar" class="navbar order-last order-lg-0">
                <ul>
                    <li><router-link class="nav-link scrollto " :to="{ name: 'home' }">Home</router-link></li>
                    <li><router-link class="nav-link scrollto " :to="{ name: 'menu' }">Menu</router-link></li>



                    <li><a class="nav-link scrollto" href="#specials">Specials</a></li>
                    <!-- <li><a class="nav-link scrollto" href="#events">Events</a></li> -->
                    <!-- <li><a class="nav-link scrollto" href="#chefs">Chefs</a></li>
                    <li><a class="nav-link scrollto" href="#gallery">Gallery</a></li> -->




                    <li><a class="nav-link scrollto" href="#contact">Contact</a></li>
                    <li v-if="!navLinkToHide">
                        <router-link class="nav-link scrollto" :to="{ name: 'main_dashboard' }" v-if="auth">
                            Dashboard
                        </router-link>
                    </li>

                    <li><router-link class="nav-link scrollto" :to="{ name: 'login' }" v-if="!auth">Login</router-link></li>
                    <li><a class="nav-link scrollto logout" v-if="auth" @click="logout">Logout</a></li>


                    <!-- <li><router-link class="nav-link scrollto " :to="{ name: 'why_us' }">About us</router-link></li> -->






                    <li class="dropdown"><a href="#">
                            <span> More
                                <span v-if="userData" class="text-danger px-2 mx-2 bg-info badge badge-pill">
                                    <!-- {{ userData.name }} -->
                                </span>
                            </span>
                            <i class="bi bi-chevron-down"></i></a>
                        <ul class="toggle-ul">
                            <li><a href="#">Our Chain-Store</a></li>
                            <li class="dropdown"><a href="#"><span>Deep Drop Down</span> <i
                                        class="bi bi-chevron-right"></i></a>
                                <ul>
                                    <li><a href="#">Deep Drop Down 1</a></li>
                                    <li><a href="#">Deep Drop Down 2</a></li>
                                    <li><a href="#">Deep Drop Down 3</a></li>
                                    <li><a href="#">Deep Drop Down 4</a></li>
                                    <li><a href="#">Deep Drop Down 5</a></li>
                                </ul>
                            </li>
                            <li><a href="#">Drop Down 2</a></li>
                            <li><a href="#">Drop Down 3</a></li>
                            <li><a href="#">Drop Down 4</a></li>
                        </ul>
                    </li>
                </ul>
                <i class="bi bi-list mobile-nav-toggle">
                </i>

            </nav>

            <span>
                <button class=" book-a-table-btn scrollto" @click="show">Reservation</button>
            </span>



        </div>
    </header>
</template>


<script>

import { mapGetters } from 'vuex';


export default {
    name: 'Header-index',
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
                        alert('ok')
                    } else if (result.isDenied) {
                        this.$router.push({ name: 'booking' })
                    }
                })
        },


        logout() {
            this.$store.dispatch('auth/logout')
                .then(() => {
                    this.$router.push({ name: 'login' })
                })
        },

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
}

span .router-link-exact-active {
    color: rgb(131, 65, 35)
}

.toggle-ul {
    background-color: rgb(249, 238, 225) !important;
}

.toggle-ul li a {
    color: rgb(93, 51, 4) !important;
}

.toggle-ul li :hover {
    background-color: bisque;
}
</style>
