<template>
    <div>
        <div class="p-3 h3">
            User List
            <hr>
        </div>
        <div class="table-nav d-flex justify-content-between">

            <div class="bg-light shadow-sm rounded-3 my-2 ms-2">
                <button class="btn-danger text-light nav-btn btn btn-sm" @click="admin">Admin</button>
                <button class="btn-primary btn ms-1 btn-sm nav-btn" @click="member">Member</button>
                <button class="btn-secondary btn ms-1 btn-sm nav-btn" @click="all">All</button>
            </div>
            <div class="search">
                <app-Search class="search-btn" />
            </div>
        </div>
        <div class="col-md-12 px-2 mx-auto table-responsive pb-5">



            <table class="table table-sm table-striped bg-light table-hover table-bordered" v-if="userList">
                <thead class="text-center text-muted">
                    <tr>
                        <th class="num"> .No</th>
                        <th class="img">Image</th>
                        <th class="sticky">Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Gender</th>
                        <th>Birthday</th>
                        <th>Role</th>
                        <th>Restriction</th>
                        <th>Allergies</th>
                        <th>Preferred</th>
                        <th>Membership</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody class="text-center">




                    <tr v-for="(u, i) in userList" :key="i" :draggable="true">
                        <td class="num">{{ i + 1 }}</td>
                        <td class="img-wrap">
                            <img :src="u.image" alt="profile" v-if="u.image != null">
                            <img src="../../../../public/assets/img/ERR404/istockphoto-1300845620-612x612.jpg"
                                class="p-1 opacity-50" alt="avatar" v-else>
                        </td>
                        <td class="sticky">{{ u.name }}</td>
                        <td class="">{{ u.email }}</td>
                        <td class="description">
                            {{ u.phone }}
                        </td>
                        <td class="description">
                            {{ u.address }}
                        </td>

                        <td>{{ u.gender }}</td>

                        <td>{{ u.birthday }}</td>

                        <td>
                            <select class="from-select form-select-sm shadow-none bg-transparent"
                                :disabled="authUser.id == u.id" @change="changedRole(u.id)">
                                <option value="null" :selected="u.role == null" disabled>
                                    - User Role
                                </option>
                                <option :value="r" :selected="r == u.role" v-for="r in roles" :key="r">
                                    {{ r == 1 ? 'Admin' : 'Member' }}
                                </option>
                            </select>


                        </td>

                        <td :class="{ 'text-danger': u.restrictions == 1 }">{{ u.restrictions == 1 ? 'Yes' : 'No' }}
                        </td>
                        <td :class="{ 'text-danger': u.allergies == 1 }">{{ u.allergies == 1 ? 'Yes' : 'No' }}</td>
                        <td>
                            <span v-if="u.tag">
                                {{ u.tag.name }}
                            </span>
                        </td>

                        <td>
                            <div>
                                <select class="form-select form-select-sm shadow-none bg-transparent"
                                    @change="changeMembership(u.id)" :hidden="u.role == 1">
                                    <option value="null" :selected="u.Membership == null" disabled>Membership
                                    </option>
                                    <option :value="m.id" :selected="m.id == u.membership" v-for="m in membership" :key="m">
                                        {{ m.status }}
                                    </option>
                                </select>
                            </div>
                        </td>
                        <td>
                            <div class="btn-wrap" v-if="authUser && authUser.id !== u.id">

                                <button class="btn btn-danger ms-1 btn-sm py-1" @click="del(u.name, u.email, u.id)">
                                    <i class="fa fa-trash " aria-hidden="true"></i>
                                    <!-- <span class="d-none mx-1 d-xl-inline">Delete</span> -->
                                </button>
                            </div>
                        </td>

                    </tr>



                </tbody>

            </table>

            <div class=" text-center" v-if="!userList">
                <h1 class="mt-5">
                    There is No Data !!! <span class="text-warning" style="cursor: pointer;"
                        @click="this.$router.push({ name: 'user_list' })">Add New</span>
                </h1>
            </div>

            <!-- <div class="p-5 bg-info" :on-drop="true">
                drop here
            </div> -->



        </div>


    </div>
