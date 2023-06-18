<template>
    <div class="">
        <h1 class="p-3 fw-bold my-0">Package List</h1>

        <div class="container bg-info mt-0">
            <div class="row bg-light bg-gradient shadow-sm p-2">

                <div class="col-md-6">
                    <div class="h4 mt-3">Food List
                        <hr>
                    </div>
                    <div class="row shadow-sm">
                        <div class="col-lg-3 col-md-4 col-sm-4 p-1 col-6" v-for="f in this.foodList" :key="f.id">

                            <div class="bg-light food-item-cover rounded-1 small p-1" draggable="true"
                                @dragstart="dragStart" @dragend="dragend" @click="pickItem(f.id)">
                                <div class="img-wrap">
                                    <img :src="f.image" alt="" class="package-img card-img img-thumbnail img-fluid">
                                </div>

                                <div class="package-name px-2">
                                    {{ f.name }}
                                    <hr class="my-0 py-1">
                                </div>
                                <span class="d-block bg-secondary  text-center text-light ">
                                    {{ f.price }} $
                                </span>
                            </div>

                        </div>
                    </div>

                </div>


                <div class="col-md-5 offset-md-1 bg-light">
                    <div class="h4 mt-3 ">Selected Food List
                        <hr>
                    </div>

                    <div class="row bg-light bg-gradient p-2 shadow-sm selected-box">
                        <div class="col-md-3 col-4 p-1 rounded-1" v-for="s in collection" :key="s.id">
                            <div class="bg-light food-item-cover rounded-1 small p-1" draggable="true"
                                @click="removeItem(s.id)">
                                <div class="img-wrap">
                                    <img :src="s.image" class="package-img-selected card-img img-thumbnail img-fluid">
                                </div>


                                <span class="d-block bg-secondary rounded-2 text-center text-light">
                                    {{ s.price }} $
                                </span>

                            </div>
                        </div>
                    </div>


                    <div class="row mt-3 bg-light text-center">

                        <div class="bg-light shadow-sm py-1 ">
                            <span> <input type="number" hidden v-model="discountPercentage"></span>
                            <div class="d-flex justify-content-center">
                                <div>
                                    <span> Discount : {{ discountPercentage }} % </span>
                                </div>
                                <button class="btn mx-1 small btn-sm py-0 btn-secondary" @click="minus">
                                    -
                                </button>
                                <button class="btn ms-1 small btn-sm py-0 btn-warning   " @click="plus">
                                    +
                                </button>
                            </div>
                        </div>

                        <div class="bg-light shadow-sm py-1">
                            SubTotal: {{ subtotal }} $
                        </div>
                        <div class="bg-light shadow-sm py-1">
                            Total(with Discount %): <span class="overall">{{ overAll }}</span> $ </div>
                    </div>
                    <div class="row my-3 rounded-2 shadow-sm">
                        <div class="col p-2">

                            <input type="text" class="form-control shadow-none" v-model="form.name"
                                placeholder="Package Name">

                            <button :disabled="!form.name" type="button"
                                class="btn btn-primary text-light w-100 mt-3 shadow-sm" @click="add">
                                Add Package
                            </button>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>

import { mapGetters } from 'vuex'
import { smsInform } from '../../../store/Notify/notify.js'


export default {
    name: 'package-add',
    data() {
        return {
            originalList: '',
            selected: [],
            collection: [],
            subtotal: 0,
            discountPercentage: 1,
            overAll: 0,

            form: {
                name: '',
                selected: '',
                sub_total: '',
                net_total: '',
                percentage: ''
            }

        }
    },

    computed: {
        ...mapGetters({
            foodList: 'food/getAdminFoodList'
        })
    },

    methods: {
        pickItem(id) {
            if (this.collection.length >= 12) {
                return smsInform(this.$store.commit, 'Not Allowed', "You Can't add more then 8 dishes in total !")
            }
            // const singleItemForShow = this.collection.find(i => {
            //     return i.id == id
            // });

            if (this.validation(id)) {

                this.foodList.find(i => {
                    if (i.id == id) {
                        this.collection.push(i);
                        this.selected.push(i.id);
                        this.subtotal += Number(i.price)
                    }
                });
                this.totalCheck()
            }

        },

        validation(x) {

            const singleItem = this.collection.filter(i => {
                return i.id === x
            });

            if (singleItem.length < 3) {
                return true
            } else {
                smsInform(this.$store.commit, 'Not Allowed', "You cannot add more than 3 per dish. !")
                return
            }

        },

        // counterFun() {
        //     let els = {};
        //     const vv = this.collection.forEach(val => els[val.id] = (els[val.id] || 0) + 1);
        //     this.counter = els
        //     console.log(els);
        // },



        removeItem(x) {
            const i = this.collection.findIndex(o => o.id === x);

            const p = this.collection.find(i => i.id === x)

            this.subtotal = this.subtotal - p.price;
            this.collection.splice(i, 1);

            this.totalCheck()


        },

        plus() {
            if (this.discountPercentage > 0) {
                this.discountPercentage++

                this.totalCheck()

            }
        },
        minus() {
            if (this.discountPercentage > 1) {
                this.discountPercentage--
                this.totalCheck()

            }
        },
        totalCheck() {
            this.overAll = this.subtotal - (this.discountPercentage * this.subtotal / 100);
            this.overAll = this.overAll.toFixed(2);

        },

        add() {

            if (this.addValid() && this.selected.length >= 3) {
                this.$store.dispatch('package/addPackage', this.form);
            }
            else if (this.addValid() && this.selected.length <= 3) {
                smsInform(this.$store.commit, 'Incomplete Process', 'Number of food dish should more than 3.');
            } else {
                smsInform(this.$store.commit, 'Incomplete Process', 'Complete the Package adding process.');
            }

        },
        addValid() {

            this.form.selected = this.selected;
            this.form.sub_total = this.subtotal;
            this.form.net_total = Number(this.overAll);
            this.form.percentage = this.discountPercentage;
            console.log(this.form);

            if (this.form.selected && this.form.net_total && this.form.sub_total &&
                this.form.percentage && this.form.name !== '') {
                return true
            } else {
                return false
            }
        }





    },





    beforeMount() {
        this.$store.dispatch('food/getFoodByType', 2)
    }
}
</script>

<style  scoped>
.package-img {
    width: 100%;
    height: 100px;
    object-fit: cover;
}

.package-img-selected {
    width: 100%;
    height: 80px;
    object-fit: cover;
}

.package-name {
    height: 40px;
    overflow-y: scroll;
    background-color: rgba(216, 229, 197, 0.752);

}

.food-item-cover {
    cursor: pointer;
}

.selected-box {
    min-height: 240px;
}

.overall {
    display: inline-block;
    width: 60px;
    background-color: #8e87041e;
    border-radius: 10px;
    border: #8e8704 solid 1px;
}



/* scroll bar  */

::-webkit-scrollbar {
    width: 3px !important;
    /* Width of the scrollbar */
}

::-webkit-scrollbar-track {
    background: #f1f1f1 !important;
    /* Color of the scrollbar track */
}

::-webkit-scrollbar-thumb {
    background: #8e8704 !important;
    /* Color of the scrollbar thumb */
}

::-webkit-scrollbar-thumb:hover {
    background: #55555500 !important;
    /* Color of the scrollbar thumb on hover */
}
</style>
