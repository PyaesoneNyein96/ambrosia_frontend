<template>
    <div class="bg-transparent bg-gradient" style="height: 100vh;">

        <Carousel class="pt-0" :items-to-show="1" :wrap-around='true' :autoplay="3000" :transition="4500" v-if="slides">
            <Slide v-for="slide in slides" :key="slide.id">
                <Transition name="carousel" appear>
                    <div class="slide-img" :style="{ background: `url(${slide.url})` }">
                        <div class=" slide-up">
                            <h2 class="title">Ambrosia</h2>
                            <div class="slide-text">{{ slide.description }}</div>
                        </div>
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




export default {
    name: 'Carousel-index',
    components: {
        Carousel,
        Slide,
        // Pagination
    },
    data() {
        return {
            sr: null,

            slides: [
                {
                    id: 1,
                    title: 'Ambrosia',
                    description: `A world of mouthwatering creations. From hors d'oeuvres to desserts, our restaurant carousel presents
                    artful dishes that will leave you longing for more.`,
                    url: 'https://london.danslenoir.com/templates/yootheme/cache/a3/SHOOTING_WEBSITE_13-a3055975.jpeg',
                },
                {
                    id: 2,
                    title: 'Ambrosia',
                    description: `An enchanting dining adventure with rotating dishes. Succulent steaks, fresh seafood, and delightful
                        surprises await.`,
                    url: 'https://images.unsplash.com/photo-1534470397273-a1c104354754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1331&q=80',
                },
                {
                    id: 3,
                    title: 'Ambrosia',
                    description: `Where culinary fantasies come alive. Imaginative dishes with seasonal ingredients. Farm-to-table freshness and modern twists on classics.`,
                    url: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
                },
            ]


        }
    },






}
</script>

<style scoped>
.slide-img {
    margin-top: 0px;
    width: 100vw;
    height: 100vh;
    background-position-y: center !important;
    object-fit: cover !important;
    background-repeat: no-repeat;
}


.slide-up {
    bottom: 4.7%;
    min-height: 8em;
    position: absolute;
    left: 8%;
    right: 10%;
    z-index: 999;
    background-color: rgba(39, 38, 41, 0.648);
    text-align: start;
    padding: 1em;
    border-radius: 0.7em;
    color: rgb(255, 255, 255);
    box-shadow: 1px 0px 5px rgba(76, 62, 62, 0.422);
    opacity: 1 !important;
    transition: all 2.3s ease-in-out;
}

h1,
h2 {
    color: goldenrod;
}

.slide-text {
    color: rgb(148, 151, 250);
    font-size: 1.2em !important;
    text-shadow: 1px 1px 40px lightblue;
}

@media (max-width:500px) {
    .slide-text {
        color: rgb(148, 151, 250);
        font-size: 1.2em !important;
        text-shadow: 1px 1px 40px lightblue;
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
</style>
