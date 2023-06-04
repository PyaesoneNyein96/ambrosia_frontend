<template>
    <div class="bg-dark bg-gradient">
        <Carousel class="pt-0" :items-to-show="1" :wrap-around='true' :autoplay="3000" :transition="2500" v-if="slides">
            <Slide v-for="slide in slides" :key="slide">
                <Transition name="carousel" appear>
                    <div class="slide-img" :style="{ background: `url(${slide.url})` }">
                        <div class="slide-text-wrap">
                            <h2>Ambrosia</h2>
                            <h4 class="slide-text">{{ slide.description }}</h4>
                        </div>
                    </div>
                </Transition>
            </Slide>

            <template #addons>
                <Pagination />
            </template>
        </Carousel>
    </div>
</template>

<script>

/* eslint-disable */

import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination } from 'vue3-carousel'
// import '../../../public/CustomStyle/style.css';


export default {
    name: 'Carousel-index',
    components: {
        Carousel,
        Slide,
        Pagination
    },
    data() {
        return {

            slides: [
                {
                    id: 1,
                    title: 'Ambrosia',
                    description: `A world of mouthwatering creations. From hors d'oeuvres to desserts, our restaurant carousel presents
                    artful dishes that will leave you longing for more.`,
                    // url: 'https://images.wallpaperscraft.com/image/single/restaurant_table_interior_39288_1920x1080.jpg',
                    url: 'https://london.danslenoir.com/templates/yootheme/cache/a3/SHOOTING_WEBSITE_13-a3055975.jpeg',
                },
                {
                    id: 2,
                    title: 'Ambrosia',
                    description: `An enchanting dining adventure with rotating dishes. Succulent steaks, fresh seafood, and delightful
                        surprises await.`,
                    url: 'https://primalhfx.ca/wp-content/uploads/2017/12/Char5-1920x1080.jpg',
                },
                {
                    id: 3,
                    title: 'Ambrosia',
                    description: `Where culinary fantasies come alive. Imaginative dishes with seasonal ingredients. Farm-to-table freshness and modern twists on classics.`,
                    url: 'https://images8.alphacoders.com/104/1046601.jpg',
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
}

.slide-text-wrap {
    min-height: 8em;
    position: absolute;
    bottom: 6.5%;
    left: 8%;
    right: 10%;
    z-index: 999;
    background-color: rgba(39, 38, 41, 0.648);
    text-align: start;
    padding: 1em;
    border-radius: 0.7em;
    color: rgb(255, 255, 255);
    box-shadow: 1px 0px 5px rgba(76, 62, 62, 0.422);
    opacity: 1;
}

h1,
h2 {
    color: goldenrod;
}

.slide-text {
    color: rgb(148, 151, 250);
    font-size: 1.5em !important;
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
