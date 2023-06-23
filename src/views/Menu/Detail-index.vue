<template>
    <div class="bg-wrap">
        <section id="detail">
            <div class="container mt-5">

                <div class="row">
                    <div class="col-lg-7">
                        <img :src="detailFood.image" class="card-img img rounded-2">
                    </div>
                    <div class="col-lg-5">
                        <div class="header-wrap py-3">
                            <div class="header-inner-wrap">

                                <h1 class="fw-bold">{{ detailFood.name }}</h1>
                                <div class="category">
                                    <h4>Category: {{ detailFood.category.name }}</h4>
                                </div>
                                <div class="category">
                                    <h4>Price: <span class="text-success">
                                            {{ detailFood.category.name }}
                                        </span>
                                    </h4>
                                </div>

                                <div class="tags">
                                    <div class="row ">
                                        <!-- <h4 class="py-0 my-0">Tags :</h4> -->
                                        <span v-for="t in detailFood.tag" :key="t.id"
                                            class="bg-info col-auto  mb-1 small px-2 py-1 btx btx-eff bg-danger text-light me-1 rounded-1">
                                            {{ t.name }}</span>
                                    </div>
                                </div>


                            </div>

                            <div class="header-inner-wrap mt-2">
                                <div class="desc mt-3 mb-2 shadow-sm rounded-2">
                                    <p class="p-2 h5">
                                        {{ detailFood.description }}
                                    </p>
                                </div>

                                <div class="excerpt">
                                    <div class="">
                                        <p class="p-3">
                                            <span class="mx-4"></span>
                                            {{ detailFood.excerpt }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
                <div class="row  mt-3 mb-0 p-2">
                    <div class="offset-md-7 d-flex justify-content-end col-md-5 ">
                        <button class="btn btx btn-eff rounded-0 bg-secondary bg-gradient"
                            @click="this.$router.push({ name: 'menu' })">
                            Back to Menu
                        </button>
                        <button class="btn btx btn-eff ms-1 rounded-0 bg-danger bg-gradient"
                            @click="addToCart(detailFood.id)">
                            Order
                        </button>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>

import { mapGetters } from 'vuex'
import { smsInform } from '../../store/Notify/notify.js'

export default {

    name: 'Detail-index',

    data() {
        return {
            // key: value
        }
    },

    computed: {
        ...mapGetters({
            detailFood: 'food/getDetailFood',
            auth: 'auth/getAuth',
        })
    },

    methods: {
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
    }


}
</script>

<style  scoped>
.title-name {
    color: rgb(70, 12, 12);
}

.img {
    /* max-width: 700px; */
    background-color: rgba(0, 128, 0, 0.07);
    max-height: 600px;
    object-fit: cover;
}

.excerpt {
    background-color: rgba(0, 128, 0, 0);
    max-height: 342px;
    overflow-y: scroll;
}

.bg-wrap {
    min-height: 100vh;
    top: 0;
    background: url('../../../public/assets/img/logo/food-4k-m37wpodzrcbv5gvw.jpg') center no-repeat;
    position: relative;
    background-size: cover;
}

.bg-wrap::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9;
    background-color: rgba(192, 242, 250, 0.629);
}

.container {
    position: relative;
    z-index: 10;
}

/* ---------- */

.header-wrap {
    background-color: rgba(255, 255, 255, 0.004);
    padding: 20px;
    width: fit-content;
    position: relative;
}

.header-wrap::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9;
    background-color: rgba(252, 252, 252, 0.182);
    border-radius: 5px;
}

.header-inner-wrap {
    position: relative;
    z-index: 10;

}


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


/* scroll bar  */

::-webkit-scrollbar {
    width: 3px !important;
    /* Width of the scrollbar */
}



::-webkit-scrollbar-track {
    background: #f1f1f121 !important;
    /* Color of the scrollbar track */
}

::-webkit-scrollbar-thumb {
    background: #408e0400 !important;
    /* Color of the scrollbar thumb */
}

::-webkit-scrollbar-thumb:hover {
    /* background: #555555f8 !important; */
    /* Color of the scrollbar thumb on hover */
}
</style>
