<template>
    <div>
        <div class="p-3 h3">
            Edit Food
            <hr>
        </div>
        <div class="col-md-9 mx-auto" v-if="form !== null">
            <form class=" bg-gradient" @submit.prevent="updateForm">
                <div class="p-3  rounded rounded-3 bg-gradient shadow">

                    <!-- ========== Image Section ========== -->

                    <div class="mb-4 text-danger text-center old-img">
                        <img :src="form.image" v-if="isImage"
                            class="img-fluid ${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}">
                        <img src="../../../../public/assets/img/ERR404/invalid-url-1354629517.png" v-else>
                    </div>

                    <div class="mb-4">
                        <input type="text" v-model="form.image" class="form-control shadow-none" placeholder="Image URL"
                            :class="{ 'is-invalid': getError.image }">
                        <p class="text-danger px-2 small" v-for=" err  in  getError.image " :key="err">
                            {{ err }}
                        </p>
                    </div>


                    <!-- ========== Name Section ========== -->
                    <div class="mb-4">
                        <input v-model="form.name" class="w-100 form-control shadow-none"
                            :class="{ 'is-invalid': getError.name }" type="text" placeholder="name">


                        <p class="text-danger px-2 small" v-for="err in getError.name" :key="err">
                            {{ err }}
                        </p>
                    </div>


                    <!-- ========== Image Section ========== -->


                    <!-- ========== Price Section ========== -->
                    <div class="mb-4">
                        <input v-model="form.price" class="w-100 form-control shadow-none" step="any" type="number"
                            placeholder="price" min="1" :class="{ 'is-invalid': getError.price }">
                        <p class="text-danger px-2 small" v-for="err in getError.price" :key="err">
                            {{ err }}
                        </p>
                    </div>


                    <!-- ========== Description Section ========== -->

                    <div class="mb-4">
                        <input v-model="form.description" class="w-100 form-control shadow-none" type="text"
                            placeholder="description" min="1" :class="{ 'is-invalid': getError.description }">
                        <p class="text-danger px-2 small" v-for="err in getError.description" :key="err">
                            {{ err }}
                        </p>
                    </div>



                    <!-- ========== Excerpt Section ========== -->

                    <div class="mb-4">
                        <textarea v-model="form.excerpt" name="excerpt" class="form-control shadow-none" rows="4"
                            placeholder="Excerpt" :class="{ 'is-invalid': getError.excerpt }"></textarea>
                        <p class="text-danger px-2 small" v-for="err in getError.excerpt" :key="err">
                            {{ err }}
                        </p>
                    </div>



                    <!-- ========== Category Section ========== -->

                    <div class="mb-4">
                        <select name="" class="form-control shadow-none" v-model="form.category_id"
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
                                {{ type.name }}
                            </option>
                        </select>
                        <p class="text-danger px-2 small" v-for="err in getError.type" :key="err">
                            {{ err }}
                        </p>
                    </div>



                    <!-- ========== Tag Section ========== -->


                    <div class="wrap row my-4 mx-2" :class="{ 'bd-red': getError.tags }">
                        <span class="h6 m-0 text-muted">Tags</span>

                        <div class="mt-3 col-lg-3 bg-light shadow-sm rounded" v-for="(tag, i) in tags" :key="i">
                            <label class="small label text-secondary px-2 rounded-2 check-label" :for="tag.id">
                                {{ tag.name }}
                            </label>

                            <input type="checkbox" :id="tag.id" @click="changed(tag.id)" :checked="oldVal.includes(tag.id)">
                        </div>
                    </div>
                    <p class="text-danger px-2  small" v-for="err in getError.tags" :key="err">
                        {{ err }}
                    </p>



                    <!-- ========== Type Section ========== -->

                    <div class="btn-wrap mt-2">
                        <button class="btn btn-outline-warning w-100 text-success">
                            <h3 class=" my-0">Update</h3>
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
            id: '',
            types: [{ id: 1, name: 'Food' }, { id: 0, name: 'Beverage' }],
            form: null,
            tagErr: false,
            oldTags: [],
            oldVal: [],


        }
    },
    computed: {
        ...mapGetters({
            categories: 'food/getCategories',
            tags: 'food/getTags',
            getError: 'food/getFoodErr',

            getSpecific: 'food/getSpecific'
        }),

        getErr() {
            return this.getError == this.getError ? this.getError : null
        },

        // isImage(url) {
        //     return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(this.form.image);
        // },

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
        },



        updateForm() {

            if (!this.form.tags) {
                this.tagErr = true
            }

            // Not Updated if Iag Err occur cause DB::Transition 
            this.$store.dispatch('food/UpdateFood', this.form)
                .then(() => {
                    this.$store.commit('food/setErr', []);
                    this.tagErr = false
                });



        },

        setOldValue() {
            this.form = { ...this.getSpecific };
            this.form.tags = [];
            this.oldTags = this.getSpecific.tag;

            for (const i of this.oldTags) {
                this.oldVal.push(i.id);
                this.form.tags.push(i.id)
            }






        },

        // trigger() {
        //     this.$toast.success({
        //         title: 'Okay par',
        //         message: 'Operation completed successfully',
        //     });
        // }


    },
    watch: {
        getSpecific() {
            this.setOldValue();

        },



    },


    beforeMount() {

        this.id = this.$route.params.id;
        if (!this.categories) {
            this.$store.dispatch('food/getCategories');
        }
        if (!this.tags) {
            this.$store.dispatch('food/getTags');
        }

        this.$store.dispatch('food/getFoodBySpecific', this.id);



    },

}
</script>

<style scoped>
.bd-red {
    border: rgba(255, 12, 12, 0.663) 1.7px solid;
    border-radius: 10px;
    padding: 10px;
}

input::-webkit-inner-spin-button {
    -webkit-appearance: unset;
}

.check-label {
    cursor: pointer;
}
</style>
