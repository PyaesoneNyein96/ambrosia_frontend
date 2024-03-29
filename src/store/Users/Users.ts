
import axios from "axios"
import { Loader } from '../ToolStore/loader.js'
import router from "../../router"
import { smsError, smsSuccess, smsInform } from '../Notify/notify.js'


import { baseUrl, imageUrl } from './../../components/Tools-axios/baseURL';







const UserModule = {
    namespaced: true,

    state() {
        return {
            userList: '',
            editUser: '',
            reviewList: '',
        }
    },


    getters: {
        getUserList: state => state.userList,

        getEditUser: state => state.editUser,

        getReviewList: state => state.reviewList,

    },


    mutations: {
        setUserList: (state, payload) => state.userList = payload,

        setEditUser: (state, payload) => state.editUser = payload,

        setReviewList: (state, payload) => state.reviewList = payload,
    },


    actions: {

        getUserList: ({ commit }) => {

            Loader(commit, true)

            axios.get(`${baseUrl}/user/list`)
                .then(res => {
                    for (const u of res.data) {

                        if (u.image !== null) {
                            u.image = `${imageUrl}/storage/profile/` + u.image;
                        }
                    }
                    commit('setUserList', res.data)

                })
                .catch(err => {
                    smsError(commit, 'User List Error', err)

                }).finally(() => {
                    Loader(commit, false)
                })

        },


        // ==================================
        // Delete User 
        // ==================================

        deleteUser: ({ commit, dispatch }, payload) => {
            Loader(commit, true);

            axios.post(`${baseUrl}/user/delete/${payload}`)
                .then((res) => {

                    if (res.data.name != null) {
                        smsSuccess(commit, res.data.name, 'Successfully deleted !!')
                    } else {
                        smsSuccess(commit, res.data.email, 'Successfully deleted !!')
                    }
                    dispatch('getUserList')
                })
                .catch((err) => {
                    smsError(commit, err.response.data.message)
                })
                .finally(() => {
                    Loader(commit, false)
                })

        },

        // ==================================
        // Update User 
        // ==================================

        updateUser: ({ commit, dispatch }, payload) => {
            Loader(commit, true);


            axios.post(`${baseUrl}/user/update`, payload)
                .then((res) => {

                    dispatch('auth/autoLogin', null, { root: true })
                    dispatch('getUserList');
                    smsInform(commit, res.data.email, 'was successfully changed role.')
                })
                .catch(err => {

                    smsError(commit, err.response.data.message)

                }).finally(() => {
                    Loader(commit, false)

                })

        },


        // ==================================
        // Search User 
        // ==================================

        searchUserByAdmin: ({ commit }, payload) => {
            Loader(commit, true)

            axios.post(`${baseUrl}/search/user`, payload)
                .then(res => {

                    for (const u of res.data.result) {
                        if (u.image !== null) {
                            u.image = `${imageUrl}/storage/profile/` + u.image
                        }
                    }
                    commit('setUserList', res.data.result)

                }).catch(err => {
                    smsError(commit, err)
                }).finally(() => {
                    Loader(commit, false)
                })

        },

        // ==================================
        // Search By (Role)
        // ==================================

        admin_role: ({ commit }, payload) => {
            Loader(commit, true)

            axios.post(`${baseUrl}/user/role/${payload}`)
                .then(res => {

                    for (const u of res.data) {
                        if (u.image !== null) {
                            u.image = `${imageUrl}/storage/profile/` + u.image
                        }
                    }
                    commit('setUserList', res.data)
                }).catch(err => {
                    smsError(commit, err)
                }).finally(() => {
                    Loader(commit, false)
                })

        },



        // ==================================
        // Submit Review By (user)
        // ==================================

        submitReview: ({ commit, dispatch }, payload) => {
            Loader(commit, true)

            axios.post(`${baseUrl}/user/review/submit`, payload)
                .then(res => {
                    if (res.data) {
                        dispatch('getReviews').then(() => {

                            router.push({ name: 'review' })
                                .then(() => {
                                    smsInform(commit, 'Review', 'Thanks so much for sharing your experience with us.')
                                })
                        })
                    }


                }).catch(err => {
                    smsError(commit, err)
                }).finally(() => {
                    Loader(commit, false)
                })

        },

        // ==================================
        // Review List (for All)
        // ==================================



        getReviews: ({ commit }) => {

            Loader(commit, true)

            axios.get(`${baseUrl}/user/review/list`)
                .then(res => {
                    for (const u of res.data) {
                        if (u.user.image !== null) {
                            u.user.image = `${imageUrl}/storage/profile/` + u.user.image
                        }

                    }
                    commit('setReviewList', res.data)

                }).catch(err => {
                    smsError(commit, err.response.data.message)
                }).finally(() => {
                    Loader(commit, false)
                })

        },


    }
}

export default UserModule 