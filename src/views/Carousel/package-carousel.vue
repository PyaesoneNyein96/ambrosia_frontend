<template>
    <div class="carousel-wrap">
        <Carousel v-bind="settings" :breakpoints="null" :itemsToShow="3.5" class="mt-4 p-0" :autoplay="3000"
            :transition="500" :pauseAutoplayOnHover="true" :wrap-around='true' :mouseDrag="true" :touchDrag="true">
            <Slide v-for="slide in pack" class="mx-2 shadow-sm" :key="slide">
                <div class="img-wrap">
                    <img :src="slide.image" class="img card-img">
                    <div class="hidden-hover">
                        <div class="inner-hidden">
                            <h5 class="h5 title text-light  fw-bold">{{ slide.name }}</h5>
                            <div class="title text-light">Price: 35 $</div>
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
    height: 220px;
    min-width: 280px;
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
    transition: all 0.7s ease-in-out;
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
    bottom: -70px;
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
</style>
  