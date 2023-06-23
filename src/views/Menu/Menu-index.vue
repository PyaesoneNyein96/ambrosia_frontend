<template>
    <div class="bg-wrap">
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


                    <TransitionGroup name="item" appear>

                        <div class="col-lg-6 menu-item filter-starters scroll" v-for="menu in MenuList" :key="menu">
                            <div class="menu-content">
                                <a href="#">{{ menu.name }}</a><span>${{ menu.price }}</span>
                            </div>
                            <div class="info-wrap mt-2 d-flex justify-content-between">
                                <div class="img-wrap me-2">
                                    <img :src="menu.image" alt="Food" class="img">
                                </div>
                                <div class="menu-ingredients  w-50 ">
                                    {{ menu.description }}
                                </div>
                                <div class="btn-wrap">
                                    <button class="btx me-1 mb-1 btn-eff" @click="detail(menu.id)">Detail</button>
                                    <button class="btx btn-eff mb-1" @click="cartFood(menu.id)"
                                        :disabled="isDisabled">Order</button>
                                </div>
                            </div>

                        </div>
                    </TransitionGroup>

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
import { smsInform } from '../../store/Notify/notify.js'

export default {
    name: 'Menu-index',
    data() {
        return {
            isActive: '',
            classForAll: '',
            isDisabled: false
        }
    },
    computed: {
        ...mapGetters({
            MenuList: 'food/getFoodList',
            Categories: 'food/getCategories',
            auth: 'auth/getAuth',
        })
    },

    methods: {
        GetSpecific(i) {
            this.$store.dispatch('food/GetSpecific_All', i);

            // play with active class
            if (i == 'All') {
                this.all()
            } else {
                this.activeClass(i)
            }
        },

        all() {
            this.classForAll = 'All';
            this.isActive = null
        },

        activeClass(i) {
            this.isActive = i;
            this.classForAll = null
        },
        // =========================================



        cartFood(id) {

            if (this.auth) {
                this.disabled = true

                this.$store.dispatch('cart/setCartFood', { food_id: id }).then(() => {
                    this.disabled = false
                })
            } else {
                this.$router.push({ name: 'login' })
                    .then(() => {
                        smsInform(this.$store.commit, 'To make order', 'Please login or register first')
                    })
            }
        },


        detail(i) {
            this.$store.dispatch('food/detailFood', i)
        }





    },


    mounted() {
        this.$store.dispatch('food/getCategories');
        if (!this.MenuList) {
            this.$store.dispatch('food/GetSpecific_All', 'All');
        }
    },


}
</script>

<style scoped>
#menu {
    /* min-height: 100vh; */
}

.bg-wrap {
    min-height: 100vh;
    top: 0;
    background: url('../../../public/assets/img/logo/menu.jpg') top no-repeat;
    position: relative;
    background-size: cover;
    padding-top: 0px;
}

.bg-wrap::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9;
    background-color: rgba(255, 255, 255, 0.821);
}

.container {
    position: relative;
    z-index: 10;
}

.img {
    width: 150px;
    height: 100px;
    object-fit: cover;
    transition: all 0.4s ease-in-out;
}

.img:hover {

    transform: translateX(5px) scale(1.05);
    border-radius: 8px;
    box-shadow: 2px 10px 20px gray;

}


/* Transition  */

.item-enter-from,
.item-leave-to {
    opacity: 0;
    /* transition: all 0.3s ease-in-out; */
}

.item-enter-active {
    /* transition: all 0.3s ease-in-out; */
    /* transform: translateY(50%); */
}

.item-leave-active {
    position: absolute;
    /* width: 20%; */
    transition: all 0.3s ease-in;
    transform: translateX(50%);
}

.item-enter-to,
.item-leave-from {
    opacity: 1;
    transition: all 1s ease-in-out;
}

.item-move {
    transition: transform 1s ease-in-out;
}
</style>
