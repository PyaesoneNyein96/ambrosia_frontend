<template>
    <swiper :scrollbar="{
        hide: true,
    }" :modules="modules" :autoplay="1000" class="mySwiper" style="cursor: pointer;">


        <swiper-slide v-for="slide in img" :key="slide.id">

            <div :style="{ background: `url(${slide.url})` }" class="slide-img">
                <div class="slide-text">
                    <h2 class="slide-title">{{ slide.title }}</h2>
                    <p :id='slide.id'>{{ slide.description }}</p>
                </div>
            </div>

        </swiper-slide>
    </swiper>
</template>

<script>

import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/scrollbar';
import '../../../public/CustomStyle/style.css';
import 'swiper/css/autoplay'
import { Scrollbar } from 'swiper';



export default {
    name: 'Carousel-index',
    components: {
        Swiper,
        SwiperSlide
    },
    data() {
        return {
            modules: [Scrollbar],
            img: [
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

.slide-text {
    position: absolute;
    bottom: 6.5%;
    left: 8%;
    right: 10%;
    z-index: 999;
    background-color: rgba(136, 122, 84, 0.61);
    text-align: start;
    padding: 1em;
    border-radius: 0.7em;
    color: rgb(255, 255, 255);
    box-shadow: 1px 0px 5px rgb(76, 62, 62);
}
</style>
