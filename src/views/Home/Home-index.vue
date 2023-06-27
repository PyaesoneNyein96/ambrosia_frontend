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


// import { v4 as uuidv4 } from 'uuid'

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
                easing: 'ease-in-out',
                origin: 'bottom',
                reset: false,
                viewFactor: 0.2
            });

            ScrollReveal().reveal('.scroll-2', {
                distance: '100px',
                delay: 300,
                duration: 1000,
                easing: 'ease-in-out',
                origin: 'bottom',
                reset: false,
                viewFactor: 0.2
            });

            ScrollReveal().reveal('.scroll-3', {
                distance: '100px',
                delay: 500,
                duration: 1300,
                easing: 'ease-in-out',
                origin: 'bottom',
                reset: false,
                viewFactor: 0.2
            });
        },



    },

    mounted() {
        this.scrollEff();
        this.$store.dispatch('food/GetSpecific_All', 'All')

    }


}
</script>

<style scoped>
.special {
    opacity: 1;
    background-color: rgba(240, 248, 255, 0.386);
}

.main {
    background-color: rgba(255, 255, 255, 0.432);
}

.wrap {
    /* background: url("../img/chefs-bg.jpg") center center no-repeat; */
    background: url("../../../public/assets/img/gallery/gallery-1.jpg") center no-repeat;
    background-size: cover;
    /* padding: 60px 0; */
    position: relative;
}

.custom {
    background-color: rgba(237, 237, 212, 0.404);
}
</style>
