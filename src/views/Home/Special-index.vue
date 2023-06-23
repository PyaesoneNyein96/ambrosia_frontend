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

                                        <h3 class="my-2">{{ special.name }}</h3>
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
                                        <div class="btn-wrap text-end">
                                            <button class="btn btx btn-eff rounded-0 bg-secondary bg-gradient"
                                                @click="detail(special.id)">
                                                Detail
                                            </button>
                                            <button :disabled="disabled"
                                                class="btn btx btn-eff ms-1 rounded-0 bg-danger bg-gradient"
                                                @click="addToCart(special.id)">
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
import { smsInform } from '../../store/Notify/notify.js'

export default {
    props: ['scroll', 'scroll2', 'scroll3'],
    data() {
        return {
            List: '',
            special: '',
            disabled: false
        }
    },

    computed: {
        ...mapGetters({
            specialList: 'food/getSpecialMenu',
            auth: 'auth/getAuth',
        })
    },

    methods: {
        show(idx) {
            const val = this.List.find(s => {
                return s.id === idx
            });
            this.special = val;

        },

        addToCart(id) {

            if (this.auth) {
                this.disabled = true

                this.$store.dispatch('cart/setCartFood', { food_id: id }).then(() => {
                    this.disabled = false
                })
            } else {
                this.$router.push({ name: 'login' })
                    .then(() => {
                        smsInform(this.$store.commit, 'To make order', 'Please login or register first')
                    })
            }
        },

        detail(i) {
            this.$store.dispatch('food/detailFood', i)
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
/* EFF  */
.btx::after {
    content: "";
    position: absolute;
    top: 0;
    z-index: -1;
    transition: all 0.8s ease-in-out;
    /* background-color: green !important; */
}

.btx-eff:hover.btx-eff::after {
    width: 0%;
}

.btx-eff::after {
    right: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 236, 236, 0.127);
    /* background: linear-gradient(to left,
            rgba(136, 102, 8, 0.953),
            #ffc107b4,
            rgba(255, 217, 0, 0.896),
            rgba(109, 109, 2, 0.736)); */
}
</style>
