<template>
    <div class=" container-fluid">

        <div class=" row">
            <nav class="col-lg-3 col-2 col-1">
                <div class="nav-body ">
                    <ul class="list-group">
                        <li class="text-start">
                            <router-link :to="{ name: 'main_dashboard' }">
                                xxx
                                <span class="h3 d-none d-lg-inline">
                                    Dashboard
                                </span>
                                <hr>
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{ name: 'user_Profile' }">

                                <i class="fa-regular fa-user me-2"></i>
                                <span class="nav-item d-none d-lg-inline">User Profile</span>
                            </router-link>
                        </li>

                        <li>
                            <router-link :to="{ name: 'user_Check' }">
                                <i class="fa-solid fa-clock-rotate-left me-2"></i>
                                <span class="nav-item d-none d-lg-inline">User Orders</span>
                            </router-link>
                        </li>

                    </ul>
                    <hr>
                    <ul class="list-group">
                        <li class="admin-nav-list">
                            <router-link :to="{ name: 'food-List' }">
                                xxx <span class="nav-item d-none d-lg-inline">Food-List</span>
                            </router-link>
                        </li>
                        <li class="admin-nav-list">
                            <router-link :to="{ name: 'food-List' }">
                                xxx <span class="nav-item d-none d-lg-inline">Food-List</span>
                            </router-link>
                        </li>
                        <li class="admin-nav-list">
                            <router-link :to="{ name: 'food-List' }">
                                xxx <span class="nav-item d-none d-lg-inline">Food-List</span>
                            </router-link>
                        </li>
                        <li class="admin-nav-list">
                            <router-link :to="{ name: 'food-List' }">
                                xxx <span class="nav-item d-none d-lg-inline">Food-List</span>
                            </router-link>
                        </li>
                    </ul>
                </div>


            </nav>

            <main class="col-lg-9 col-10  p-2">
                <div class="main-wrap bg-secondary bg-gradient ">
                    <router-view />
                </div>
            </main>

        </div>

    </div>
</template>

<script>
export default {

    mounted() {
        console.log('dashboard route');
    }
}
</script>

<style scoped>
ul li {
    list-style: none;
    margin-top: 20px;
}



nav {
    position: relative;
    background: url('../../../../public/assets/img/dashboard-nav-background.jpg');
    /* height: 100%; */
    background-color: red;
    /* padding: 20px; */
}

.nav-body {
    position: fixed;
    top: 80px;
    z-index: 99;
    padding: 0 12px;

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
    min-height: 85vh;
    margin-top: 75px;
}

/* @media (max-width: 992px) {
    .nav-body {
        max-width: 300px;
    }
} */
</style>

