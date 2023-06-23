/* eslint-disable  */

import axios from "axios";
import { Loader } from '../ToolStore/loader.js'
import router from '../../router'
import { smsSuccess, smsError, cartSuccess, orderSuccess } from '../Notify/notify.js'




const CartModule = {
    namespaced: true,
    state() {
        return {
            user_CartList: '',
            user_orderList: '',
        }
    },

    getters: {
        getCartListByUser: state => state.user_CartList,

        getUserOrderList: state => state.user_orderList,
    },

    mutations: {

        setCartListByUser: (state, payload) => {
            state.user_CartList = payload;
        },

        setUserOrderList: (state, payload) => {
            state.user_orderList = payload;
        }

    },

    actions: {

        setCartFood: ({ commit, rootGetters }, payload) => {
            Loader(commit, true);

            const user_id = rootGetters['auth/getUserData'].id;
            const info = { user_id: user_id, type: payload }


            axios.post('http://localhost:8000/api/user/cart', info)
                .then(res => {
                    // console.log(res.data);
                    // commit('tool/setCount', true, { root: true })
                    cartSuccess(commit)
                })
                .catch(err => {
                    console.log(err);
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

            axios.post(`http://localhost:8000/api/user/cart/list/${user_id}`)
                .then(res => {
                    commit('setCartListByUser', res.data);
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(() => {
                    Loader(commit, false)
                });

        },


        // ===========================================================
        // User Cart (Remove)
        // ===========================================================

        remove: ({ commit }, payload) => {
            Loader(commit, true)
            // console.log(payload);
            axios.post(`http://localhost:8000/api/user/cart/remove`, payload)
                .then(res => {
                    // 
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

            axios.post('http://localhost:8000/api/user/cart/order', payload)
                .then(res => {
                    console.log(res.data);
                    dispatch('getCartListByUser');
                    orderSuccess(commit)
                    router.push({ name: 'user_Check' })
                })
                .catch(err => {
                    console.log(err);
                    smsError(commit, 'Order Error', 'Something wrong, try again later.')
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
            // console.log(payload);

            axios.post(`http://localhost:8000/api/user/order/list/${payload}`)
                .then(res => {
                    commit('setUserOrderList', res.data)

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

export default CartModule