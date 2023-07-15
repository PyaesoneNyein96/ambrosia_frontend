
import axios from 'axios'
import router from '../../router'
import { Loader } from '../ToolStore/loader.js'
import { smsSuccess, smsError } from '../Notify/notify.js'



const PackageModule = {
    namespaced: true,
    state() {
        return {
            adminPackage: '',
            adminEditPackage: '',
        }
    },

    getters: {
        getAdminPackage: state => state.adminPackage,

        getEditPackage: state => state.adminEditPackage,

    },


    mutations: {
        setAdminPackage: (state, payload) => state.adminPackage = payload,

        setEditPackage: (state, payload) => state.adminEditPackage = payload,

    },


    actions: {


        //==================================================================================
        // Package Add ((Add))
        //==================================================================================

        addPackage: ({ commit }, payload) => {
            Loader(commit, true)

            axios.post('http://localhost:8000/api/package/add', payload)
                .then(res => {
                    smsSuccess(commit, 'Package Adding', `Successfully added ${res.data.package.name}.`)
                    router.push({ name: 'package_list' })
                })
                .catch(err => {
                    smsError(commit, "Package Adding Error", err.response.errors)
                })
                .finally(() => {
                    Loader(commit, false)
                })

        },

        //==================================================================================
        // Get / Fetch All Package  ((Admin))
        //==================================================================================

        getAllPackage: ({ commit }) => {
            Loader(commit, true)

            axios.get('http://localhost:8000/api/package/list')
                .then(res => {
                    commit('setAdminPackage', res.data);

                })
                .catch(err => {
                    smsError(commit, err.response.errors)
                })
                .finally(() => {
                    Loader(commit, false)

                })
        },


        //==================================================================================
        //  Fetch (Single) Package For Edit ((Admin))
        //==================================================================================

        getEditPack: ({ commit, getters }, payload) => {
            Loader(commit, true)

            try {
                const list = getters['getAdminPackage'];
                const proc = list.find(i => {
                    return i.id == payload
                })
                if (proc != null) {
                    commit('setEditPackage', proc)
                    router.push({ name: 'package_edit', params: { id: payload } })

                }
            } catch (err) {
                smsError(commit, err)

            }
            Loader(commit, false)
        },



        //==================================================================================
        //  Update or Package  ((Admin))
        //==================================================================================

        updatePackage: ({ commit, dispatch }, payload) => {
            Loader(commit, true);

            axios.post('http://localhost:8000/api/package/update', payload)
                .then(res => {
                    smsSuccess(commit, res.data.package.name, 'Successfully Updated');
                    dispatch('getAllPackage')
                        .then(() => {
                            router.push({ name: 'package_list' })
                        })
                })
                .catch(err => {
                    smsError(commit, "Package Update Error", err.response.errors)
                })
                .finally(() => {
                    Loader(commit, false)
                })
        },


        deletePackage: ({ commit, dispatch }, payload) => {

            Loader(commit, true)

            axios.post(`http://localhost:8000/api/package/delete/${payload}`)
                .then(res => {
                    smsSuccess(commit, res.data.name, 'was Successfully Deleted ');

                    dispatch('getAllPackage');
                })
                .catch(err => {
                    smsError(commit, err.response.errors)
                })
                .finally(() => {
                    Loader(commit, false)
                })

        }


    },

}

export default PackageModule