<template>
    <div>
        <div class="container pt-3">
            <div class="h4 text-muted">Carousel Customization: Carousel List </div>
            <div class="row">
                <div class="col-md-9 mx-auto">
                    <div class="carousel-wrap">

                        <!-- <div class="h5 text-center text-muted">Carousel Images size should be 1920 x 1080</div> -->
                        <Carousel class="carousel  p-0" :items-to-show="1" :wrap-around='true' :autoplay="2000"
                            :transition="1500" v-if="slides.length !== 0">
                            <Slide v-for="slide in slides" :key="slide.id" class="slide">
                                <Transition name="carousel" appear>
                                    <div class="slide-img" :style="{ background: `url(${slide.image})` }">
                                        <div class=" slide-up fw-bold" :class="slide.position">
                                            <h4 class="title" :style="{ 'color': slide.title_color }">
                                                {{ slide.title }}</h4>
                                            <h5 :style="{ 'color': slide.color }">
                                                {{ slide.description }}
                                            </h5>
                                        </div>
                                    </div>
                                </Transition>
                            </Slide>
                        </Carousel>
                        <div class="text-center pt-5" v-else>
                            <h1>There is No Carousels.
                                <span class="text-warning" @click="this.$router.push({ name: 'carousel_add' })">Add
                                    More</span>
                            </h1>

                        </div>
                    </div>

                    <div class="bg-light shadow-sm p-3">
                        <div class="list-wrap" v-for="item in  slides" :key="item.id">

                            <div class="accordion">
                                <div class="accordion-item">
                                    <div class="h3 accordion-header">
                                        <button class="accordion-button shadow-none" type="button" data-bs-toggle="collapse"
                                            :data-bs-target="'#val' + item.id" aria-expanded="true"
                                            :aria-controls="'val' + item.id">
                                            {{ item.title }}
                                        </button>
                                    </div>
                                    <div :id="'val' + item.id" class="accordion-collapse collapse">
                                        <div class="accordion-body">
                                            {{ item.description }}
                                        </div>
                                        <div class="accordion-body py-0 ">
                                            {{ item.quotes }}
                                        </div>
                                        <div class="footer text-end me-3 mb-2">
                                            <button class="btn-sm btn-success btn mx-1" @click="edit(item.id)">Edit</button>
                                            <button class="btn-sm btn-danger btn" @click=del(item.id)>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

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

import { mapGetters } from 'vuex'


export default {
    name: 'Customize-Carousel',
    components: {
        Carousel,
        Slide,
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

    methods: {
        del(id) {
            this.$store.dispatch('tool/DeleteCarousel', id)
        },

        edit(id) {
            const spec = this.slides.find(i => {
                return i.id == id
            })

            const specJSON = encodeURIComponent(JSON.stringify(spec));

            this.$store.commit('tool/setCarouselEdit', specJSON);

            this.$router.push({ name: 'carousel_edit', query: { data: specJSON } })

        }
    },

    watch: {
        carousels() {
            this.slides = this.carousels

        }
    },

    mounted() {
        this.$store.dispatch('tool/getAllCarousel')
    }

}
</script>

<style scoped>
.carousel-wrap {
    background-color: rgb(231, 233, 228);
    padding: 10px;
    border-radius: 10px;
    min-height: 200px;
}

.slide * {
    user-select: none;
    cursor: pointer;
}

.title {
    font-size: 1.5em;
    /* color: rgb(143, 14, 14) !important; */
}

.slide {
    width: 100%;
    /* height: 400px; */
    height: 56.25vh;
    position: relative;
}

.slide-img {
    max-width: 100% !important;
    height: 100% !important;
    background-size: cover !important;
    background-position: center !important;
    background-color: red;
    background-size: cover !important;
    background-repeat: no-repeat !important;
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
    color: rgb(239, 253, 255);
    box-shadow: 1px 0px 5px rgba(76, 62, 62, 0.06);
    opacity: 1 !important;
    background-color: rgba(172, 218, 243, 0.096) !important;
}

.slide-left {
    text-align: start;
    /* top: 54.7%; */
    bottom: 10.7%;
    left: 7%;
}

.slide-top-left {
    text-align: start;
    /* top: 54.7%; */
    top: 25.7%;
    left: 7%;
}

.slide-right {
    text-align: end !important;
    /* top: 54.7%; */
    bottom: 10.7%;
    right: 7%;
}

.slide-top-right {
    text-align: end !important;
    /* top: 54.7%; */
    top: 25.7%;
    right: 7%;
}

.slide-center {
    text-align: center !important;
    position: absolute;
    /* top: 44.7%; */
    bottom: 10.7%;
    right: 31%;
}




/* responsive */

@media (max-width:600px) {
    .slide-up {
        bottom: 10%;
        width: 80%;
        /* color: rgb(255, 255, 255); */
        font-size: 0.8em !important;
        text-shadow: 1px 1px 40px lightblue;
        left: 10%;
        background-color: rgba(0, 115, 255, 0.248);
        border-radius: 5px;
    }

}
</style>
