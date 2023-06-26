<template>
    <div class="container-fluid mt-5">
        <div class="row">
            <div class="col-md-12 col-auto mb-5">
                <div class="h3">User Information</div>
                <div class="shadow-sm">
                    <ul class="list-group">
                        <li class="list-group-item"> Order Code : <div class="d-inline-block text-success">{{
                            order.order_code }}</div>
                        </li>
                        <li class="list-group-item">user Name : {{ user.name }}</li>
                        <li class="list-group-item">User Email : {{ user.email }}</li>
                        <li class="list-group-item">
                            Total : {{ order.total }} $
                            <span class="text-muted small">(including Member Discount)</span>
                        </li>
                        <li class="list-group-item">Order Date : <date-format :date="order.created_at" /></li>

                        <li class="list-group-item  ps-2 px-0">
                            <div class="radio row m-0 p-0 me-auto" style="width:220px">

                                <div v-for="i in OrderStatus" :key="i.id" class="col-auto m-0 px-1">
                                    <input :value="i.id" type="radio" :label="i.text" @change="statusChange()"
                                        v-model="order.status" :class="[{ 'bg-danger bg-gradient text-light': order.status == 3 && i.id == 3 },
                                        { 'bg-warning bg-gradient text-light': order.status == 1 && i.id == 1 }]">
                                </div>
                            </div>
                        </li>
                    </ul>


                </div>
            </div>
            <div class="col-md-12 col-auto my-2">
                <div class="h3">Orders Items List</div>
                <div class="col-md-12 px-2 mx-auto table-responsive pb-5">

                    <table class="table table-sm table-striped bg-light table-hover">
                        <thead class="text-center text-muted">
                            <tr>
                                <th>No</th>
                                <th>Dish</th>

                                <th>Packages</th>
                                <th>Quantity</th>
                                <th>Unit price</th>
                                <th>Total</th>
                                <!-- <th>Final<span class="d-none d-md-inline">Amount</span></th> -->
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody class="text-center">
                            <tr v-for=" (item, i) in items " :key="i">
                                <td>
                                    {{ i + 1 }}
                                </td>

                                <td>
                                    {{ item.food_name ? item.food_name : '-' }}
                                </td>

                                <td>
                                    {{ item.pack_name ? item.pack_name : '-' }}
                                </td>

                                <td>{{ item.qty }}</td>

                                <td>{{ item.food_price }} {{ item.pack_net }}</td>


                                <td>
                                    {{ item.total }}
                                </td>


                                <td>
                                    <date-format :date="order.created_at" />
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
                                    {{ sub_total }} $
                                </td>
                            </tr>


                            <tr>
                                <td class="text-secondary fw-bold" colspan="5">
                                    Final Amount:
                                </td>
                                <td class="text-success fw-bold">
                                    {{ order.total }} $
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

export default {
    name: 'Order-detail',

    data() {
        return {
            items: '',
            order: {},
            user: {},
            sub_total: 0,

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
            const info = { id: this.order.id, status: Number(newStatus) }
            this.$store.dispatch('cart/updateAdminOrderList', info)
        },



    },

    watch: {
        orderDetail() {
            this.items = this.orderDetail.items;
        }
    },

    mounted() {

        this.items = this.orderDetail.items;
        this.order = this.orderDetail.order_user[0]
        this.user = this.order.user

        this.items.filter(i => {
            this.sub_total += Number(i.total)
        })




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
    min-width: 120px;
}

thead {
    position: sticky;
    top: 0;
    background-color: rgb(243, 240, 235);
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
