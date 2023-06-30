

import axios from "axios"
import { Loader } from '../ToolStore/loader.js'
import router from '../../router'

const ToolsModule = {
    namespaced: true,
    state() {
        return {
            loading: false,
            toggleNav: true,
            count: false,

            reservationPath: false,

            carousels: '',



        }
    },
    getters: {

        getLoading: (state) => state.loading,
        getToggleNav: state => state.toggleNav,
        getCartCount: state => state.Count,

        getReservationPath: state => state.reservationPath,

        getAllCarousel: state => state.carousels


    },
    mutations: {

        // LOADING
        setLoading: (state, payload) => state.loading = payload,

        // NavHide
        toggleNav: (state, payload) => state.toggleNav = payload,

        setCount: (state, payload) => state.count = payload,

        setReservationPath: (state, payload) => state.reservationPath = payload,

        setCarousel: (state, payload) => state.carousels = payload,


    },


    actions: {

        getAllCarousel: ({ commit }) => {
            Loader(commit, true)

            axios.get('http://localhost:8000/api/admin/carousel/list')
                .then(res => {
                    commit('setCarousel', res.data)
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(() => {
                    Loader(commit, false)
                })
        },


        setCarousel: ({ commit, dispatch }, payload) => {
            Loader(commit, true)
            axios.post('http://localhost:8000/api/admin/carousel/add', payload)
                .then(res => {

                    if (res.data == 200) {
                        dispatch('getAllCarousel').then(() => {
                            router.push({ name: 'carousel_list' })
                        })
                    }
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(() => {
                    Loader(commit, false)
                })

        },


        DeleteCarousel: ({ commit, dispatch }, payload) => {
            Loader(commit, true)
            axios.post(`http://localhost:8000/api/admin/carousel/delete/${payload}`)
                .then(res => {
                    if (res.data == 200) {
                        dispatch('getAllCarousel')
                    }
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(() => {
                    Loader(commit, false)
                })

        }


    }

}

export default ToolsModule 