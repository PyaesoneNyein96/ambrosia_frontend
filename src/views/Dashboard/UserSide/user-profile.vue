<template>
    <div>
        <h1 class="p-3 fw-bold">
            User Profile
            <hr>
        </h1>
        <div class="top-wrap container">
            <div class="col-md-10 mx-auto">
                <div class="card bg-light shadow">


                    <form class="p-1" @submit.prevent="update">
                        <div class="row bg-light ">

                            <div class="col-md-5 p-4 shadow">
                                <div class="profile-wrap p-3">
                                    <img :src="avatar_slot" class="bg-warning card-img" id="profile" v-if="!form.image">
                                    <img :src="form.image" class="bg-warning card-img" id="profile" v-else>
                                </div>
                                <div class="avatar-wrap px-4 mt-0 row">
                                    <div class="col  mx-auto" v-for=" i in avatar " :key="i.id">
                                        <img :src="i.url" class="card-img rounded-5 bg-success p-1 avatars"
                                            @click="avatar_Change(i)" :hidden="disabled">
                                    </div>
                                </div>
                                <hr>

                                <div class="text-center" :hidden="disabled">
                                    <label for="profile_pic" class="btn btn-info rounded-1 text-light py-1">
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
                                    <input v-model="form.name" type="text" class="form-control shadow-none" placeholder=" "
                                        :disabled="disabled">
                                    <label class="form-label">User Name</label>
                                </div>

                                <!-- ========== Email Section ========== -->
                                <div class="form-floating mb-2">
                                    <input type="text" class="form-control  shadow-none" placeholder=" "
                                        v-model="form.email" :disabled="disabled">
                                    <label class="form-label">User Email</label>
                                </div>

                                <!-- ========== Phone Section ========== -->
                                <div class="form-floating mb-2">
                                    <input type="number" class="form-control shadow-none" placeholder=" "
                                        v-model="form.phone" :disabled="disabled">
                                    <label class="form-label">User Phone</label>
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
                                            <input id="warning_1" type="checkbox" class="form-checkbox me-2"
                                                v-model="form.restrictions" :disabled="disabled">
                                            <label for="warning_1" class="form-label fw-bold text-secondary"
                                                :class="{ 'text-danger': form.restrictions }">
                                                Dietary Restrictions
                                            </label>
                                        </div>

                                        <div class="warning-wrap">
                                            <input id="warning_2" type="checkbox" class="form-checkbox me-2"
                                                v-model="form.allergies" @click="allergies = !allergies"
                                                :disabled="disabled">
                                            <label for="warning_2" class="form-label fw-bold text-secondary"
                                                :class="{ 'text-danger': form.allergies }">
                                                Allergies: {{ allergies == true ? 'Yes' : 'No' }}
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
                                        <option value="" selected disabled>user Role</option>
                                        <option :value="form.role" v-for=" role  in  roles " :key="role">
                                            {{ role == 1 ? 'Admin' : 'Member' }}</option>

                                    </select>
                                </div>

                                <!-- ========== Membership Section ========== -->

                                <div class="form-group my-2" v-if="form.role != 1">
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
            gender: ['Male', 'Female'],
            roles: [0, 1],
            Membership: [{ id: 1, level: 'Silver' }, { id: 2, level: 'Gold' }, { id: 3, level: 'Diamond' }],

            form: '',
            avatar: [
                { id: 1, url: 'https://res.cloudinary.com/psn-cloudinary/image/upload/v1686160547/tiger_unbu3z.png' },
                { id: 2, url: 'https://res.cloudinary.com/psn-cloudinary/image/upload/v1686160546/gorilla_dshomh.png' },
                { id: 3, url: 'https://res.cloudinary.com/psn-cloudinary/image/upload/v1686160546/bee_jdcfug.png' },
                { id: 4, url: 'https://res.cloudinary.com/psn-cloudinary/image/upload/v1686160546/fox_xgem35.png' },
            ],
            avatar_slot: 'https://rb.gy/kanf3',

            disabled: true
        }
    },

    computed: {
        ...mapGetters({
            userData: 'auth/getUserData',
            getTags: 'food/getTags',
        })
    },

    methods: {
        setData() {
            this.form = { ...this.userData }
        },



        change_status() {
            this.disabled = !this.disabled
        },

        previewImage() {
            const profile = document.getElementById('profile_pic').files[0];
            if (profile) {
                this.form.image = URL.createObjectURL(profile)
            }
        },

        avatar_Change(i) {
            this.form.image = i.url;
            // let profile = document.getElementById('profile_pic').files[0];
            let profile = document.getElementById('profile_pic');
            profile.value = null;
            console.log(this.form.image);

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
                formData.append(key, value);
            });

            if (profile !== undefined) {
                formData.append('image', profile);
            } else {
                formData.append('image', this.form.image);
            }

            this.$store.dispatch('auth/profileUpdate', formData)
                .then(() => {
                    this.disabled = true
                })
        },


    },




    watch: {
        userData() {
            this.setData();
        }
    },

    beforeMount() {
        this.form = { ...this.userData };
        this.$store.dispatch('food/getTags');

    }
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

.avatars {
    transition: all 0.3s ease-in-out;
}

.avatars:hover {
    transform: translateY(-5px) scale(1.08);
}
</style>
