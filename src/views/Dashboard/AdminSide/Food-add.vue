<template>
    <div>
        <h1 class="p-3 fw-bold">
            Add Food
            <hr>
        </h1>

        <div class="col-md-9 mx-auto">
            <form class=" bg-gradient" @submit.prevent="submitForm">
                <div class="p-3  rounded rounded-3 bg-gradient shadow">

                    <!-- ========== Image Section ========== -->
                    <!-- <div class="mb-4 pre-img">
                        <img :src="form.image"
                            class="img-fluid ${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}">
                    </div>


                    <div class="mb-4 text-danger text-center     old-img">
                        <img :src="form.image" v-if="isImage"
                            class="img-fluid ${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}">
                        <img src="../../../../public/assets/img/ERR404/invalid-url-1354629517.png" v-else>
                    </div> -->

                    <div class="mb-4 text-danger text-center old-img">
                        <img :src="form.image" v-if="isImage"
                            class="img-fluid ${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}">
                        <img src="../../../../public/assets/img/ERR404/invalid-url-1354629517.png" v-else>
                    </div>

                    <div class="mb-4">
                        <input type="text" v-model="form.image" class="form-control" placeholder="Image URL"
                            :class="{ 'is-invalid': getError.image }">
                        <p class="text-danger px-2 small" v-for=" err  in  getError.image " :key="err">
                            {{ err }}
                        </p>
                    </div>

                    <!-- ========== Name Section ========== -->
                    <div class="mb-4">
                        <input v-model="form.name" class="w-100 form-control shadow-none "
                            :class="{ 'is-invalid': getError.name }" type="text" placeholder="name">
                        <p class="text-danger px-2 small" v-for="err in getError.name" :key="err">
                            {{ err }}
                        </p>
                    </div>
                    <!-- ========== Price Section ========== -->
                    <div class="mb-4">
                        <input v-model="form.price" class="w-100 form-control shadow-none" type="number" placeholder="price"
                            min="1" :class="{ 'is-invalid': getError.price }">
                        <p class="text-danger px-2 small" v-for="err in getError.price" :key="err">
                            {{ err }}
                        </p>
                    </div>


                    <!-- ========== Description Section ========== -->

                    <div class="mb-4">
                        <textarea v-model="form.description" name="description" class="form-control shadow-none" rows="4"
                            placeholder="Description" :class="{ 'is-invalid': getError.description }"></textarea>

                        <p class="text-danger px-2 small" v-for="err in getError.description" :key="err">
                            {{ err }}
                        </p>
                    </div>


                    <!-- ========== Category Section ========== -->

                    <div class="mb-4">
                        <select name="" class="form-control shadow-none " v-model="form.category_id"
                            :class="{ 'is-invalid': getError.category_id }">
                            <option value="" selected disabled> - Choice Category</option>
                            <option :value="cat.id" v-for="cat in categories" :key="cat.id">
                                {{ cat.name }}</option>
                        </select>
                        <p class="text-danger px-2 small" v-for="err in getError.category_id" :key="err">
                            {{ err }}
                        </p>
                    </div>


                    <!-- ========== Type Section ========== -->

                    <div class="mb-2">
                        <select class="form-control shadow-none" v-model="form.type"
                            :class="{ 'is-invalid': getError.type }">
                            <option value="" selected disabled> - Choice Type</option>
                            <option :value="type.id" v-for="type in types" :key="type">
                                {{ type.name }}</option>
                        </select>
                        <p class="text-danger px-2 small" v-for="err in getError.type" :key="err">
                            {{ err }}
                        </p>
                    </div>


                    <!-- ========== Tag Section ========== -->

                    <div class="wrap row my-4 mx-2" :class="{ 'bd-red': getError.tags }">
                        <span class="h6 m-0 text-muted">Tags</span>
                        <div class="mt-3 col-lg-4 bg-light shadow-sm rounded" v-for="tag in tags" :key="tag.id">
                            <input type="checkbox" :value="tag.id" :id="tag.id" class="bg-dark" @click="changed(tag.id)">
                            <label class="small label text-secondary  px-2 rounded-2" style="cursor: pointer;"
                                :for="tag.id">
                                {{ tag.name }}
                            </label>
                        </div>
                        <p class="text-danger px-2 small" v-for="err in getError.tags" :key="err">
                            {{ err }}
                        </p>

                    </div>


                    <!-- ========== Type Section ========== -->

                    <div class="btn-wrap">
                        <button class="btn btn-outline-warning w-100 text-success">
                            <h3 class=" my-0">Submit</h3>
                        </button>
                    </div>

                </div>

            </form>

        </div>




    </div>
</template>

<script>




import { mapGetters } from 'vuex'

export default {
    name: 'Food-add',


    data() {

        return {

            types: [{ id: 1, name: 'Food' }, { id: 0, name: 'Beverage' }],
            form: {
                name: '',
                price: '',
                description: '',
                category_id: '',
                status: 1,
                image: '',
                type: '',
                tags: [],
            },
            tagErr: false



        }
    },
    computed: {
        ...mapGetters({
            categories: 'food/getCategories',
            tags: 'food/getTags',
            getError: 'food/getFoodErr'
        }),

        getErr() {
            return this.getError == this.getError ? this.getError : null
        },

        isImage() {
            const pattern = new RegExp(
                '^(https?:\\/\\/)?' + // protocol
                '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
                '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
                '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
                '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
                '(\\#[-a-z\\d_]*)?$',
                'i'
            );
            return pattern.test(this.form.image);
        },

    },
    methods: {
        changed(e) {
            if (!this.form.tags.includes(e)) {
                this.form.tags.push(e)
            } else {
                this.form.tags = this.form.tags.filter(i => {
                    return i !== e
                })
            }

            console.log(this.form.tags);

        },

        submitForm() {

            if (!this.form.tags) {
                this.tagErr = true
            }
            this.$store.dispatch('food/createFood', this.form)
                .then(() => {
                    this.$store.commit('food/setErr', []);
                    this.tagErr = false
                });

            // console.log(this.getError.price);
        },






    },


    mounted() {
        this.$store.dispatch('food/getCategories');
        this.$store.dispatch('food/getTags');
    },

}
</script>

<style scoped>
.bd-red {
    border: red 1.5px solid;
    border-radius: 10px;
    padding: 10px;
}
</style>
