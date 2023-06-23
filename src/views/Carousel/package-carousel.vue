<template>
    <div class="carousel-wrap">
        <Carousel v-bind="settings" :breakpoints="breakpoints" class="mt-4 p-0" :autoplay="500" :transition="1500"
            :pauseAutoplayOnHover="true" :wrap-around='true'>
            <Slide v-for="slide in pack" class=" shadow-sm" :key="slide">
                <div class="img-wrap">
                    <img :src="slide.image" class="img card-img">
                    <div class="hidden-hover">
                        <div class="inner-hidden">
                            <h5 class="h5 title text-light  fw-bold">{{ slide.name }}</h5>
                            <div class="title text-light">Price:{{ slide.price }} $</div>
                        </div>
                    </div>
                </div>
            </Slide>

        </Carousel>
    </div>
</template>
  
<script>
import { defineComponent } from 'vue'
import { Carousel, Slide } from 'vue3-carousel'

import 'vue3-carousel/dist/carousel.css'


export default defineComponent({

    components: {
        Carousel,
        Slide,
    },
    props: [
        'pack'
    ],
    data: () => ({
        settings: {
            itemsToShow: 1.1,
            snapAlign: 'center',
        },
        breakpoints: {
            // 700px and up
            700: {
                itemsToShow: 2,
                snapAlign: 'center',
            },
            // 1024 and up
            1024: {
                itemsToShow: 3.56,
                snapAlign: 'center',
            },
        },


    }),



})
</script>

<style scoped>
.img {
    position: relative;
    height: 220px;
    width: 250px;
    object-fit: cover;
    border-radius: 8px;
    box-shadow: 0px 10px 10px rgba(3, 26, 3, 0.734);
    transition: all 0.3s ease-in-out;
}

.img:hover {
    transform: scale(1.01);
    cursor: pointer;
}

.img-wrap {
    position: relative;
}

.hidden-hover {
    transition: all 0.8s ease-in-out;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 400px;
    bottom: -200px;
    padding-top: 150px;
    cursor: pointer;
    user-select: none;
}

.hidden-hover:hover.hidden-hover {
    bottom: -90px;
}

.inner-hidden {
    background-color: rgba(0, 107, 128, 0.466);
    width: 100%;
    padding: 10px;
}


.carousel-wrap {
    padding: 10px;
    background-color: rgba(255, 0, 0, 0.004);
    box-shadow: inset 0px 0px 150px rgb(0, 0, 0);
    border-radius: 15px;
}

/* ------------------------ */

.carousel__slide {
    padding: 10px 0;
}

.carousel__viewport {
    perspective: 2000px !important;
    /* perspective: auto; */
}

.carousel__track {
    transform-style: preserve-3d;
}

.carousel__slide--sliding {
    transition: 0.5s;
}

.carousel__slide {
    opacity: 0.9;
    transform: rotateY(-20deg) scale(0.9);
}

.carousel__slide--active~.carousel__slide {
    transform: rotateY(20deg) scale(0.9);
}

.carousel__slide--prev {
    opacity: 1;
    transform: rotateY(-10deg) scale(0.95);
}

.carousel__slide--next {
    opacity: 1;
    transform: rotateY(10deg) scale(0.95);
}

.carousel__slide--active {
    opacity: 1;
    transform: rotateY(0) scale(1.1);
}
</style>
  