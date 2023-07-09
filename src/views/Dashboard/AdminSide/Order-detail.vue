<template>
    <div class="container-fluid mt-5 p-3">
        <div class="row">
            <div class="col-md-4 col-auto mb-5">
                <div class="h3">User Information</div>
                <div class="shadow-sm">
                    <ul class="list-group">
                        <li class="li "> Order Code : <div class="d-inline-block text-success fw-bold">{{
                            order_user.order_code }}</div>
                        </li>
                        <li class="li">Name : {{ order_user.name }}</li>
                        <li class="li">Email : {{ order_user.email }}</li>
                        <li class="li">Phone : {{ order_user.phone }}</li>
                        <li class="li">
                            Total : {{ order_user.order_total }} $
                            <span class="text-muted small">(including Member Discount)</span>
                        </li>
                        <li class="li">Order Date : <date-format :has-time="true" :date="order_user.created_at" /></li>
                        <li class="li">preferred Cuisine :
                            <span class="text-warning">
                                {{ order_user.preferred_cuisine ? order_user.preferred_cuisine : 'No' }}
                            </span>
                        </li>
                        <li class="li text-danger">Allergies : {{ order_user.allergies == 1 ? 'Yes' : 'No' }}
                        </li>
                        <li class="li text-danger">Restrictions : {{ order_user.restrictions == 1 ? 'Yes' :
                            'No' }}
                        </li>
                        <li class="li">Birthday :
                            <date-format :date="order_user.birthday" />
                        </li>
                        <li class="li">
                            Status
                        </li>
                        <li class="li ">
                            <div class="radio row m-0 p-0 me-auto" style="width:220px">

                                <div v-for="i in OrderStatus" :key="i.id" class="col-auto m-0 px-1 ">
                                    <input :value="i.id" type="radio" :label="i.text" @change="statusChange()"
                                        v-model="order_user.order_status"
                                        :class="[{ 'bg-danger bg-gradient text-light': order_user.order_status == 3 && i.id == 3 },
                                        { 'bg-warning bg-gradient text-light': order_user.order_status == 1 && i.id == 1 }]">
                                </div>
                            </div>
                        </li>
                    </ul>


                </div>
            </div>
            <div class="col-md-8 col-auto my-2">


                <div class="booking-wrap" v-if="table_info !== null">
                    <div class="h4">Booking Info</div>
                    <div class="col-md-12 px-2 mx-auto ">

                        <table class="table table-sm table-striped bg-light table-hover">
                            <thead class="text-center text-muted">
                                <tr>
                                    <th class="no">Time</th>
                                    <th class="no">Date</th>
                                    <th class="no">message</th>
                                    <th class="no">People</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{{ table_info.time }}</td>

                                    <td>
                                        <date-format :time="table_info.date" />
                                    </td>
                                    <td>{{ table_info.message }}</td>
                                    <td>{{ table_info.people }}</td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                    <hr>
                </div>

                <div class="h4">Orders Items List</div>
                <div class="col-md-12 px-2 mx-auto table-responsive pb-5">

                    <table class="table table-sm table-striped bg-light table-hover">
                        <thead class="text-center text-muted">
                            <tr>
                                <th class="no">No</th>
                                <th>Dish</th>

                                <th>Packages</th>
                                <th>Quantity</th>
                                <th>Unit price</th>
                                <th>Total</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody class="text-center">
                            <tr v-for=" (item, i) in items " :key="i">
                                <td class="no">
                                    {{ i + 1 }}
                                </td>

                                <td>
                                    {{ item.type == 'food' ? item.name : '-' }}
                                </td>

                                <td>
                                    {{ item.type == 'package' ? item.name : '-' }}
                                </td>

                                <td>{{ item.quantity }}</td>

                                <td>{{ item.food_price }} {{ item.package_price }}</td>


                                <td>
                                    {{ item.this_total }}
                                </td>


                                <td>
                                    <date-format :date="item.date" />
                                </td>
                            </tr>

                        </tbody>
                        <tfoot>
                            <tr>
                                <span></span>
                            </tr>

                            <tr>
                                <td class="text-secondary fw-bold" colspan="5">
                                    Sub Total:
                                </td>
                                <td class="text-secondary fw-light">
                                    {{ order_user.order_sub_total }} $
                                </td>
                            </tr>


                            <tr>
                                <td class="text-secondary fw-bold" colspan="5">
                                    Final Amount:
                                </td>
                                <td class="text-success fw-bold">
                                    {{ order_user.order_total }} $
                                </td>
                            </tr>
                        </tfoot>
                    </table>

                </div>

            </div>

        </div>
    </div>
</template>

<script>

import { mapGetters } from 'vuex'
import { timeFunction } from '../../../components/Tools/time.js'

export default {
    name: 'Order-detail',

    data() {
        return {
            items: '',
            order_user: {},
            table_info: {},
            OrderStatus: [
                { id: 1, text: 'Pending' },
                { id: 2, text: 'Confirm' },
                { id: 3, text: 'Reject' },
            ],

        }
    },
    computed: {
        ...mapGetters({
            orderDetail: 'cart/getOrderDetail',
        })
    },

    methods: {

        statusChange() {
            const newStatus = event.target.value;
            const info = { id: this.order_user.order_id, status: Number(newStatus) }
            this.$store.dispatch('cart/updateAdminOrderList', info);
        },



    },

    watch: {
        orderDetail() {
            console.log(this.orderDetail);
            this.items = this.orderDetail.all_items;
            this.user = this.orderDetail.order_user.user
        }
    },

    mounted() {


        // console.log(this.orderDetail);
        this.table_info = this.orderDetail.table_info;
        if (this.table_info) {
            this.table_info.time = timeFunction(this.table_info.time);
        }

        this.order_user = this.orderDetail.orderUser;
        this.items = this.orderDetail.all_items;

    }


}

</script>

<style  scoped>
table * {
    font-size: 14px;
}

.table-responsive {
    /* width: 100%; */
    height: 70vh;
}

td span,
td {
    text-align: center;
}

td {
    min-width: 50px;
}

thead {
    position: sticky;
    top: 0;
    background-color: rgb(243, 240, 235);
}

.no {
    width: 30px !important;
    background-color: rgba(0, 128, 0, 0.047);
}

.list-group {
    margin-top: 15px;
    padding: 30px 10px;
    box-shadow: 1px 1px 50px rgba(128, 128, 128, 0.222);
}

.li {
    list-style: none;
    margin-bottom: 20px;
    margin-left: 10px;
    color: gray;
}

/* Radio */
.radio {
    background: #45485700;
    padding: 4px;
    border-radius: 3px;
    /* box-shadow: inset 0 0 0 3px rgba(35, 33, 45, 0.3),
        0 0 0 3px rgba(185, 185, 185, 0.3); */
    position: relative;
}

.radio input {
    width: auto;
    height: 100%;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    outline: none;
    cursor: pointer;
    border-radius: 2px;
    padding: 4px 8px;
    background: #cbcddb9d;
    color: #797575bd;
    /* color: #bdbdbdbd; */
    font-size: 14px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
        "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
        "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    transition: all 100ms linear;
}

.radio input:checked {
    background-image: linear-gradient(180deg, #95d891, #74bbad);
    color: #fff;
    box-shadow: 0 1px 1px #0000002e;
    text-shadow: 0 1px 0px #79485f7a;
}

.radio input:before {
    content: attr(label);
    display: inline-block;
    text-align: center;
    width: 100%;
}
</style>
