<template>
    <div class="container">
        <div class="inner-container">

            <div class="title-wrap my-4">
                <div class="h2 fw-bold text-muted">Customer Cart List</div>
            </div>

            <div class="table-wrap  p-2 rounded-2 shadow">
                <table class="table table-sm table-striped bg-light table-hover table-bordered">
                    <thead class="text-center text-muted">
                        <tr>
                            <th class="num"> .No</th>
                            <th class="img">Image</th>
                            <th class="sticky">Order Items</th>
                            <th>Quantity</th>
                            <th>Amount</th>
                            <th>Modify</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody class="text-center ">

                        <tr v-for="(cart, i) in mainList" :key="cart.id" class=" ">

                            <td>{{ i + 1 }}</td>

                            <td class="cart_img_wrap">
                                <img :src="cart.food.image" class="cart_img card-img" v-if="cart.food">

                                <span class="shell-carousel" v-if="cart.package">
                                    <CartCarousel :pack="cart.package.food" />

                                </span>
                            </td>

                            <td>
                                <span v-if="cart.food">{{ cart.food.name }}
                                    <span class="text-primary fw-bold">| Dish
                                    </span>
                                </span>
                                <span v-if="cart.package">{{ cart.package.name }}
                                    <span class="text-info fw-bold">| Package
                                    </span>
                                </span>
                            </td>

                            <td>
                                <span v-if="cart.food">{{ cart.count }}</span>
                                <span v-if="cart.package">{{ cart.count }}</span>
                            </td>
                            <td>
                                <span v-if="cart.food">{{ (cart.food.price * 1) * cart.count }} $$</span>
                                <span v-if="cart.package">{{ cart.package.net_total }} $$</span>
                            </td>
                            <td class="">
                                <div class="d-flex justify-content-center ">
                                    <button class="btx btn-eff btn-warning me-1 rounded-2 px-2" @click="minus"> - </button>
                                    <button class="btx btn-eff btn-warning ms-1 rounded-2 px-2" @click="plus"> + </button>
                                </div>
                            </td>
                            <td></td>


                        </tr>




                    </tbody>

                </table>


                <div class="my-3 w-100 p-3 rounded-2">
                    <button class="btn text-light w-100 btn-warning" @click="checkTotal">
                        Checkout
                    </button>
                </div>

            </div>
        </div>
    </div>
</template>



<script>

import { mapGetters } from 'vuex'

import CartCarousel from '../Carousel/cart-carousel'

export default {

    components: {
        CartCarousel
    },
    data() {
        return {
            mainList: '',
            All_total: 0,
        }
    },

    computed: {
        ...mapGetters({
            getUserCarts: 'cart/getCartListByUser'
        })

    },
    methods: {

        checkTotal() {

            this.getUserCarts.filter(f => {
                if (f.food) {
                    this.All_total += Number(f.food.price)
                }
            })

            this.getUserCarts.filter(p => {
                if (p.package) {
                    this.All_total += Number(p.package.net_total)
                }
            })
            console.log(this.All_total);
        }


    },


    beforeCreate() {
        this.$store.dispatch('cart/getCartListByUser')
    },

    watch: {
        getUserCarts() {
            this.mainList = this.getUserCarts;
        }
    },


}
</script>

<style scoped>
.container {
    min-height: 90vh;
    padding: 20px;
    /* background-color: rgba(76, 159, 231, 0.837); */
}

.inner-container {
    margin-top: 80px;
}

.cart_img_wrap {
    width: 100px;
    height: 80px;
    padding: 0;
}

.cart_img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.pack_img_wrap {
    width: 100%;
    height: 100%;

}

.pack_img {
    width: 40px;
}

.shell-carousel {
    padding: 0;
}

td {
    /* background-color: gray !important; */
    height: 70px !important;
    vertical-align: -webkit-baseline-middle !important;
}
</style>