</template>

<script>



import store from '../../../store'
import { mapGetters } from 'vuex'
import { smsQuestion } from '../../../store/Notify/notify.js'


export default {
    name: 'User-list',
    data() {
        return {
            roles: [0, 1],
            membership: [{ id: 1, status: 'Silver' }, { id: 2, status: 'Gold' }, { id: 3, status: 'Diamond' }],
            user_List: '',
            selectedRole: ''
        }
    },

    computed: {
        ...mapGetters({
            userList: 'users/getUserList',
            authUser: 'auth/getUserData',
            notify: 'notify/getAlertNotify',
        })
    },


    methods: {

        changedRole(id) {
            const val = Number(event.target.value);
            const info = { id: id, role: val }
            this.$store.dispatch('users/updateUser', info)
        },

        changeMembership(id) {
            const val = Number(event.target.value);
            const info = { id: id, membership: val }
            this.$store.dispatch('users/updateUser', info)
        },

        del(name, email, id) {
            if (name !== null) {
                const info = { name: name, id: id };
                smsQuestion(store.commit, info, 'Are u sure to remove this user')
            } else {
                const info = { name: email, id: id };
                smsQuestion(store.commit, info, 'Are u sure to remove this user')
            }

        },


        member() {
            this.$store.dispatch('users/admin_role', 0);
        },
        admin() {
            this.$store.dispatch('users/admin_role', 1);
        },
        all() {
            this.$store.dispatch('users/admin_role', 2);
        }


    },

    watch: {
        notify(notify) {

            if (notify[3] == 'question') {
                if (notify[0] == true) {
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

                                store.dispatch('users/deleteUser', notify[1].id);

                                instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');

                            }, true],
                            ['<button>NO</button>', function (instance, toast) {

                                instance.hide({ transitionOut: 'fadeOut' }, toast, 'button');

                            }],
                        ],
                        onClosing: function (instance, toast, closedBy) {
                            console.info('Closing | closedBy: ' + closedBy);
                        },
                        onClosed: function (instance, toast, closedBy) {
                            console.info('Closed | closedBy: ' + closedBy);
                        }
                    });
                }
            }


        }, //end notify

        userList() {
            this.user_List = this.userList;
        },
        authUser() {
            if (this.authUser.role !== 1) {
                this.$router.push({ name: 'home' })
            }
        }


    },


    beforeMount() {
        store.dispatch('users/getUserList')

    },


}
</script>

<style  scoped>
/* Responsive */

@media (min-width:800px) {

    th,
    td {
        font-size: 12px;
    }

    .search-btn {
        margin-right: 30px;
    }
}

@media (max-width:500px) {

    th,
    td {
        font-size: 10px;
    }

    .search-btn {
        margin-right: 0;
    }

    .nav-btn {
        font-size: 10px;
        padding: 5px 5px;
    }

}

.table-wrap {
    cursor: pointer;
}


.img-wrap img {
    width: 50px;
    height: 50px;
    transition: all 0.5s ease-in-out;
    object-fit: cover;
}



table * {
    font-size: 13px;
}

.table-responsive {
    /* width: 100%; */
    height: 70vh;
}

thead {
    position: sticky;
    top: -2px;
    z-index: 20;
    background-color: rgb(243, 240, 235);
    margin-bottom: 20px;
}


.description {
    max-width: 150px !important;
    max-height: 70px;
    overflow: hidden;
    white-space: nowrap;
    word-break: break-all;
    text-overflow: ellipsis;
    text-align: start;
}



.tag-wrap {
    width: 150px !important;
    height: max-content;

}

.sticky {
    position: sticky;
    left: -10px;
    z-index: 1;
    background-color: rgb(220, 227, 227);
}
</style>
