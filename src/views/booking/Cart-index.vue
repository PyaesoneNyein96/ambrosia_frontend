<template>
    <div class="container">
        <div class="inner-container">

            <div class="title-wrap d-flex justify-content-between my-4">
                <div class="h3 fw-bold text-muted"> <span class="d-none d-md-inline">Customer</span> Cart List</div>

                <div class="bg-secondary text-light shadow-sm px-3 py-2 rounded-1 align-self-center small"
                    v-if="authUser.membership !== null">

                    <span class="d-none d-lg-inline"> You are a</span>
                    <span v-show="authUser.membership == 1" class="text-white-50">
                        Silver Member
                        <i class="fa fa-star" aria-hidden="true"></i>
                        - 5 % off
                    </span>
                    <span v-show="authUser.membership == 2" class="text-warning">
                        Gold Member
                        <i class="fa fa-star" aria-hidden="true"></i>
                        <i class="fa fa-star" aria-hidden="true"></i>
                        - 10 % off
                    </span>
                    <span v-show="authUser.membership == 3" class="text-info">
                        Diamond Member
                        <i class="fa fa-star" aria-hidden="true"></i>
                        <i class="fa fa-star" aria-hidden="true"></i>
                        <i class="fa fa-star" aria-hidden="true"></i>
                        - 15 % off
                    </span>

                </div>
            </div>

            <div class="table-wrap table-responsive  rounded-2 shadow">
                <table class="w-100 table-striped bg-light table-hover ">
                    <thead class="text-center text-muted">
                        <tr>
                            <th class="num">No</th>
                            <th class="img">Image</th>
                            <th class="img">Type</th>
                            <th class="sticky"> <span class="d-none d-md-inline">Order</span> Items</th>
                            <th>Quantity</th>
                            <th>Amount</th>
                            <th>Modify</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody class="text-center ">


                        <TransitionGroup name="item" appear>

                            <tr v-for="(cart, i) in mainList" :key="cart">



                                <td>{{ i + 1 }}</td>

                                <td class="cart_img_wrap">
                                    <img :src="cart.food.image" class="cart_img" v-if="cart.food">
                                    <span class="shell-carousel" v-else>
                                        <CartCarousel :pack="cart.package.food" />
                                    </span>
                                </td>
                                <td class="text-muted">
                                    {{ cart.food ? 'Dish' : 'Package' }}
                                </td>
                                <td>
                                    <span v-if="cart.food">{{ cart.food.name }}</span>
                                    <span v-if="cart.package">{{ cart.package.name }}</span>
                                </td>

                                <td>
                                    <span v-if="cart.food">{{ cart.count }}</span>
                                    <span v-if="cart.package">{{ cart.count }}</span>
                                </td>
                                <td>
                                    <span v-if="cart.food">{{ (cart.food.price * 1) * cart.count }} $$</span>
                                    <span v-if="cart.package">{{ (Number(cart.package.net_total) * cart.count).toFixed(1) }}
                                        $$</span>
                                </td>
                                <td class="">
                                    <div class="d-flex justify-content-center ">
                                        <button class="btx2 btn-eff2 btn-warning me-1 rounded-2 px-2" @click="minus(cart)">
                                            -
                                        </button>
                                        <button class="btx2 btn-eff2 btn-warning ms-1 rounded-2 px-2" @click="plus(cart)"> +
                                        </button>
                                    </div>
                                </td>

                                <td>

                                    <button class="btn btn-sm btn-danger" title="Remove all items for this row"
                                        @click="remove(cart)">
                                        <i class="fa-solid fa-xmark"></i>
                                    </button>
                                </td>
                            </tr>


                        </TransitionGroup>
                    </tbody>
                </table>
                <div class=" text-center" v-if="!mainList">
                    <h1 class="mt-5">
                        There is No Data !!! <span class="text-warning" style="cursor: pointer;"
                            @click="this.$router.push({ name: 'main_dashboard' })">Add New</span>
                    </h1>
                </div>
            </div>
        </div>

        <div class="total-wrap my-2 shadow p-2 bg-light">
            <div class="total-amount my-2 text-center w-100">
                <li class="list-group-item">
                    Total:
                    <span class="fw-bold h6 text-success">
                        {{ All_total }}
                    </span>
                    $
                </li>
            </div>

            <div class="my-0 w-100 p-3 rounded-2">

                <button class="btn text-light w-100 btn-warning" @click="submitTotal"
                    :disabled="All_total == 0 || disabled">
                    Proceed to checkout
                </button>
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
            orderBox: [],
            disabled: false,
        }
    },

    computed: {
        ...mapGetters({
            getUserCarts: 'cart/getCartListByUser',
            authUser: 'auth/getUserData',
        })

    },

    watch: {
        getUserCarts() {
            this.mainList = this.getUserCarts;
            this.checkTotal();
        },

    },

    mounted() {
        this.$store.dispatch('cart/getCartListByUser')
    },

    methods: {

        checkTotal() {

            if (this.mainList) {
                let total = 0;
                this.mainList.filter(f => {
                    if (f.food) {
                        let pre = Number(f.food.price) * f.count
                        total += pre
                    }
                })

                this.mainList.filter(p => {
                    // let total = 0;
                    if (p.package) {
                        let pre = Number(p.package.net_total) * p.count
                        total += pre
                    }
                })
                this.All_total = total.toFixed(2)
            }


        },

        plus(i) {
            if (i.food) {
                this.mainList.find(f => {
                    if (f.food_id == i.food_id) {
                        f.count++
                    }
                });

            } else if (i.package) {
                this.mainList.find(j => {
                    if (j.package_id == i.package_id) {
                        j.count++
                    }
                });
                // this.$store.dispatch('cart/setModifyCart', info)
            }
            this.checkTotal();
        },


        minus(i) {
            if (i.food) {
                this.mainList.find(f => {
                    if (f.food_id == i.food_id && f.count > 0) {
                        f.count--
                    }
                })

            } else {

                this.mainList.find(j => {
                    if (j.package_id == i.package_id && j.count > 0) {
                        j.count--
                    }
                });
            }
            this.checkTotal();
        },

        remove(i) {

            if (i.food) {
                this.mainList = this.mainList.filter(x => {
                    return x.food_id !== i.food_id
                });

                const info = { food_id: i.food_id }
                this.$store.dispatch('cart/remove', info)

            } else {
                this.mainList = this.mainList.filter(x => {
                    return x.package_id !== i.package_id
                });
                const info = { package_id: i.package_id }
                this.$store.dispatch('cart/remove', info)
            }


            this.checkTotal();
            if (this.mainList.length == 0) {
                this.$router.push({ name: 'menu' })
            }
            // console.log(this.mainList.length);

        },

        submitTotal() {

            this.disabled = true;

            let UID = this.$uuid();
            UID = 'OD_ID-' + UID.slice(0, 10);

            for (const i of this.mainList) {

                this.orderBox.push({
                    order_code: UID,
                    user_id: this.authUser.id,
                    item_id: i.food ? i.food_id : i.package_id,
                    type: i.food ? 1 : 2,
                    quantity: i.count,
                    total: i.food ? i.count * i.food.price : i.count * i.package.net_total
                })

            }

            this.$store.dispatch('cart/submitOrder', this.orderBox)
                .then(() => {
                    this.disabled = false;
                    this.orderBox = []
                })



        },


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

.table-responsive {
    /* width: 100%; */
    height: 60vh;
}

thead {
    position: sticky;
    top: -1px;
    background-color: rgb(243, 240, 235);
    z-index: 100;
}

table * {
    font-size: 12px !important;
}

td {
    min-width: 65px;
}

.cart_img_wrap {
    width: 100px !important;
    height: 80px !important;
    padding: 0;
}

.cart_img {
    min-width: 70px !important;
    max-width: 100px;
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
    height: 70px !important;
    margin: 0 5px;
}



/* Transition  */

tr {
    position: relative;
}


.item-enter-from,
.item-leave-to {
    opacity: 0;
}

.item-enter-active {
    transition: 1s;
}

.item-leave-active {
    position: absolute;
    transition: all 0.3s;
}

.item-enter-to,
.item-leave-from {
    width: 100% !important;
    position: absolute;
    opacity: 0;
    transition: all 0s;
    transform: translateX(50%);

}

.item-move {
    transition: transform 0.5s;
}
</style>
