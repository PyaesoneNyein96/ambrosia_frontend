<template>
    <div class="bg-transparent bg-gradient" style="height: 100vh;">

        <Carousel class="pt-0" :items-to-show="1" :wrap-around='true' :autoplay="5000" :transition="1500" v-if="slides">
            <Slide v-for="slide in slides" :key="slide.id" class="slide">
                <Transition name="carousel" appear>
                    <div class="slide-img" :style="{ background: `url(${slide.image})` }">
                        <h2 class=" slide-up " :class="slide.position" :style="{ 'color': slide.color }">
                            <div class="title fw-bold mb-3" :style="{ 'color': slide.color }">
                                {{ slide.title }}
                            </div>
                            {{ slide.description }}

                        </h2>
                    </div>
                </Transition>
            </Slide>
        </Carousel>
    </div>
</template>

<script>

/* eslint-disable */

import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide } from 'vue3-carousel'

import { mapGetters } from 'vuex'


export default {
    name: 'Carousel-index',
    components: {
        Carousel,
        Slide,
        // Pagination
    },
    data() {
        return {

            slides: '',

        }
    },

    computed: {
        ...mapGetters({
            carousels: 'tool/getAllCarousel'
        })
    },

    watch: {
        carousels() {
            this.slides = this.carousels;
            console.log(this.slides);

        }
    },


    mounted() {
        this.$store.dispatch('tool/getAllCarousel')
    }







}
</script>

<style scoped>
.slide-img {
    margin-top: 0px;
    width: 100vw;
    height: 100%;
    background-position: center !important;
    background-size: cover !important;
    background-repeat: no-repeat !important;
    box-shadow: inset 0px 0px 100px 50px rgba(38, 38, 36, 0.863);
}

.title {
    font-size: 50px;
    color: #960a0a !important;
    text-shadow: 1px 1px 0.5px rgb(135, 141, 133) !important
}

.slide-up {
    bottom: 24.7%;
    min-height: auto;
    width: 45%;
    position: absolute;
    z-index: 999;
    font-size: 30px;
    text-align: start;
    padding: 1em;
    border-radius: 0.7em;
    color: rgba(251, 6, 6, 0.699);
    box-shadow: 1px 0px 5px rgba(76, 62, 62, 0.06);
    opacity: 1 !important;
    transition: all 2.3s ease-in-out;
    background-color: rgba(159, 214, 243, 0.09);
}

.slide-left {
    bottom: 10.7%;
    left: 5% !important;
    z-index: 999;
}

.slide-right {
    text-align: end;
    bottom: 10.7%;
    right: 5% !important;
    z-index: 999;
}

.slide-center {
    text-align: center;
    bottom: 20.7%;
    left: 30% !important;
    z-index: 999;
}

.color {
    /* color: #daa520 !important; */
    color: white !important;
}



h1,
h2 {
    color: #daa520;
}

.slide-up * {
    color: rgb(148, 151, 250);
    /* font-size: 1.5em !important; */
    text-shadow: 1px 1px 40px rgb(193, 216, 224);
}

@media (max-width:500px) {
    .slide-up {
        bottom: 0%;
        width: 100% !important;
        left: 1% !important;
        right: 1% !important;
        height: fit-content;
        color: rgb(255, 255, 255);
        font-size: 1.5em !important;
        text-shadow: 1px 1px 40px lightblue;
        font-weight: 500;
        background-color: rgba(0, 115, 255, 0.248);
        border-radius: 5px;
    }

}


.carousel-enter-active,
.carousel-leave-active {
    transition: all 1s ease;
    opacity: 1;
}

.carousel-enter-from,
.carousel-leave-to {
    opacity: 0;
    transform: translateY(-40%);
}

/*  */


.slide-img {
    min-height: 100vh;
    top: 0;
    background: url('../../../public/assets/img/logo/menu.jpg') top no-repeat;
    position: relative;
    background-size: cover;
    padding-top: 0px;
}


.slide-img {
    position: relative;
    z-index: 10;
}
</style>
