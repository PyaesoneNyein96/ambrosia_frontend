/* eslint-disable  */

import axios from "axios";
import { Loader } from '../ToolStore/loader.js'
import router from '../../router'
import { smsSuccess, smsError, cartSuccess, orderSuccess } from '../Notify/notify.js'

import { baseUrl } from './../../components/Tools-axios/baseURL';







const CartModule = {
    namespaced: true,
    state() {
        return {
            user_CartList: '',
            user_orderList: '',
            admin_orderList: '',

            orderDetail: '',
            orderCode: ''
        }
    },

    getters: {
        getCartListByUser: state => state.user_CartList,

        getUserOrderList: state => state.user_orderList,

        getAdmin_orderList: state => state.admin_orderList,

        getOrderDetail: state => state.orderDetail,

        getOrderCode: state => state.orderCode,

    },

    mutations: {

        setCartListByUser: (state, payload) => {
            state.user_CartList = payload;
        },

        setUserOrderList: (state, payload) => {
            state.user_orderList = payload;
        },

        setAdminOrderList: (state, payload) => {
            state.admin_orderList = payload;
        },

        setOrderDetail: (state, payload) => {
            state.orderDetail = payload
        },

        setOrderCode: (state, payload) => {
            state.orderCode = payload
        }





    },

    actions: {

        setCartFood: ({ commit, dispatch, rootGetters }, payload) => {
            Loader(commit, true);

            const user_id = rootGetters['auth/getUserData'].id;
            const info = { user_id: user_id, type: payload }


            axios.post(`${baseUrl}/user/cart`, info)
                .then(res => {
                    dispatch('getCartListByUser')
                    cartSuccess(commit)
                })
                .catch(err => {
                    smsError(commit, err.response.data.message)
                })
                .finally(() => {
                    Loader(commit, false);


                })
        },



        // ===========================================================
        // User Cart List
        // ===========================================================
        getCartListByUser: ({ commit, rootGetters }) => {
            Loader(commit, true);


            const user_id = rootGetters['auth/getUserData'].id

            axios.post(`${baseUrl}/user/cart/list/${user_id}`)
                // axios.post(`${baseUrl}/user/cart/list/${user_id}`)
                .then(res => {

                    commit('setCartListByUser', res.data);
                })
                .catch(err => {
                    smsError(commit, err.response.data.message)
                    console.log(err.response);

                })
                .finally(() => {
                    Loader(commit, false)
                });

        },


        // ===========================================================
        // User Cart (Remove)
        // ===========================================================

        remove: ({ commit, dispatch }, payload) => {
            Loader(commit, true)

            axios.post(`${baseUrl}/user/cart/remove`, payload)
                .then(res => {
                    dispatch('getCartListByUser')
                })
                .catch(err => {
                    smsError(commit, 'Cart Error', 'Something wrong, try again later.')
                })
                .finally(() => {
                    Loader(commit, false)
                })

        },


        // ===========================================================
        // Send Order from Cart 
        // ===========================================================

        submitOrder: ({ commit, dispatch }, payload) => {



            Loader(commit, true)

            axios.post(`${baseUrl}/user/cart/order`, payload)
                .then(res => {

                    dispatch('getCartListByUser');
                    orderSuccess(commit)
                    router.push({ name: 'user_Check' })
                })
                .catch(err => {

                    smsError(commit, 'Order Error', 'Something wrong, try again later.')
                })
                .finally(() => {
                    Loader(commit, false)
                })
        },

        // ===========================================================
        // Send Order with Table 
        // ===========================================================

        bookTable: ({ commit, dispatch }, payload) => {

            Loader(commit, true)

            axios.post(`${baseUrl}/user/book/table`, payload)
                .then(res => {

                    dispatch('getCartListByUser');
                    orderSuccess(commit)
                    router.push({ name: 'user_Check' })
                })
                .catch(err => {
                    smsError(commit, err.response.data.message)
                })
                .finally(() => {
                    Loader(commit, false)
                })


        },

        // ===========================================================
        // Get order List for (user)
        // ===========================================================

        getOrderListByUser: ({ commit }, payload) => {
            Loader(commit, false)


            axios.post(`${baseUrl}/user/order/list/${payload}`)
                .then(res => {
                    commit('setUserOrderList', res.data)

                })
                .catch(err => {
                    smsError(commit, err.response.data.message)
                })
                .finally(() => {
                    Loader(commit, false)
                })
        },


        // ===========================================================
        // Get order List for (Admin)
        // ===========================================================

        getOrderListByAdmin: ({ commit }) => {

            Loader(commit, true)

            axios.get(`${baseUrl}/admin/order/list`)
                .then(res => {
                    commit('setAdminOrderList', res.data)
                })
                .catch(err => {
                    smsError(commit, err.response.data.message)
                })
                .finally(() => {
                    Loader(commit, false)
                })

        },


        // ===========================================================
        // Order Update (Admin) pending, confirm , reject
        // ===========================================================

        updateAdminOrderList: ({ commit, dispatch }, payload) => {
            Loader(commit, true)

            axios.post(`${baseUrl}/admin/order/update`, payload)
                .then(res => {
                    if (res.data == 200) {
                        dispatch('getOrderListByAdmin');
                        smsSuccess(commit, 'Order Update', 'Done')
                    }
                })
                .catch(err => {

                    smsError(commit, err)
                })
                .finally(() => {
                    Loader(commit, false)
                })

        },

        // ===========================================================
        // Order Detail for (Admin)
        // ===========================================================
        orderDetail: ({ commit }, payload) => {
            Loader(commit, true)

            axios.post(`${baseUrl}/admin/order/detail/${payload}`)
                .then(res => {
                    commit('setOrderCode', payload)
                    commit('setOrderDetail', res.data);
                    router.push({ name: 'order_detail', params: { id: payload } });
                })
                .catch(err => {
                    smsError(commit, err)
                })
                .finally(() => {
                    Loader(commit, false)
                })
        },

        searchOrderByAdmin: ({ commit }, payload) => {
            Loader(commit, true)

            axios.post(`${baseUrl}/search/order`, payload)
                .then(res => {
                    commit('setAdminOrderList', res.data);
                })
                .catch(err => {

                    smsError(commit, err.response.data.message)
                })
                .finally(() => {
                    Loader(commit, false)
                })

        },


        filterOrderByStatus: ({ commit }, payload) => {
            Loader(commit, true)



            axios.post(`${baseUrl}/admin/filter/order/${payload}`,)
                .then(res => {


                    commit('setAdminOrderList', res.data);
                })
                .catch(err => {
                    smsError(commit, err.response.data.message)
                })
                .finally(() => {
                    Loader(commit, false)
                })

        }




    }
}

export default CartModule