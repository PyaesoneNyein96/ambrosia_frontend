<template>
    <div>
        <div class="p-3 h3 ">
            User Profile
            <hr>
        </div>
        <div class="top-wrap container">
            <div class="col-md-10 mx-auto">
                <div class="card bg-light shadow">


                    <form class="p-1" @submit.prevent="update">
                        <div class="row bg-light ">

                            <div class="col-md-5 p-4 shadow">
                                <div class="profile-wrap p-3">
                                    <img src="../../../../public/assets/img/GODlogopng.png"
                                        class="bg-warning card-img opacity-75" id="profile" v-if="!form.image">
                                    <img :src="form.image" class="bg-warning card-img" id="profile" v-else>
                                </div>



                                <div class="text-center" :hidden="disabled">
                                    <label for="profile_pic" class="btn btn-warning rounded-1 text-light py-1">
                                        Upload Image
                                    </label>
                                    <input type="file" class="d-none" id="profile_pic" @change="previewImage">
                                    <hr>
                                </div>


                            </div>

                            <!-- ========== End of Image Section ========== -->


                            <div class="col-md-7 bg-light py-5">


                                <!-- ========== Name Section ========== -->
                                <div class="form-floating mb-2">
                                    <input v-model="form.name" type="text" class="form-control shadow-none" placeholder=""
                                        :disabled="disabled">
                                    <label class="form-label">User Name</label>
                                    <div v-if="getProfileErr.name && getProfileErr.name.length != 0">
                                        <small class="text-danger" v-for="err in getProfileErr.name" :key="err">
                                            {{ err }}
                                        </small>
                                    </div>
                                </div>

                                <!-- ========== Email Section ========== -->
                                <div class="form-floating mb-2">
                                    <input type="text" class="form-control  shadow-none" placeholder="" v-model="form.email"
                                        :disabled="disabled">
                                    <label class="form-label">User Email</label>
                                    <div v-if="getProfileErr.email">
                                        <small class="text-danger" v-for="err in getProfileErr.email" :key="err">
                                            {{ err }}
                                        </small>
                                    </div>
                                </div>

                                <!-- ========== Phone Section ========== -->
                                <div class="form-floating mb-2">
                                    <input type="number" class="form-control shadow-none" placeholder=""
                                        v-model="form.phone" :disabled="disabled">
                                    <label class="form-label">User Phone</label>
                                    <div v-if="getProfileErr.phone">
                                        <small class="text-danger" v-for="err in getProfileErr.phone" :key="err">
                                            {{ err }}
                                        </small>
                                    </div>
                                </div>


                                <fieldset class=" border px-3 shadow-sm">

                                    <legend class="float-none w-auto p-2">
                                        <span class="text-muted h5">Optional:</span>
                                    </legend>

                                    <!-- ========== Gender Section ========== -->
                                    <div class="form-group mb-2">
                                        <select class="form-select shadow-none" id="gender" v-model="form.gender"
                                            :disabled="disabled">
                                            <option value="null" selected disabled>User Gender</option>
                                            <option :value="g" v-for=" g  in  gender " :key="g">{{ g }}</option>
                                        </select>
                                    </div>

                                    <div class="form-group mb-2">

                                        <textarea rows="3" class="form-control shadow-none" placeholder="Address"
                                            v-model="form.address" :disabled="disabled"></textarea>

                                    </div>

                                    <!-- ========== Birthday Section ========== -->

                                    <div class="form-group my-3 p-2 shadow-sm rounded">
                                        <label class="form-label">Date of Birth</label>
                                        <input type="date" class="form-control w-100 shadow-none" v-model="form.birthday"
                                            placeholder="YYYY-MM-DD" :disabled="disabled">
                                    </div>

                                    <!-- ========== warning Section ========== -->

                                    <div class="form-group my-3 d-flex justify-content-start">

                                        <div class="warning-wrap me-3">
                                            <input id="warning_1" type="checkbox" class="form-checkbox me-2" hidden
                                                @change="restrictionChange" :disabled="disabled">
                                            <label for="warning_1" class="form-label fw-bold text-secondary"
                                                :class="{ 'text-danger': form.restrictions == 1 }">
                                                Dietary Restrictions :{{ form.restrictions == 1 ? 'Yes' : 'No' }}
                                            </label>
                                        </div>

                                        <div class="warning-wrap">
                                            <input id="warning_2" type="checkbox" class="form-checkbox me-2" hidden
                                                :disabled="disabled" @change="allergiesChange">
                                            <label for="warning_2" class="form-label fw-bold text-secondary"
                                                :class="{ 'text-danger': form.allergies == 1 }">
                                                Allergies: {{ form.allergies == 1 ? 'Yes' : 'No' }}
                                            </label>

                                        </div>
                                    </div>

                                    <hr>



                                    <!-- ========== Favorite Section ========== -->

                                    <div class="mb-2 shadow-sm rounded p-2 mx-1 row">
                                        <span class="fw-bold text-success">Preferred Cuisine</span>

                                        <div class="form-check col-lg-4" v-for="tag in getTags" :key="tag.id">

                                            <input class="form-check-input" type="radio" :id="tag.name" :disabled="disabled"
                                                :value="tag.id" v-model="form.preferred_cuisine">
                                            <label class="form-check-label" :for="tag.name">
                                                {{ tag.name }}
                                            </label>
                                        </div>
                                    </div>


                                </fieldset>

                                <!-- ========== Role Section ========== -->

                                <div class="form-group my-2">
                                    <select class="form-select shadow-none" disabled v-model="form.role">
                                        <option value="null" selected disabled>user Role</option>
                                        <option :value="role" v-for="role in roles " :key="role">
                                            {{ role == 1 ? 'Admin' : 'Member' }}
                                            <!-- {{ role }} -->
                                        </option>

                                    </select>
                                </div>

                                <!-- ========== Membership Section ========== -->

                                <div class="form-group my-2" v-if="form.role !== 1">
                                    <select class="form-select shadow-none" disabled v-model="form.membership">
                                        <option value="null" selected disabled>Membership Level -</option>

                                        <option :value="m.id" v-for=" m  in  Membership " :key="m">
                                            Membership Level : {{ m.level }}</option>
                                    </select>
                                </div>

                                <!-- ========== Button Section ========== -->

                                <div class="btn-wrap mt-3">
                                    <button class="btn btn-outline-success rounded-0 me-3" v-if="!disabled">
                                        Update
                                    </button>
                                    <button type="button" class="btn btn-outline-secondary rounded-0" @click="change_status"
                                        v-html="disabled ? 'I want to Change' : 'Lock'">

                                    </button>

                                </div>





                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
    name: 'user-profile',
    data() {
        return {
            allergies: false,
            restrictions: false,
            gender: ['Male', 'Female'],
            roles: [0, 1],
            Membership: [{ id: 1, level: 'Silver' }, { id: 2, level: 'Gold' }, { id: 3, level: 'Diamond' }],

            form: '',
            // avatar_slot: 'https://rb.gy/kanf3',
            // avatar_slot: '../../../../public/assets/img/chefs/chefs-1.jpg',
            disabled: true
        }
    },

    computed: {
        ...mapGetters({
            userData: 'auth/getUserData',
            getTags: 'food/getTags',
            getProfileErr: 'auth/getProfileErr'
        })
    },

    methods: {
        setData() {
            this.form = { ...this.userData }
        },

        allergiesChange() {
            this.allergies = !this.allergies
            if (this.allergies == true) {
                this.form.allergies = 1
            } else {
                this.form.allergies = 0
            }
        },
        restrictionChange() {

            this.restrictions = !this.restrictions
            if (this.restrictions == true) {
                this.form.restrictions = 1
            } else {
                this.form.restrictions = 0
            }
        },

        change_status() {
            if (this.getProfileErr) {
                this.disabled = false
            } else {

                this.disabled = !this.disabled;
            }

        },

        previewImage() {
            const profile = document.getElementById('profile_pic').files[0];
            if (profile) {
                this.form.image = URL.createObjectURL(profile)
            }
        },


        // --------- 
        update() {


            const profile = document.getElementById('profile_pic').files[0];
            const formData = new FormData();


            // for (const key in this.form) {
            //     if (Object.prototype.hasOwnProperty.call(this.form, key)) {
            //         formData.append(key, this.form[key]);
            //     }
            // }

            Object.entries(this.form).forEach(([key, value]) => {
                if (value == 'null' || value == null) {
                    return
                } // Check this out (important for backend validation)

                formData.append(key, value);
            });


            formData.append('image', profile);


            this.$store.dispatch('auth/profileUpdate', formData)



        },


    },




    watch: {
        userData() {
            this.setData();
            this.getProfileErr
        },

        // getProfileErr()

    },



    beforeMount() {
        this.form = this.userData;
        this.$store.dispatch('food/getTags');
        this.getProfileErr
    },

    beforeUpdate() {
        this.getProfileErr;
        // this.$store.commit('auth/setProfileErr', '')
    },




}
</script>

<style scoped>
/* input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
} */

input::-webkit-inner-spin-button {
    -webkit-appearance: unset;
}



legend.scheduler-border {
    width: inherit;
    /* Or auto */
    padding: 0 10px;
    /* To give a bit of padding on the left and right */
    border-bottom: none;
}
</style>
