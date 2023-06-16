<template>
    <div>
        <h1 class="p-3 fw-bold">
            Food List
            <hr>
        </h1>
        <div class="table-nav d-flex justify-content-between">

            <div class="bg-light shadow-sm rounded-3 my-2">
                <button class="btn-info text-light nav-btn btn btn-sm" @click="drink">Drink</button>
                <button class="btn-success btn ms-1 btn-sm nav-btn" @click="food">Food</button>
                <button class="btn-secondary btn ms-1 btn-sm nav-btn" @click="all">All</button>
            </div>
            <div class="search">
                <app-Search class="search-btn" />
            </div>
        </div>
        <div class="col-md-12 px-2 mx-auto table-responsive pb-5">



            <table class="table table-sm table-striped bg-light table-hover" v-if="getAdminFoodList.length !== 0">
                <thead class="text-center text-muted">
                    <tr>
                        <th class="num">.No</th>
                        <th class="img sticky">Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>description</th>
                        <th>excerpt</th>
                        <th>Status</th>
                        <th>Type</th>
                        <th>Tag</th>
                        <th>Category</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody class="text-center">

                    <tr v-for="(f, i) in getAdminFoodList" :key="i">
                        <td class="num">{{ i + 1 }}</td>
                        <td class="img-wrap sticky">
                            <img :src="f.image" alt="meal" v-if="f.image" :title="f.name">
                            <img src="../../../../public/assets/img/GODlogopng.png" alt="meal" v-else>
                        </td>
                        <td>{{ f.name }}</td>
                        <td>{{ f.price }}</td>
                        <td class="description">
                            {{ f.description }}
                        </td>
                        <td class="description">
                            {{ f.excerpt }}
                        </td>

                        <td>{{ f.status == 1 ? 'A' : 'N/A' }}</td>

                        <td>{{ f.type == 1 ? 'Food' : 'Beverage' }}</td>

                        <td>
                            <div class="tag-wrap row m-0 p-0">
                                <span class=" tag-field col mb-1" v-for="tag in f.tag" :key="tag.id">
                                    <span class="rounded-2 me-1 text-light px-1 bg-secondary"
                                        :class="{ 'bg-danger': tag.name.includes('Special'), 'bg-info': tag.name == 'Economica', 'bg-warning': tag.name == 'Popular' }">
                                        {{ tag.name }}
                                    </span>
                                </span>
                            </div>
                        </td>

                        <td>{{ f.category.name }}</td>
                        <td>
                            <div class="btn-wrap">
                                <button class="btn btn-success ms-1 btn-sm py-1" @click="goToEdit(f.id)">
                                    <i class="fa fa-edit" aria-hidden="true"></i>
                                    <span class="d-none d-lg-inline">Edit</span>
                                </button>
                                <button class="btn btn-danger ms-1 btn-sm py-1" @click="del(f.name, f.id)">
                                    <i class="fa fa-trash" aria-hidden="true"></i>
                                    <span class="d-none d-lg-inline">Delete</span>
                                </button>
                            </div>
                        </td>

                    </tr>


                </tbody>

            </table>

            <div class=" text-center" v-if="getAdminFoodList.length == 0">
                <h1 class="mt-5">
                    There is No Data !!! <span class="text-warning" style="cursor: pointer;"
                        @click="this.$router.push({ name: 'food_Add' })">Add New</span>
                </h1>
            </div>





        </div>


    </div>
</template>

<script>

import { mapGetters } from 'vuex'
import { smsQuestion } from '../../../store/Notify/notify.js'
import { mapActions } from 'vuex'
import store from '../../../store'



export default {
    name: 'Food-list',


    computed: {
        ...mapGetters({
            allFoodList: 'food/getFoodList',
            getAdminFoodList: 'food/getAdminFoodList',
            notify: 'notify/getAlertNotify',
        })
    },

    methods: {
        // Map Actions
        ...mapActions({
            GetSpecific_All: 'food/GetSpecific_All',
            getFoodBySpecific: 'food/getFoodBySpecific',
            getFoodByType: 'food/getFoodByType',

        }),

        // Type Filter by click
        drink() {
            this.getFoodByType([0])
        },
        food() {
            this.getFoodByType([1])
        },
        all() {
            this.getFoodByType([2])
        },

        // To Edit
        goToEdit(id) {
            this.getFoodBySpecific(id)
        },

        // To Delete
        del(name, id) {
            const info = { name: name, id: id }
            smsQuestion(store.commit, info);
        }
    },

    watch: {
        notify(notify) {
            if (notify[3] == 'question') {
                if (notify[0] == true) {
                    this.$toast.question({
                        timeout: 20000,
                        close: false,
                        overlay: true,
                        displayMode: 'once',
                        id: 'question',
                        zindex: 999,
                        title: notify[1].name,
                        message: notify[2],
                        position: 'center',
                        buttons: [
                            ['<button><b>YES</b></button>', function (instance, toast) {
                                store.dispatch('food/deleteFood', notify[1].id);

                                instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');

                            }, true],
                            ['<button>NO</button>', function (instance, toast) {

                                instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');

                            }],
                        ],
                        onClosing: function (instance, toast, closedBy) {
                            console.info('Closing | closedBy: ' + closedBy);
                        },
                        onClosed: function (instance, toast, closedBy) {
                            console.info('Closed | closedBy: ' + closedBy);
                        }
                    });
                }
            }
        }
    },


    beforeMount() {

        this.getFoodByType([2])
    }
}
</script>

<style  scoped>
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

.sticky {
    position: sticky;
    left: -10px;
    z-index: 20;
    background-color: rgb(220, 227, 227);
}
</style>
