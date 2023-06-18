<template>
    <div class="py-5">
        <!-- ======= Specials Section ======= -->
        <section id="specials" class="specials">
            <div class="container" :class="scroll">

                <div class="section-title" :class="scroll">
                    <h2>Check our <span>Specials</span></h2>
                    <p>Share the story behind your special menu. Explain the inspiration behind the dishes, whether it's a
                        seasonal ingredient, a cultural celebration, or a collaboration with a local supplier or chef. This
                        adds depth and intrigue to the menu offerings.</p>
                </div>

                <div class="row" v-if="specialList.length !== 0">
                    <div class="col-lg-3 left-menu" :class="scroll">
                        <ul class="nav nav-tabs flex-column" v-for="s in specialList" :key="s.id">
                            <li class="nav-item">
                                <a class="nav-link show px-2 mb-1" :class="{ 'active': s.id == this.special.id }"
                                    data-bs-toggle="tab" href="#tab-1" @click="show(s.id)">
                                    {{ s.name }}
                                </a>
                            </li>


                        </ul>
                    </div>
                    <div class="col-lg-9 mt-4 mt-lg-0" :class="scroll3">
                        <div class="tab-content ">
                            <div class="tab-pane active show" id="tab-1">
                                <div class="row py-3 right-menu">

                                    <div class="col-lg-7 details order-2 order-lg-1">

                                        <h3>{{ special.name }}</h3>
                                        <p class="fst-italic">{{ special.description }}</p>
                                        <p>
                                            {{ special.excerpt }}
                                        </p>

                                    </div>
                                    <div class="col-lg-5 text-center order-1  order-lg-2" :class="scroll2">
                                        <img :src="special.image" alt="" class="img img-fluid">
                                    </div>

                                </div>
                                <div class="row order p-3" :class="scroll3">
                                    <div class="col-6 offset-6 d-flex justify-content-end">
                                        <div class="btn-wrap">
                                            <button class="btn detail-btn  btn-secondary me-1 rounded-0">
                                                Detail
                                            </button>
                                            <button class="btn order-btn  btn-warning rounded-0" @click="order">
                                                Order now
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </section><!-- End Specials Section -->
    </div>
</template>

<script>


import { mapGetters } from 'vuex'

export default {
    props: ['scroll', 'scroll2', 'scroll3'],
    data() {
        return {
            List: '',
            special: ''
        }
    },

    computed: {
        ...mapGetters({
            specialList: 'food/getSpecialMenu'
        })
    },

    methods: {
        show(idx) {
            const val = this.List.find(s => {
                return s.id === idx
            });
            this.special = val;
            // this.special = val.map(s => {
            //     return { value: s }
            // })
        }
    },

    watch: {
        specialList() {
            this.List = this.specialList;
            this.special = this.specialList[0]
        }
    },

    beforeMount() {
        this.$store.dispatch('food/specialMenu')
    }


}
</script>

<style scoped>
.left-menu {
    background: linear-gradient(rgba(255, 0, 0, 0.052), rgba(0, 128, 0, 0.058), rgba(255, 255, 0, 0.058));
    border-radius: 10px;
    padding: 20px;
    height: 400px;
    overflow-y: scroll;
}

.right-menu {
    height: 300px;
    padding: 20px;
    overflow-y: scroll;
}

.order {
    height: 100px;
    /* background-color: rgba(218, 165, 32, 0.055); */
}

.img {
    width: 100%;
    height: 250px;
    object-fit: cover;
}

/* Transition */
.fade-leave-active {
    transition: all 1s ease;
    opacity: 1;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
    transform: translateY(-40%);
}

::-webkit-scrollbar {
    width: 5px !important;
    /* Width of the scrollbar */
}

::-webkit-scrollbar-track {

    background: #f1f1f1 !important;
    /* Color of the scrollbar track */
}

::-webkit-scrollbar-thumb {
    background: #8e870420 !important;
    /* Color of the scrollbar thumb */
}

::-webkit-scrollbar-thumb:hover {
    background: #bef607e5 !important;
    /* Color of the scrollbar thumb on hover */
}

/* Button Effect */

.btn {
    position: relative;
    z-index: 0;
    cursor: pointer;
    color: #f1f1f1;
    border: none;
}

.btn::after {
    content: "";
    position: absolute;
    top: 0;
    z-index: -1;
    transition: all .3s ease-in-out;
}

.detail-btn:hover.detail-btn::after {
    width: 100%;
}

.order-btn:hover.order-btn::after {
    width: 100%;
}

.detail-btn:hover,
.order-btn:hover {
    color: rgb(255, 255, 255);
}

.detail-btn::after {
    left: 0;
    width: 0;
    height: 100%;
    /* background-color: #ffc107; */
    /* background: linear-gradient(to left, yellow, #ffc107, gold, rgb(225, 191, 0)); */
    background: linear-gradient(to left, rgba(148, 147, 147, 0.953), #ffc107b4, rgba(255, 217, 0, 0.804), rgb(214, 214, 1));
}

.order-btn::after {
    right: 0;
    width: 0;
    height: 100%;
    /* background-color: aqua; */
    /* background: linear-gradient(to right, green, rgba(4, 160, 4, 0.792), rgba(2, 164, 2, 0.616), rgba(121, 251, 121, 0.642)); */
    background: linear-gradient(to right, rgba(128, 128, 128, 0.81), rgba(128, 128, 128, 0.399), rgba(128, 128, 128, 0.355), rgba(128, 128, 128, 0.229));
}
</style>
