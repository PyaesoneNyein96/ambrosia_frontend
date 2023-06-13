<template>
    <div class="category-wrap">
        <h1 class="p-3 fw-bold">
            Food Categories
            <hr>
        </h1>

        <div class="container col-md-10  rounded-3">
            <div class="row  mx-auto">
                <div class="col-md-6 bg-light left-side mt-3 p-2">
                    <span class="h5 ">Add Categories</span>
                    <form class=" shadow-sm p-3" @submit.prevent="add">
                        <input type="text" name="category" class="form-control shadow-none" v-model="category_name"
                            placeholder="Add Category name . . .">

                        <div class="err-wrap" v-if="getErr.length != 0">
                            <p class="mt-2 ms-1  text-danger small" v-for="err in getErr.name" :key="err">
                                {{ err }}
                            </p>
                        </div>
                        <button class="mt-2 btn bg-success bg-gradient text-light btn-sm rounded-0"
                            v-html="action == true ? 'Add' : 'Update'"></button>
                        <button type="button" class="btn btn-primary btn-sm mt-2 ms-1 rounded-0 
                        text-light py-1" v-if="!action" @click="turnToAdd">
                            Add new</button>
                    </form>
                </div>

                <div class="col-md-6 mt-3 right-side p-0">
                    <div class="card p-1 m-0 shadow-sm">
                        <div class="card-title mt-2">
                            <span class="h5"> Categories List</span>
                            <hr>
                        </div>
                        <div class="card-body p-0" v-if="categories.length != 0">
                            <TransitionGroup name="item" appear>
                                <ul v-for="(category, i) in categories" :key="category.id" class="text-start list-group">
                                    <li class="list-group-item d-flex justify-content-between">
                                        {{ i + 1 }}. {{ category.name }}

                                        <span class="btn-wrap">
                                            <button class="btn btn-success me-1 btn-sm py-0" @click="edit(category)">
                                                <i class="fa fa-edit fa-sm" aria-hidden="true"></i>
                                                <span class="d-none d-lg-inline">Edit</span>
                                            </button>

                                            <button class="btn btn-danger btn-sm py-0"
                                                @click="del(category.name, category.id)">
                                                <i class="fa fa-trash fa-sm" aria-hidden="true"></i>
                                                <span class="d-none d-lg-inline">Delete</span>
                                            </button>
                                        </span>
                                    </li>
                                </ul>
                            </TransitionGroup>
                        </div>
                        <div class="p-3 mt-2 text-center" v-else>
                            <h4 class="text-muted">There is no categories yet !</h4>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>

import store from '../../../store'
import { mapGetters } from 'vuex'
import { smsQuestion } from '../../../store/Notify/notify.js'
import { mapActions } from 'vuex'



export default {
    name: 'category-add',
    data() {
        return {
            category_name: '',
            action: true,
            category_id: null,


        }
    },
    computed: {
        ...mapGetters({
            categories: 'food/getCategories',
            getErr: 'food/getCategoryErr',
            notify: 'notify/getAlertNotify',
        }),
    },



    methods: {

        ...mapActions({
            addCategory: 'food/addCategory',
            getCategories: 'food/getCategories',
            updateCategory: 'food/updateCategory',
        }),


        turnToAdd() {
            this.action = true;
            this.category_name = ''
        },

        add() {

            if (this.action == true) {
                const name = { name: this.category_name }
                this.addCategory(name);

            } else {
                const info = { name: this.category_name, id: this.category_id }
                this.updateCategory(info);
                this.action = true
            }
            this.getCategories;

        },
        edit(x) {

            this.action = false
            this.category_id = x.id;
            this.category_name = x.name;

        },


        del(name, id) {
            const info = { name: name, id: id }
            smsQuestion(this.$store.commit, info, 'If you delete this, the associated <b>FOOD</b> will be completely lost')
        },




    },



    watch: {
        notify(notify) {
            if (notify[0] == true && notify[1].name) {
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

                            store.dispatch('food/deleteCategory', notify[1].id);

                            instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');

                        }, true],
                        ['<button>NO</button>', function (instance, toast) {

                            instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');

                        }],
                    ],
                    // onClosing: function (instance, toast, closedBy) {
                    //     console.info('Closing | closedBy: ' + closedBy);
                    // },
                    // onClosed: function (instance, toast, closedBy) {
                    //     console.info('Closed | closedBy: ' + closedBy);
                    // }
                });
            }
        },
        categories() {
            this.category_name = ''
        }
    },



    // beforeUpdate() {
    //     if (this.category_name !== '') {
    //         this.$store.commit('food/clearCategoryErr');
    //     }
    // },


    mounted() {
        this.$store.dispatch('food/getCategories')
    },

}
</script>

<style  scoped>
.list-group-item {
    transition: all 0.3s ease-in-out;
}

.list-group-item:hover {
    transform: translateY(-3px);
    background-color: rgba(224, 255, 255, 0.601);
}

.card-title {
    /* position: sticky; */
    height: 50px;
    top: 71px;
    /* z-index: 1000; */
    background-color: rgb(255, 255, 255);
    padding: 10px;
}

.left-side {
    position: sticky;
    height: 200px;
    z-index: 100;
    padding: 5em;
    top: 71px;
}

ul li {
    cursor: pointer;
}


/* Transition  */

.item-enter-from,
.item-leave-to {
    opacity: 0;
}

.item-enter-active {
    transition: 1s;
}

.item-leave-active {
    width: 100%;
    transition: all 0.3s;
    position: absolute;
}

.item-enter-to,
.item-leave-from {
    opacity: 1;
}

.item-move {
    transition: transform 0.5s;
}
</style>
