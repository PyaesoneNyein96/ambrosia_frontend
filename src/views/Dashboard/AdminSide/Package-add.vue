<template>
    <div class="">
        <h1 class="p-3 fw-bold">Package</h1>

        <div class="container ">
            <div class="row bg-light bg-gradient shadow-sm p-2">
                <div class="col-md-6">

                    <div class="h4">Food List</div>
                    <div class="row shadow-sm">
                        <div class="col-lg-3 col-md-3 col-sm-4 p-1 " v-for="f in this.foodList" :key="f.id">

                            <div class="bg-light food-item-cover rounded-1 small p-1" draggable="true"
                                @dragstart="dragStart" @dragend="dragend" @click="pickItem(f.id)">
                                <div class="img-wrap">
                                    <img :src="f.image" alt="" class="package-img card-img img-thumbnail img-fluid">
                                </div>

                                <div class="package-name px-2">
                                    {{ f.name }}
                                    <hr class="my-0 py-1">
                                </div>
                                <span class="d-block bg-secondary rounded-2 text-center text-light">
                                    {{ f.price }} $
                                </span>
                            </div>

                        </div>


                    </div>

                </div>


                <div class="col-md-5 offset-md-1" @dragover="true">
                    <div class="h4 ">Selected Food List</div>
                    <div class="row bg-info p-2 shadow-sm">
                        <div class="col-md-4  p-1 rounded-1" v-for="s in collection" :key="s.id">
                            <div class="bg-light food-item-cover rounded-1 small p-1" draggable="true"
                                @dragstart="dragStart" @dragend="dragend" @click="removeItem(s.id)">
                                <div class="img-wrap">
                                    <img :src="s.image" alt="" class="package-img card-img img-thumbnail img-fluid">
                                </div>

                                <div class="package-name px-2">
                                    {{ s.name }}
                                    <hr class="my-0 py-1">
                                </div>
                                <span class="d-block bg-secondary rounded-2 text-center text-light">
                                    {{ s.price }} $
                                </span>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    </div>
</template>

<script>

import { mapGetters } from 'vuex'


export default {
    name: 'package-add',
    data() {
        return {
            originalList: '',
            selected: [],
            collection: [],
            counter: '',

        }
    },

    computed: {
        ...mapGetters({
            foodList: 'food/getAdminFoodList'
        })
    },
    methods: {
        pickItem(id) {
            if (this.collection.length >= 9) {
                alert('enough')
                return
            }

            const singleItemForShow = this.collection.find(i => {
                return i.id == id
            });
            console.log(singleItemForShow);

            if (this.validation(id)) {
                this.originalList.find(i => {
                    if (i.id == id) {
                        this.collection.push(i)
                    }
                });

            }

            this.counterFun();
        },

        validation(x) {

            const singleItem = this.collection.filter(i => {
                return i.id === x
            });

            if (singleItem.length < 3) {
                return true
            } else {

                return false
            }

        },
        counterFun() {
            let els = {};
            this.collection.forEach(val => els[val.id] = (els[val.id] || 0) + 1);
            this.counter = els
            console.log(this.counter);
        },






        removeItem(x) {


            const i = this.collection.findIndex(o => o.id === x);
            this.collection.splice(i, 1)




        }





    },

    watch: {
        foodList() {
            this.originalList = this.foodList
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

.package-name {
    height: 40px;
    overflow-y: scroll;
    background-color: rgba(216, 229, 197, 0.752);

}

.food-item-cover {
    cursor: pointer;
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
