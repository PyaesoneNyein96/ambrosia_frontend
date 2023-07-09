<template>
    <div class="p-3 h3 ">
        Your Orders
        <hr>
    </div>


    <div class="container">
        <div class="row">
            <div class="col-auto col-md-12 mx-auto">

                <div class="table-wrap table-responsive  rounded-2 shadow">
                    <table class="table table-sm table-striped bg-light table-hover table-bordered">
                        <thead class="text-center text-muted">
                            <tr>
                                <th>No</th>
                                <th>Order Date</th>
                                <th>Order_id</th>
                                <th>People</th>
                                <th>Booking Date</th>
                                <th>Booking Time</th>
                                <th>Sub Total </th>
                                <th>Total Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>


                        <tbody class="text-center" v-if="this.data">

                            <tr v-for="(o, i) in data" :key="o.id">
                                <td>{{ i + 1 }}</td>
                                <td>
                                    <date-format :date="o.created_at" />
                                </td>
                                <td>{{ o.order_code }}</td>

                                <td>
                                    <span v-for="p in o.booking_table" :key="p.id">
                                        {{ p.people }}
                                    </span>
                                    <span v-if="o.booking_table.length == 0">-</span>
                                </td>



                                <td>
                                    <span v-for="d in o.booking_table" :key="d.id">
                                        {{ d.date }}
                                    </span>
                                    <span v-if="o.booking_table.length == 0">-</span>
                                </td>


                                <td>
                                    <span v-for="t in o.booking_table" :key="t.id">

                                        {{ t.time }}

                                    </span>
                                    <span v-if="o.booking_table.length == 0">-</span>
                                </td>

                                <td><span class="text-muted fw-bold">{{ o.sub_total }} </span> $ </td>
                                <td><span class="text-success fw-bold">{{ o.total }} </span> $$ </td>

                                <td v-if="o.status == 1" class="text-warning"> <span>Pending</span></td>
                                <td v-if="o.status == 2" class="text-success"> Confirmed</td>
                                <td v-if="o.status == 3" class="text-danger"> Reject</td>
                            </tr>
                        </tbody>
                    </table>

                    <div class=" text-center" v-if="data.length == 0">
                        <h1 class="my-5">
                            There is No Order yet !!!
                            <span class="text-warning" style="cursor: pointer;"
                                @click="this.$router.push({ name: 'menu' })">
                                <!-- Back to Main Dashboard -->
                                I want to Order.
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

import { timeFunction } from '../../../components/Tools/time.js'

export default {
    name: 'user-order-check',

    data() {
        return {
            data: '',
        }
    },

    computed: {
        ...mapGetters({
            auth: 'auth/getUserData',
            orderList: 'cart/getUserOrderList'
        })
    },

    methods: {

        timeChange() {
            if (this.data.length !== 0) {
                for (const i of this.data) {
                    if (i.booking_table[0]) {
                        i.booking_table[0].time = timeFunction(i.booking_table[0].time)
                    }
                }
            }

        }

    },




    beforeMount() {
        this.$store.dispatch('cart/getOrderListByUser', this.auth.id)
    },



    watch: {
        auth() {
            this.$store.dispatch('cart/getOrderListByUser', this.auth.id);
        },

        orderList() {
            this.data = this.orderList
            this.timeChange();
        }
    },
    mounted() {
        this.data = this.orderList

    }

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
