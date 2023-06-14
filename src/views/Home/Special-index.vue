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

                <div class="row" v-if="specialList">
                    <div class="col-lg-3" :class="scroll">
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
                                <div class="row py-3" style="max-height: 350px; overflow:scroll">

                                    <div class="col-lg-7 details order-2 order-lg-1">

                                        <h3>{{ special.name }}</h3>
                                        <p class="fst-italic">{{ special.description }}</p>
                                        <p>
                                            {{ special.excerpt }}
                                        </p>

                                    </div>
                                    <div class="col-lg-5 text-center order-1  order-lg-2" :class="scroll2">
                                        <img :src="special.image" alt="" class=" img-fluid">
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
            // this.special = val.map(s => {
            //     return { value: s }
            // })
            this.special = val
            console.log(this.special);
        }
    },

    watch: {
        specialList() {
            this.List = this.specialList;
            this.special = this.specialList[0]
            console.log(this.List);
        }
    },

    beforeMount() {
        this.$store.dispatch('food/specialMenu')
    }


}
</script>

<style scoped>
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
</style>
