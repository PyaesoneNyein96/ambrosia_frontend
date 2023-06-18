<template>
    <div class="">
        <h1 class="p-3 fw-bold my-0">Package Edit</h1>

        <div class="container bg-info mt-0">
            <div class="row bg-light bg-gradient shadow-sm p-2">

                <div class="col-md-6">
                    <div class="h4 mt-3">Food List
                        <hr>
                    </div>
                    <div class="row shadow-sm left-box">
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
                            SubTotal : {{ subtotal }} $
                        </div>
                        <div class="bg-light shadow-sm py-1">
                            Total(with Discount %): <span class="overall">{{ overAll }}</span> $ </div>
                    </div>
                    <div class="row my-3 rounded-2 shadow-sm">
                        <div class="col p-2">

                            <input type="text" class="form-control shadow-none" v-model="form.name"
                                placeholder="Package Name">

                            <button type="button" class="btn btn-success text-light w-100 mt-3 shadow-sm" @click="add">
                                Update Package
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
    name: 'package-edit',
    data() {
        return {
            selected: [],
            collection: [],
            subtotal: 0,
            discountPercentage: 1,
            overAll: 0,

            form: {
                name: '',
                selected: '',
                total: '',
                percentage: ''
            },
            oldVal: []



        }
    },

    computed: {
        ...mapGetters({
            foodList: 'food/getAdminFoodList',
            editPackage: 'package/getEditPackage'
        })
    },

    methods: {
        pickItem(id) {
            if (this.collection.length >= 12) {
                return smsInform(this.$store.commit, 'Not Allowed', "You Can't add more then 8 dishes in total !")
            }


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

            const singleItemCount = this.collection.filter(i => {
                return i.id === x
            });

            if (singleItemCount.length < 3) {
                return true
            } else {
                smsInform(this.$store.commit, 'Not Allowed', "You cannot add more than 3 per dish. !")
                return
            }

        },




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

            if (this.finalValidate() && this.selected.length >= 4) {
                this.$store.dispatch('package/addPackage', this.form);
            }
            else if (this.finalValidate() && this.selected.length < 4) {
                smsInform(this.$store.commit, 'Incomplete Process', 'Number of food dish should more than 3.');
            } else {
                smsInform(this.$store.commit, 'Incomplete Process', 'Complete the Package adding process.');
            }

        },
        finalValidate() {

            this.form.selected = this.selected;
            this.form.total = Number(this.overAll);
            this.form.percentage = this.discountPercentage

            if (this.form.selected && this.form.total && this.form.percentage && this.form.name !== '') {
                return true
            } else {
                return false
            }
        },


        setOldVal() {
            for (const i of this.editPackage.food) {
                this.collection.push(i);
            }

            for (const i of this.editPackage.food) {
                this.selected.push(i.id)
                // this.subtotal += Number(i.price)
            }

            this.form = this.editPackage;

            this.overAll = this.editPackage.net_total;
            this.subtotal = (this.editPackage.net_total * 100) / (100 - this.editPackage.percentage);
            this.subtotal = this.subtotal.toFixed(2)
            this.discountPercentage = this.editPackage.percentage;


            // this.totalCheck();


        }







    },


    mounted() {

        this.setOldVal();


    },


    beforeMount() {
        this.$store.dispatch('food/getFoodByType', 2)
    }
}
</script>

<style  scoped>
.left-box {
    height: 490px;
    overflow-y: scroll;
}

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
