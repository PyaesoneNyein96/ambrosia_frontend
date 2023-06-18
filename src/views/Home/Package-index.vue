<template>
    <div class="container-fluid ">
        <div class="row mb-1 inner-container" v-for="pack in packagesList" :key="pack.id">

            <div class="col-md-9 slide-wrap">

                <PackageCarousel :pack="pack.food" class="scroll" />


            </div>

            <div class="col-md-3 ">
                <div class="detail-wrap">
                    <div class="detail">
                        <div class="text-muted">
                            Sub Total: <span class="text-decoration-line-through"> {{ pack.sub_total }} $</span>
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
            packagesList: 'package/getAdminPackage'
        })

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
        console.log(this.packagesList);
    }

}
</script>

<style scoped>
.container-fluid {
    padding-top: 80px;
    background: url('../../../public/assets/img/slide/slide-3.jpg');
    position: relative;
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
    display: flex;
    justify-content: center;
    align-items: center;
    /* background-color: rgb(255, 255, 255); */
    height: 100%;
    border: 1px solid gray;
}

.detail {
    background-color: rgba(235, 252, 231, 0.666);
    padding: 80px;
    border-radius: 15px;
    width: 100%;
    box-shadow: inset 0px 0px 20px rgba(0, 0, 0, 0.582);
}
</style>
