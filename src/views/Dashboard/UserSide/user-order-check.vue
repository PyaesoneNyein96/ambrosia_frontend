<template>
    <div class="p-3 h3 ">
        Your Orders
        <hr>
    </div>


    <div class="container">
        <div class="row">
            <div class="col-auto col-md-10 mx-auto">

                <div class="table-wrap table-responsive  rounded-2 shadow">
                    <table class="table table-sm table-striped bg-light table-hover table-bordered">
                        <thead class="text-center text-muted">
                            <tr>
                                <th>No</th>
                                <th>Date</th>
                                <th>Order_id</th>
                                <th>Total Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>


                        <tbody class="text-center">

                            <tr v-for="(o, i) in orderList" :key="o.id">
                                <td>{{ i + 1 }}</td>
                                <td>
                                    <date-format :date="o.created_at" />
                                </td>
                                <td>{{ o.order_code }}</td>
                                <td><span class="text-success fw-bold">{{ o.total }} </span> $$ </td>

                                <td v-if="o.status == 1" class="text-warning"> <span>Pending</span></td>
                                <td v-if="o.status == 2" class="text-success"> Confirmed</td>
                                <td v-if="o.status == 3" class="text-danger"> Reject</td>
                            </tr>
                        </tbody>
                    </table>

                    <div class=" text-center" v-if="orderList.length == 0">
                        <h1 class="my-5">
                            There is No Order yet !!!
                            <span class="text-warning" style="cursor: pointer;"
                                @click="this.$router.push({ name: 'main_dashboard' })">
                                Back to Main Dashboard
                            </span>
                        </h1>
                    </div>

                </div>



            </div>
        </div>

    </div>
</template>

<script>

import { mapGetters } from 'vuex'


export default {
    name: 'user-order-check',
    data() {
        return {
            list: ''
        }
    },
    computed: {
        ...mapGetters({
            auth: 'auth/getUserData',
            orderList: 'cart/getUserOrderList'
        })
    },

    methods: {

    }
    ,
    beforeMount() {
        this.$store.dispatch('cart/getOrderListByUser', this.auth.id)
    },



    watch: {
        auth() {
            this.$store.dispatch('cart/getOrderListByUser', this.auth.id)
        }
    },

}
</script>

<style scoped>
td {
    /* background-color: gray !important; */
    height: 50px !important;
    vertical-align: -webkit-baseline-middle !important;
    cursor: pointer;
}
</style>
