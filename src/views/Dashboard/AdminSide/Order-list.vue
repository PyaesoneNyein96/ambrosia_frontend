<template>
    <div>
        <div class="p-3 h3">
            Order List
            <hr>
        </div>
        <div class="table-nav d-flex justify-content-between mb-3">

            <div class="bg-light shadow-sm rounded-3 my-2 ms-2">
                <button class="btn-warning text-light nav-btn btn btn-sm" @click="pending">Pending</button>
                <button class="btn-success btn ms-1 btn-sm nav-btn" @click="confirm">Confirm</button>
                <button class="btn-danger btn ms-1 btn-sm nav-btn" @click="reject">Reject</button>
                <button class="btn-secondary btn ms-1 btn-sm nav-btn" @click="all">All</button>
            </div>
            <div class="search">
                <app-Search class="search-btn" />
            </div>
        </div>
        <div class="col-md-12 px-2 mx-auto table-responsive pb-5">

            <table class="table table-sm table-striped bg-light table-hover">
                <thead class="text-center text-muted">
                    <tr>
                        <th class="num">.No</th>
                        <th>Order User</th>
                        <th>Order Code <span class="d-none d-md-inline">(Click to Detail)</span> </th>
                        <th>Total Amount</th>
                        <th>Status</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody class="text-center">
                    <tr v-for="(o, i) in orderList" :key="o.id" class="py-2">
                        <td>{{ i + 1 }}</td>
                        <td>
                            <span v-if="o.user.name != null">{{ o.user.name }}</span>
                            <span v-else>{{ o.user.email }}</span>
                        </td>

                        <td class="text-danger" @click="detail(o.order_code)">
                            <u>
                                {{ o.order_code }}
                            </u>
                        </td>

                        <td>{{ o.total }} $</td>


                        <td>
                            <div class="radio row m-0 p-0 mx-auto" style="width:220px">

                                <div v-for="i in status" :key="i.id" class="col-auto m-0 px-1">

                                    <input :value="i.id" type="radio" :label="i.text" @change="statusChange(o.id)"
                                        v-model="o.status" :class="[{ 'bg-danger bg-gradient text-light': o.status == 3 && i.id == 3 },
                                        { 'bg-warning bg-gradient text-light': o.status == 1 && i.id == 1 }]">
                                </div>
                            </div>



                        </td>
                        <td>
                            <date-format :date="o.created_at" />
                        </td>

                    </tr>

                </tbody>

            </table>

            <div class=" text-center" v-if="orderList.length == 0">
                <h1 class="mt-5">
                    There is No Order yet !!!
                    <span class="text-warning" style="cursor: pointer;"
                        @click="this.$router.push({ name: 'main_dashboard' })">
                        Back to Main Dashboard
                    </span>
                </h1>
            </div>





        </div>


    </div>
</template>

<script>

import { mapGetters } from 'vuex'

import { mapActions } from 'vuex'




export default {
    name: 'Food-list',
    data() {
        return {
            status: [
                { id: 1, text: 'Pending' },
                { id: 2, text: 'Confirm' },
                { id: 3, text: 'Reject' },
            ],
        }
    },


    computed: {
        ...mapGetters({
            notify: 'notify/getAlertNotify',
            orderList: 'cart/getAdmin_orderList',
        })
    },

    methods: {
        // Map Actions
        ...mapActions({
            getOrderList: 'cart/getOrderListByAdmin',
            updateOrderList: 'cart/updateAdminOrderList',
            orderDetail: 'cart/orderDetail',
            filterByType: 'cart/filterOrderByStatus'
        }),


        statusChange(x) {
            const status = event.target.value;
            const info = { id: x, status: Number(status) }
            this.updateOrderList(info)
        },

        detail(code) {
            this.orderDetail(code);
        },

        // Type Filter by click
        pending() {
            this.filterByType([1])
        },
        confirm() {
            this.filterByType([2])
        },
        reject() {
            this.filterByType([3])
        },
        all() {
            this.filterByType([0])
        },

    },



    beforeMount() {
        this.getOrderList()
    },

}
</script>

<style  scoped>
* {
    cursor: pointer;
}

/* Responsive */

@media (min-width:800px) {

    th,
    td {
        font-size: 12px;
    }

    .search-btn {
        margin-right: 30px;
    }
}

@media (max-width:500px) {

    th,
    td {
        font-size: 10px;
    }

    .search-btn {
        margin-right: 0;
    }

    .nav-btn {
        font-size: 10px;
        padding: 5px 5px;
    }

}

.table-wrap {
    cursor: pointer;
}


.img-wrap img {
    width: 60px;
    height: 60px;
    transition: all 0.5s ease-in-out;
    object-fit: cover;
}

.img-wrap img:hover {
    transform: scale(1.2) translateX(5px);
}

table * {
    font-size: 13px;
}

.table-responsive {
    /* width: 100%; */
    height: 70vh;
}

thead {
    position: sticky;
    top: 0;
    background-color: rgb(243, 240, 235);
}

.description {
    max-width: 150px !important;
    max-height: 70px;
    overflow: hidden;
    white-space: nowrap;
    word-break: break-all;
    text-overflow: ellipsis;
    text-align: start;
}




.tag-wrap {
    min-width: 100px !important;
    max-width: 160px;
    height: max-content;

}

thead {
    margin-bottom: 20px;
}

th {
    min-width: 120px;
}

.sticky {
    position: sticky;
    left: -10px;
    z-index: 20;
    background-color: rgb(220, 227, 227);
}

/* status Radio  ---------------------- */

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
