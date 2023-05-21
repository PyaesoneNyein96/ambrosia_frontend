<template>
    <swiper :scrollbar="{
        hide: true,
    }" :modules="modules" class="mySwiper" style="cursor: pointer;">


        <swiper-slide v-for="slide in img" :key="slide">

            <div :style="{ background: `url(${slide.url})` }" class="slide-img">
                <div class="slide-text">
                    <h2 class="slide-title">{{ slide.title }}</h2>
                    <p>{{ slide.description }}</p>
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
                    title: 'Ambrosia',
                    description: `A world of mouthwatering creations. From hors d'oeuvres to desserts, our restaurant carousel presents
                    artful dishes that will leave you longing for more.`,
                    url: 'https://images.wallpaperscraft.com/image/single/restaurant_table_interior_39288_1920x1080.jpg',
                },
                {
                    title: 'Ambrosia',
                    description: `An enchanting dining adventure with rotating dishes. Succulent steaks, fresh seafood, and delightful
                        surprises await.`,
                    url: 'https://www.sanssouci-wien.com/wp-content/uploads/2017/02/veranda_essen-genie%C3%9Fen-im-sans-souci-wien_c_stefan-gergely-1920x1080.jpg',
                },
                {
                    title: 'Ambrosia',
                    description: `Where culinary fantasies come alive. Imaginative dishes with seasonal ingredients. Farm-to-table freshness and modern twists on classics.`,
                    url: 'https://coolwallpapers.me/picsup/6006625-bar-chairs-interior-restaurant-table-bar-cafe.jpg',
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
    background-position-y: bottom !important;
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
