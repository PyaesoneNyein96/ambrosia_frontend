<template>
    <div class=" container-fluid">

        <div class="row">
            <nav class="col-lg-2 col-2">
                <div class="nav-body ">
                    <ul class="list-group">
                        <li>
                            <router-link :to="{ name: 'main_dashboard' }">
                                <i class="fa-solid fa-desktop me-1"></i>
                                <span class="h4 d-none d-lg-inline">
                                    Dashboard
                                </span>
                                <hr>
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{ name: 'user_Profile' }">

                                <i class="fa-regular fa-user"></i>
                                <span class="nav-item d-none d-lg-inline">User Profile</span>
                            </router-link>
                        </li>

                        <li>
                            <router-link :to="{ name: 'user_Check' }">
                                <i class="fa-solid fa-clock-rotate-left"></i>
                                <span class="nav-item d-none d-lg-inline">User Orders</span>
                            </router-link>
                        </li>

                    </ul>
                    <hr>

                    <TransitionGroup name="down">
                        <ul class="list-group" v-if="isAdmin">

                            <li class="admin-nav-list">
                                <i class="fa-solid fa-user-shield  "></i>
                                <span class="d-none d-lg-inline  text-muted shadow p-1 rounded-2 bg-gradient pe-2 ms-2"
                                    style="font-size: 15px;">
                                    Admin </span>
                            </li>
                            <li class="admin-nav-list">
                                <router-link :to="{ name: 'food_List' }">
                                    <i class="fa-solid fa-bowl-rice"></i>
                                    <!-- <i class="fa-solid fa-bowl-food"></i> -->
                                    <span class="nav-item d-none d-lg-inline">Food-List</span>
                                </router-link>
                            </li>
                            <li class="admin-nav-list">
                                <router-link :to="{ name: 'food_Add' }">
                                    <i class="fa-solid fa-circle-plus"></i>
                                    <span class="nav-item d-none d-lg-inline">Food-Add</span>
                                </router-link>
                            </li>

                            <li class="admin-nav-list">
                                <router-link :to="{ name: 'package_add' }">
                                    <i class="fa-solid fa-gift"></i>
                                    <span class="nav-item d-none d-lg-inline">Packages</span>
                                </router-link>
                            </li>

                            <li class="admin-nav-list">
                                <router-link :to="{ name: 'category' }">
                                    <!-- <i class="fa-solid fa-table-columns"></i> -->
                                    <i class="fa-solid fa-table-cells"></i>
                                    <span class="nav-item d-none d-lg-inline">Categories</span>
                                </router-link>
                            </li>

                            <li class="admin-nav-list">
                                <router-link :to="{ name: 'tag' }">
                                    <i class="fa-solid fa-tags"></i>
                                    <span class="nav-item d-none d-lg-inline">Tags</span>
                                </router-link>
                            </li>
                            <li class="admin-nav-list">
                                <router-link :to="{ name: 'user_list' }">
                                    <i class="fa fa-users" aria-hidden="true"></i>
                                    <span class="nav-item d-none d-lg-inline">Users</span>
                                </router-link>
                            </li>


                        </ul>
                    </TransitionGroup>
                </div>


            </nav>

            <main class="col-lg-10 col-10 first-wrap p-2">
                <div class="main-wrap shadow rounded rounded-3  p-1 bg-gradient ">

                    <router-view />

                </div>
            </main>

        </div>

    </div>
</template>

<script>
export default {

    data() {
        return {

        }
    },

    computed: {
        isAdmin() {
            return this.$store.getters['auth/isAdmin']
        }
    },

}
</script>

<style scoped>
ul li {
    list-style: none;
    margin-top: 15px;
}



nav {
    position: relative;
    background: url('../../../../public/assets/img/navBackground/dashboard-nav-background.jpg');

}

.nav-body {
    margin-top: 80px;
    padding: 0 30px;
    margin-left: 100px;
    text-align: start;

}

li a {
    color: whitesmoke;
}



.nav-item {
    color: white;
    font-size: 20px;
    transition: all 0.3s ease-in-out;
}

.nav-item:hover {
    color: rgb(159, 120, 21);
}

.main-wrap {
    background-color: white;
    min-height: 86vh;
    margin-top: 75px;
}

.first-wrap {
    background-color: rgba(51, 42, 21, 0.908);
}

/* MEDIA QUERY  */

@media (min-width: 1100px) {
    .nav-body {
        position: sticky;
        top: 100px;
        max-width: 300px;
        background-color: rgba(108, 87, 227, 0.082);
        padding: 20px 5px;
        border-radius: 10px;
        margin-top: 80px;
        margin-bottom: 20px;
        margin-left: 10px;
        text-align: start;
        padding-left: 2em;
    }

    .nav-item {
        color: white;
        font-size: 15px;

        transition: all 0.3s ease-in-out;
    }

    li i {
        margin-right: 20px;
    }

}

@media (max-width: 1100px) {
    .nav-body {
        position: sticky;
        top: 100px;
        max-width: 300px;
        background-color: rgba(90, 94, 19, 0.177);
        padding: 20px 5px;
        border-radius: 10px;
        margin-top: 80px;
        margin-left: 10px;
        text-align: start;
        padding-left: 1em;
    }

    .nav-item {
        color: white;
        font-size: 14px;
        transition: all 0.3s ease-in-out;
    }

    li i {
        margin-right: 0.5em;
    }

}

@media (max-width: 1000px) {
    .nav-body {
        position: sticky;
        top: 100px;
        max-width: 300px;
        background-color: rgba(90, 94, 19, 0.177);
        padding: 20px 5px;
        border-radius: 10px;
        margin-top: 80px;
        margin-left: 10px;
        text-align: center;
        /* padding-left: 1em; */
    }

    .nav-item {
        color: white;
        font-size: 14px;
        transition: all 0.3s ease-in-out;
    }

    li i {
        margin-right: 0.5em;
    }

}

@media (max-width: 700px) {
    .nav-body {
        position: sticky;
        top: 100px;
        max-width: 200px;
        background-color: rgba(90, 63, 25, 0.136);
        padding: 20px 5px;
        border-radius: 10px;
        margin-top: 80px;
        /* margin-left: 1.5em; */
        text-align: center;
    }

    .nav-item {
        color: white;
        font-size: 10px;
        transition: all 0.3s ease-in-out;
    }

}

@media (max-width: 500px) {
    .nav-body {
        position: sticky;
        top: 100px;
        max-width: 300px;
        background-color: rgba(89, 227, 87, 0.125);
        padding: 20px 10px;
        border-radius: 10px;
        margin-left: 0;
        /* padding-left: 1.3em; */
        text-align: center;
    }

    .nav-item {
        color: white;
        font-size: 10px;
        align-items: center;
        transition: all 0.3s ease-in-out;
    }

}

li a .router-link-active,
.router-link-exact-active {
    color: goldenrod
}


/* Transition */
.down-enter-active,
.down-leave-active {
    opacity: 1;
    transition: all 1s ease-in-out;
}

.down-enter-from,
.down-leave-to {
    opacity: 0;
    transform: translateY(-100%);
}
</style>

