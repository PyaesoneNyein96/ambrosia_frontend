<template>
    <div class="carousel-wrap">
        <Carousel v-bind="settings" class="p-0" :autoplay="1000" :transition="1000" :pauseAutoplayOnHover="true"
            :wrap-around='true'>
            <Slide v-for="slide in pack" class="m-0 shadow-sm" :key="slide">
                <div class="img-wrap">
                    <img :src="slide.image" class="img card-img">
                    <div class="hidden-hover">
                        <div class="inner-hidden">
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
            itemsToShow: 1,
            snapAlign: 'center',
        },

        breakpoints: {
            // 700px and up
            700: {
                itemsToShow: 3.5,
                snapAlign: 'center',
            },
            // 1024 and up
            1024: {
                itemsToShow: 4,
                snapAlign: 'start',
            },
        },
    }),



})
</script>

<style scoped>
.img {
    position: relative;
    width: 100%;
    height: 60px;
    object-fit: cover;
    border-radius: 2px;
    box-shadow: 0px 10px 10px rgba(3, 26, 3, 0.734);
    transition: all 0.3s ease-in-out;
}

.img:hover {
    transform: scale(1.01);
    cursor: pointer;
}

.img-wrap {
    position: relative;
    padding: 0;
}

.hidden-hover {
    transition: all 0.4s ease-in-out;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 200px;
    bottom: -100px;
    padding-top: 70px;
    cursor: pointer;
    user-select: none;
}

.hidden-hover:hover.hidden-hover {
    bottom: -50px;
}

.inner-hidden {
    background-color: rgba(0, 107, 128, 0.466);
    width: 80%;
    /* padding: 10px; */
}

h5,
.title {
    font-size: 12px;
}


.carousel-wrap {
    padding: 10px 0;
    width: 100%;
    background-color: rgba(255, 0, 0, 0.004);
    box-shadow: inset 0px 0px 150px rgba(0, 0, 0, 0.04);
    /* border-radius: 15px; */
}
</style>
  