<template>
    <div class="bg-transparent bg-gradient" style="height: 100vh;">

        <Carousel class="pt-0" :items-to-show="1" :wrap-around='true' :autoplay="5000" :transition="1500" v-if="slides">
            <Slide v-for="slide in slides" :key="slide.id" class="slide">
                <Transition name="carousel" appear>
                    <div class="slide-img" :style="{ background: `url(${slide.url})` }">
                        <h2 class=" slide-up fw-bold" :class="slide.class">
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
                    id: 3,
                    title: 'Ambrosia',
                    description: `Where culinary fantasies come alive. Imaginative dishes with seasonal ingredients. Farm-to-table freshness and modern twists on classics.`,
                    url: 'https://irp-cdn.multiscreensite.com/b0e4701c/dms3rep/multi/bigstock-Table-Of-Italian-Meals-On-Plat-368417779.jpg',
                    class: 'text-two'
                },
                {
                    id: 1,
                    title: 'Ambrosia',
                    description: `A world of mouthwatering creations. From hors d'oeuvres to desserts, our restaurant carousel presents
                    artful dishes that will leave you longing for more.`,
                    url: 'https://mekhalaliving.com/wp-content/uploads/2023/02/Website-Banner-Indian-Range-Teaser-1920-x-1080.png',
                    class: 'text-one'
                },
                {
                    id: 2,
                    title: 'Ambrosia',
                    description: `An enchanting dining adventure with rotating dishes. Succulent steaks, fresh seafood, and delightful
                        surprises await.`,
                    url: 'https://cdn.shopify.com/s/files/1/1657/0407/files/fody-header-11-06.jpg?v=1667839737&width=2000',
                    class: 'text-one'
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
    box-shadow: inset 0px 0px 100px 50px rgba(38, 38, 36, 0.863);
    /* box-shadow: 0 8px 6px -6px black; */
}


.slide-up {
    bottom: 34.7%;
    min-height: 8em;
    width: 40%;
    position: absolute;
    /* left: 10%; */
    z-index: 999;
    /* background-color: rgba(39, 38, 41, 0.648); */
    text-align: start;
    padding: 1em;
    border-radius: 0.7em;
    color: rgb(122, 193, 201);
    box-shadow: 1px 0px 5px rgba(76, 62, 62, 0.06);
    opacity: 1 !important;
    transition: all 2.3s ease-in-out;
}

.text-one {
    bottom: 30.7%;
    min-height: 8em;
    width: 40%;
    position: absolute;
    left: 8% !important;
    right: 10% !important;
    z-index: 999;
    color: rgb(128, 20, 20);
}

.text-two {
    bottom: 30.7%;
    min-height: 8em;
    width: 40%;
    position: absolute;
    /* left: 8%; */
    right: 8% !important;
    z-index: 999;
    /* font-size: 30px; */
    color: rgb(8, 51, 1);
}




h1,
h2 {
    color: goldenrod;
}

.slide-up * {
    color: rgb(148, 151, 250);
    /* font-size: 1.5em !important; */
    text-shadow: 1px 1px 40px rgb(193, 216, 224);
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
