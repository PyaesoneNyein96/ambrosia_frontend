

import axios from "axios"
import { Loader } from '../ToolStore/loader.js'
import router from '../../router'
import { smsSuccess } from '../Notify/notify.js'

const ToolsModule = {
    namespaced: true,
    state() {
        return {
            loading: false,
            toggleNav: true,
            count: false,

            reservationPath: false,

            carousels: '',
            carouselEdit: '', //Route Security Only 

            carouselText: false, // auto Text



        }
    },
    getters: {

        getLoading: (state) => state.loading,
        getToggleNav: state => state.toggleNav,
        getCartCount: state => state.Count,

        getReservationPath: state => state.reservationPath,

        getAllCarousel: state => state.carousels,

        getCarouselEdit: state => state.carouselEdit,

        getCarouselText: state => state.carouselText,


    },
    mutations: {

        // LOADING
        setLoading: (state, payload) => state.loading = payload,

        // NavHide
        toggleNav: (state, payload) => state.toggleNav = payload,

        setCount: (state, payload) => state.count = payload,

        setReservationPath: (state, payload) => state.reservationPath = payload,

        setCarousel: (state, payload) => state.carousels = payload,

        setCarouselEdit: (state, payload) => state.carouselEdit = payload,

        setCarouselText: (state, payload) => state.carouselText = payload,


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
                            smsSuccess(commit, 'Carousel', 'Successfully added Carousel')
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
                        smsSuccess(commit, 'Carousel', 'Carousel Successfully deleted')
                    }
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(() => {
                    Loader(commit, false)
                })
        },

        UpdateCarousel: ({ commit, dispatch }, payload) => {
            Loader(commit, true)

            axios.post('http://localhost:8000/api/admin/carousel/update', payload)
                .then(res => {
                    if (res.data == 200) {
                        dispatch('getAllCarousel').then(() => {
                            router.push({ name: 'carousel_list' }).then(() => {
                                smsSuccess(commit, 'Carousel', 'Carousel Successfully Updated')
                            })
                        })
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