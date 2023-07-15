<template>
    <div>
        <div>
            <div class="container pt-3">
                <div class="h4  text-muted">Carousel Customization: Edit Carousel </div>
                <div class="row">
                    <div class="col-md-9 mx-auto">
                        <div class="carousel-wrap">

                            <div class="h5 text-center text-muted">Note: Carousel Images size should be 1920 x 1080
                                Resolution
                            </div>
                            <Carousel class="carousel  p-0" :items-to-show="1" :wrap-around='true'>

                                <Slide class="slide">
                                    <Transition name="carousel" appear>
                                        <div class="slide-img" :style="{ background: `url(${item.image})` }">
                                            <div class=" slide-up " :class="item.position">
                                                <div class="title h5" :style="{ 'color': item.title_color }">
                                                    {{ item.title }}
                                                </div>
                                                <span :style="{ 'color': item.color }">
                                                    {{ item.description }}
                                                </span>
                                            </div>
                                        </div>

                                    </Transition>
                                </Slide>
                            </Carousel>
                        </div>

                        <div class=" shadow-sm p-3 rounded-3 mt-2">
                            <form class="form-wrap" @submit.prevent="update">

                                <input v-model="item.image" type="url" class="form-control shadow-none form-control-sm"
                                    placeholder="Add Carousel Image URL" required>

                                <select class="form-control form-control-sm shadow-none my-3" v-model="item.position"
                                    required>
                                    <option value="" class="text-muted" selected hidden disabled>Select Description
                                        Position
                                    </option>
                                    <option :value="p.position" v-for=" p  in  positions " :key="p">{{ p.position }}
                                    </option>
                                </select>


                                <input type="text" class="my-3 shadow-none form-control-sm form-control"
                                    placeholder="Carousel title" v-model="item.title" required>
                                <input v-model="item.title_color" type="color" format="hexadecimal"
                                    class="color-box form-control w-25 form-control-sm mb-4" required>

                                <input type="text" class="my-3 shadow-none form-control form-control-sm"
                                    placeholder="Carousel description" v-model="item.description" required>

                                <label class="text-muted">Choice description text Color</label>
                                <input v-model="item.color" type="color" format="hexadecimal"
                                    class="color-box form-control w-25 form-control-sm mb-4" required>

                                <button class="btn btn-success w-100">
                                    Update Carousel
                                </button>

                            </form>
                        </div>

                    </div>
                </div>


            </div>
        </div>
    </div>
</template>

<script>

import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide } from 'vue3-carousel'

export default {
    name: 'Carousel-edit',
    components: {
        Carousel,
        Slide
    },

    data() {
        return {
            item: '',
            positions: [
                { id: 1, position: 'slide-left' },
                { id: 2, position: 'slide-center' },
                { id: 3, position: 'slide-right' },
                { id: 3, position: 'slide-top-right' },
                { id: 3, position: 'slide-top-left' },
            ],
        }
    },


    methods: {
        update() {
            this.$store.dispatch('tool/UpdateCarousel', this.item)
        }
    },

    mounted() {
        let queryData = this.$route.query.data
        this.item = JSON.parse(decodeURIComponent(queryData))

    }

}
</script>

<style scoped>
.container {
    min-height: 100vh;
}

.title {
    font-size: 1.5em;
    font-weight: bold;
    /* color: rgb(131, 13, 13) !important; */
}

.carousel-wrap {
    background-color: rgb(231, 233, 228);
    padding: 10px;
    border-radius: 10px;
    width: 100%;
    min-height: 400px;
}

.slide * {
    user-select: none;
    cursor: pointer;
}

.slide {
    width: 100%;
    height: 56.25vh;
    position: relative;
}


.slide-img {
    max-width: 100% !important;
    height: 100% !important;
    background-size: cover !important;
    background-position: center !important;
    background-color: red;
    position: absolute !important;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}

.slide-up {
    position: absolute;
    min-height: 8em;
    width: 40%;
    font-size: 15px;
    text-align: start;
    padding: 1em;
    border-radius: 0.7em;
    /* color: rgb(239, 253, 255); */
    box-shadow: 1px 0px 5px rgba(76, 62, 62, 0.06);
    opacity: 1 !important;
    background-color: rgba(172, 218, 243, 0.096) !important;
}

.slide-left {
    text-align: start;
    bottom: 10.7%;
    left: 7%;
}

.slide-top-left {
    text-align: start;
    top: 25.7%;
    left: 7%;
}

.slide-right {
    text-align: end !important;
    bottom: 10.7%;
    right: 7%;
}

.slide-top-right {
    text-align: end !important;
    top: 25.7%;
    right: 7%;
}

.slide-center {
    text-align: center !important;
    position: absolute;
    bottom: 10.7%;
    right: 31%;
}

.color-box {
    height: 50px;
}


/* responsive */

@media (max-width:600px) {
    .slide-up {
        bottom: 10%;
        width: 80%;
        color: rgb(255, 255, 255);
        font-size: 0.8em !important;
        text-shadow: 1px 1px 40px lightblue;
        left: 10%;
        background-color: rgba(0, 115, 255, 0.248);
        border-radius: 5px;
    }

}
</style>
