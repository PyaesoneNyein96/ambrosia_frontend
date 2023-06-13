
import axios from "axios"
import { Loader } from '../ToolStore/loader.js'
import { smsError, smsSuccess, smsInform } from '../Notify/notify.js'
import router from '../../router'







const UserModule = {
    namespaced: true,

    state() {
        return {
            userList: '',
            editUser: '',
        }
    },


    getters: {
        getUserList: state => state.userList,

        getEditUser: state => state.editUser,

    },


    mutations: {
        setUserList: (state, payload) => state.userList = payload,

        setEditUser: (state, payload) => state.editUser = payload,
    },


    actions: {

        getUserList: ({ commit }) => {

            Loader(commit, true)

            axios.get('http://localhost:8000/api/user/list')
                .then(res => {
                    for (const u of res.data) {

                        if (u.image !== null) {
                            u.image = `http://localhost:8000/storage/profile/` + u.image;
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



            axios.post(`http://localhost:8000/api/user/delete/${payload}`)
                .then((res) => {
                    console.log(res.data);
                    if (res.data.name != null) {
                        smsSuccess(commit, res.data.name, 'Successfully deleted !!')
                    } else {
                        smsSuccess(commit, res.data.email, 'Successfully deleted !!')
                    }
                    dispatch('getUserList')
                })
                .catch((err) => {
                    console.log(err);
                    smsError(commit, err)
                })
                .finally(() => {
                    Loader(commit, false)
                })

        },


        updateUser: ({ commit, dispatch }, payload) => {
            Loader(commit, true);
            console.log(payload);

            axios.post(`http://localhost:8000/api/user/update`, payload)
                .then((res) => {

                    dispatch('auth/autoLogin', null, { root: true })
                    dispatch('getUserList');
                    smsInform(commit, res.data.email, 'was successfully changed role.')
                })
                .catch(err => {
                    console.log(err);

                }).finally(() => {
                    Loader(commit, false)

                })

        },

    }
}

export default UserModule 