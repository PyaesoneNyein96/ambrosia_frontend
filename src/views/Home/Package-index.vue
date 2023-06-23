<template>
    <div class="container-fluid ">
        <div class="row mb-3 inner-container" v-for="pack in packagesList" :key="pack.id">

            <div class="col-lg-9 col-md-8 slide-wrap">

                <PackageCarousel :pack="pack.food" class="scroll" />


            </div>

            <div class="col-lg-3 col-md-4 ">
                <div class="detail-wrap">
                    <div class="detail scroll">
                        <div class="">
                            Sub Total: <span class="text-muted text-decoration-line-through"> {{ pack.sub_total }} $</span>
                        </div>
                        <div class="">
                            Percentage: <span class="text-danger">- {{ pack.percentage }}</span> %
                        </div>
                        <div class="">
                            Total Amount:
                            <span class="text-success">
                                {{ pack.net_total }} $$
                            </span>
                        </div>

                        <div class="mt-3">
                            <button class="btn  detail-btn rounded-0" @click="cartPackage(pack.id)">
                                Order Now
                            </button>

                        </div>
                    </div>
                </div>

            </div>

        </div>

    </div>
</template>

<script>

import { mapGetters } from 'vuex'
import PackageCarousel from '../Carousel/package-carousel'

import ScrollReveal from 'scrollreveal';
import { smsInform } from '../../store/Notify/notify.js'

export default {

    name: 'Package-index',
    components: {
        PackageCarousel
    },
    data() {
        return {
            // key: value
        }
    },
    computed: {

        ...mapGetters({
            packagesList: 'package/getAdminPackage',
            auth: 'auth/getAuth'
        })

    },

    methods: {
        cartPackage(id) {

            if (this.auth) {
                this.$store.dispatch('cart/setCartFood', { package_id: id })
            } else {
                this.$router.push({ name: 'login' })
                    .then(() => {
                        smsInform(this.$store.commit, 'To make order', 'Please login or register first')
                    })
            }

        },



    },

    mounted() {
        ScrollReveal().reveal('.scroll', {
            distance: '50px',
            delay: 100,
            duration: 800,
            easing: 'ease-in',
            origin: 'bottom',
            reset: true,
            viewFactor: 0.2
        });
    },

    beforeMount() {
        if (!this.packagesList) {
            this.$store.dispatch('package/getAllPackage')
        }
        // console.log(this.packagesList);
    }

}
</script>

<style scoped>
.container-fluid {
    min-height: 100vh;
    padding-top: 80px;
    background: url('../../../public/assets/img/slide/slide-3.jpg') center center no-repeat;
    position: relative;
    background-size: cover;
}

.container-fluid::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9;
    background-color: rgba(255, 255, 255, 0.367);
}

.inner-container {
    position: relative;
    z-index: 10;
}


.detail-wrap {
    /* min-width: 220px; */
    display: flex;
    justify-content: center;
    align-items: center;
    /* background-color: rgb(255, 255, 255); */
    height: 100%;
    border: 1px solid gray;
}

.detail {
    background-color: rgba(235, 252, 231, 0.666);
    /* padding-left: 20px; */
    padding: 20px 0 20px 30px;
    /* text-align: center; */
    border-radius: 15px;
    width: 100%;
    box-shadow: inset 0px 0px 20px rgba(0, 0, 0, 0.582);
}



/* Button Effect */

.btn {
    position: relative;
    z-index: 0;
    cursor: pointer;
    color: #f1f1f1;
    border: none;
    background-color: rgb(82, 73, 19);
}

.btn::after {
    content: "";
    position: absolute;
    top: 0;
    z-index: -1;
    transition: all 0.5s ease-in-out;
}

.detail-btn:hover.detail-btn::after {
    width: 100%;
}

.detail-btn:hover {
    color: rgb(255, 255, 255);
    background-color: rgba(46, 49, 2, 0.718);
}

.detail-btn::after {
    left: 0;
    width: 0;
    height: 100%;
    background: linear-gradient(to left, rgba(68, 55, 4, 0.953), #ffc107b4, rgba(255, 217, 0, 0.804), rgb(214, 214, 1));
}
</style>
