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