<template>
    <div class="">
        <div class="p-3 h3 my-0">Package Edit
            <hr>
        </div>

        <div class="container bg-info mt-0">
            <div class="row bg-light bg-gradient shadow-sm p-2">

                <div class="col-md-6">
                    <div class="h4 mt-3">Foods $ Drinks
                        <FoodByType />
                        <hr>
                    </div>
                    <div class="row shadow-sm left-box">
                        <div class="col-lg-3 col-md-4 col-sm-4 p-1 col-6" v-for="f in this.foods" :key="f.id">

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
                        <div class="col-md-3 col-4 p-1 rounded-1" v-for="s in form.selected" :key="s.id">
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

                        <div class="wrap  px-5 text-start">
                            <div class="bg-light  py-1 ">
                                <div class="d-flex text-start">
                                    <div style="width:130px">
                                        <span> Discount : {{ form.percentage }} % </span>
                                    </div>
                                    <div class="">
                                        <button class="btn mx-1 small btn-sm py-0 btn-secondary" @click="minus">
                                            -
                                        </button>
                                        <button class="btn ms-1 small btn-sm py-0 btn-warning   " @click="plus">
                                            +
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div class=" py-1">
                                SubTotal : {{ this.form.sub_total }} $
                            </div>
                            <div class=" py-1">
                                Net Amount : <span class="overall">{{ form.net_total }}</span> $
                            </div>
                        </div>
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

import FoodByType from '../../../components/Tools/foodByType'

export default {
    name: 'package-edit',

    components: {
        FoodByType
    },
    data() {
        return {
            foods: '',
            form: {
                name: '',
                selected: [],
                sub_total: 0,
                net_total: 0,
                percentage: 0
            }
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
            if (this.form.selected.length >= 12) {
                return smsInform(this.$store.commit, 'Not Allowed', "You Can't add more then 8 dishes in total !")
            }


            if (this.validation(id)) {

                this.foodList.find(i => {
                    if (i.id == id) {
                        this.form.selected.push(i);
                        this.form.sub_total += Number(i.price)
                    }
                    console.log(this.form.sub_total);
                });
                this.totalCheck()
            }

        },

        validation(x) {

            const singleItemCount = this.form.selected.filter(i => {
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
            const i = this.form.selected.findIndex(o => o.id === x);

            const p = this.form.selected.find(i => i.id === x)

            this.form.sub_total = this.form.sub_total - p.price;
            this.form.selected.splice(i, 1);

            this.totalCheck()


        },

        plus() {
            if (this.form.percentage >= 0) {
                this.form.percentage++

                this.totalCheck()

            }
        },
        minus() {
            if (this.form.percentage > 0) {
                this.form.percentage--

                this.totalCheck()


            }
        },
        totalCheck() {
            this.form.net_total = this.form.sub_total - (this.form.sub_total * this.form.percentage / 100);
            this.form.net_total = Number(this.form.net_total.toFixed(2));

        },

        add() {

            if (this.finalValidate() && this.form.selected.length >= 3) {
                this.$store.dispatch('package/updatePackage', this.form);

            }
            else if (this.finalValidate() && this.form.selected.length <= 3) {
                smsInform(this.$store.commit, 'Incomplete Process', 'Number of food dish should more than 3.');
            } else {
                smsInform(this.$store.commit, 'Incomplete Process', 'Complete the Package adding process.');
            }

        },
        finalValidate() {


            if (this.form.selected && this.form.sub_total && this.form.net_total
                && this.form.percentage && this.form.name !== '') {

                this.form.id = this.editPackage.id;
                return true
            } else {
                return false
            }
        },


        setOldVal() {

            for (const i of this.editPackage.food) {
                this.form.selected.push(i);
            }
            this.form.name = this.editPackage.name
            this.form.sub_total = Number(this.editPackage.sub_total)
            this.form.percentage = this.editPackage.percentage
            this.form.net_total = this.editPackage.net_total;

        },

        // -------------by Type

        // drink() {
        //     this.$store.dispatch('food/getFoodByType', 0)
        //     // this.getFoodByType([0])
        // },
        // food() {
        //     this.$store.dispatch('food/getFoodByType', 1)
        // },
        // all() {
        //     this.$store.dispatch('food/getFoodByType', 2)
        // },







    },

    watch: {
        foodList() {
            this.foods = this.foodList
        }
    },

    mounted() {

        this.setOldVal();

    },

    beforeUpdate() {
        // console.log(this.editPackage);
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
    text-align: center;
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
