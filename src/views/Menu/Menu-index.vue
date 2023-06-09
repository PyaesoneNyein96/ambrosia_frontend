<template>
    <div>
        <section id="menu" class="menu mt-3">
            <div class="container">

                <div class="section-title">
                    <h2>Check our tasty <span>Menu</span></h2>
                </div>

                <div class="row">
                    <div class="col-lg-12 d-flex justify-content-center">
                        <ul id="menu-flters">
                            <li data-filter="*" class="filter-specialty" @click="GetSpecific('All')"
                                :class="{ 'filter-active': classForAll == 'All' }">
                                Show All
                            </li>

                            <li data-filter="filter-specialty" v-for="c in Categories" :key="c.id"
                                @click="GetSpecific(c.id)" :class="{ 'filter-active': isActive == c.id }">
                                {{ c.name }}
                            </li>

                        </ul>
                    </div>
                </div>



                <div class="row menu-container" v-if="MenuList != 0">


                    <div class="col-lg-6 menu-item filter-starters " v-for="menu in MenuList" :key="menu">
                        <div class="menu-content">
                            <a href="#">{{ menu.name }}</a><span>${{ menu.price }}</span>
                        </div>
                        <div class="info-wrap mt-2 d-flex justify-content-evenly">
                            <div class="img-wrap me-2">
                                <img :src="menu.image" alt="Food" style="width:70px">
                            </div>
                            <div class="menu-ingredients">
                                {{ menu.description }}
                            </div>
                        </div>

                    </div>

                </div>

                <div class="row menu-container" v-else>
                    <div class="wrap text-center mt-5">
                        <h3 class="">There is no Menu items yet . . .
                            <span class="span men-content"> <router-link :to="{ name: 'home' }">Back to home</router-link>
                            </span>
                        </h3>

                    </div>
                </div>

            </div>
        </section>


    </div>
</template>

<script>

import { mapGetters } from 'vuex'


export default {
    name: 'Menu-index',
    data() {
        return {
            isActive: '',
            classForAll: ''
        }
    },
    computed: {
        ...mapGetters({
            MenuList: 'food/getFoodList',
            Categories: 'food/getCategories'
        })
    },
    methods: {
        GetSpecific(i) {
            this.$store.dispatch('food/GetSpecific_All', i);




            // play with active class
            if (i == 'All') {
                this.x()
            } else {
                this.activeClass(i)
            }
        },

        x() {
            this.classForAll = 'All';
            this.isActive = null
        },

        activeClass(i) {
            this.isActive = i;
            this.classForAll = null
        },



    },


    mounted() {
        this.$store.dispatch('food/GetSpecific_All', 'All');


        this.$store.dispatch('food/getCategories');

    },
    // beforeUpdate() {
    //     console.log(this.MenuList);
    // }
}
</script>

<style scoped>
#menu {
    min-height: 70vh;
}
</style>
