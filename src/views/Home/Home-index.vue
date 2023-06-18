<template>
    <div>
        <div>
            <carousel />
        </div>

        <div class="wrap">


            <div class="main">

                <Special class="special" scroll="scroll" scroll2="scroll-2" scroll3="scroll-3" />

                <Customize scroll="scroll" scroll2="scroll-2" scroll3="scroll-3" />

                <Why scroll="scroll" scroll2="scroll-2" scroll3="scroll-3" />

                <About scroll="scroll" scroll2="scroll-2" scroll3="scroll-3" />







            </div>
        </div>
    </div>
</template>

<script>
import carousel from "../Carousel/Carousel-index";
import ScrollReveal from 'scrollreveal';

import Special from '../Home/Special-index'
import About from '../Home/About-Us'
import Customize from '../Home/customize-index'
import Why from '../Home/why-us'

export default {
    name: 'Home-index',
    components: {
        carousel,
        Special,
        About,
        Customize,
        Why
    },

    methods: {
        scrollEff() {
            ScrollReveal().reveal('.scroll', {
                distance: '100px',
                delay: 100,
                duration: 700,
                easing: 'ease-in',
                origin: 'bottom',
                reset: false,
                viewFactor: 0.2
            });

            ScrollReveal().reveal('.scroll-2', {
                distance: '100px',
                delay: 300,
                duration: 1000,
                easing: 'ease-in',
                origin: 'bottom',
                reset: false,
                viewFactor: 0.2
            });

            ScrollReveal().reveal('.scroll-3', {
                distance: '100px',
                delay: 500,
                duration: 1300,
                easing: 'ease-in',
                origin: 'bottom',
                reset: false,
                viewFactor: 0.2
            });
        }
    },

    mounted() {
        this.scrollEff()
    }


}
</script>

<style scoped>
.special {
    opacity: 0.8;
    background-color: aliceblue;
}

.main {
    background-color: rgba(245, 222, 179, 0.395);
}

.wrap {
    /* background: url("../img/chefs-bg.jpg") center center no-repeat; */
    background: url("https://w0.peakpx.com/wallpaper/204/885/HD-wallpaper-custom-food-store-wood-pattern-coffee-3d-retro-mural-for-the-restaurant-cafe-hotel-background-wall-pvc-fabric-textile-wallcoverings-food-vintage.jpg") center center no-repeat;
    background-size: cover;
    /* padding: 60px 0; */
    position: relative;
}

.custom {
    background-color: rgba(237, 237, 212, 0.87);
}
</style>
