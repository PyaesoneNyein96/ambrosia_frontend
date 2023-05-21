<template>
    <!-- ======= Header ======= -->
    <header id="header" class="fixed-top d-flex align-items-center">
        <div class="container-fluid container-xl d-flex align-items-center justify-content-between">

            <div class="logo me-auto">
                <h1>
                    <a href="/">
                        <img src="../../assets/logo.png" alt="" class="img-fluid rounded-circle">
                        <span class="d-none d-md-inline"> Ambrosia</span>
                        <span class="d-inline d-md-none text-muted" style="font-size: 13px;"> Ambrosia</span>
                    </a>
                </h1>


            </div>

            <nav id="navbar" class="navbar order-last order-lg-0">
                <ul>
                    <li><router-link class="nav-link scrollto " :to="{ name: 'home' }">Home</router-link></li>
                    <li><router-link class="nav-link scrollto " :to="{ name: 'menu' }">Menu</router-link></li>





                    <li><a class="nav-link scrollto" href="#specials">Specials</a></li>
                    <li><a class="nav-link scrollto" href="#events">Events</a></li>
                    <li><a class="nav-link scrollto" href="#chefs">Chefs</a></li>
                    <li><a class="nav-link scrollto" href="#gallery">Gallery</a></li>
                    <li class="dropdown"><a href="#"><span>Drop Down</span> <i class="bi bi-chevron-down"></i></a>
                        <ul>
                            <li><a href="#">Drop Down 1</a></li>
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
                    <li><a class="nav-link scrollto" href="#contact">Contact</a></li>
                    <!-- <li><router-link class="nav-link scrollto " :to="{ name: 'why_us' }">Why Choose us</router-link></li> -->
                </ul>
                <i class="bi bi-list mobile-nav-toggle"></i>
            </nav>
            <span>
                <!-- <router-link :to="{ name: 'booking' }" class="book-a-table-btn scrollto">Reservation</router-link> -->
                <button class=" book-a-table-btn scrollto" @click="show">Reservation</button>
            </span>


        </div>
    </header>
</template>

<script>

export default {
    name: 'Header-index',
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

    }

}
</script>

<style scoped>
#header {
    top: 0px !important;
}


li .router-link-exact-active {
    color: rgb(236, 206, 37);
}

span .router-link-exact-active {
    color: rgb(131, 65, 35)
}
</style>
