// /* eslint-disable  */

import axios from "axios";
import { Loader } from '../ToolStore/loader.js'


const CartModule = {
    namespaced: true,
    state() {
        return {

            user_CartList: ''
        }
    },

    getters: {
        getCartListByUser: state => state.user_CartList
    },

    mutations: {

        setCartListByUser: (state, payload) => {
            state.user_CartList = payload;
        },

    },

    actions: {

        setCartFood: ({ commit, rootGetters }, payload) => {
            Loader(commit, true);

            const user_id = rootGetters['auth/getUserData'].id;
            const info = { user_id: user_id, type: payload }


            axios.post('http://localhost:8000/api/user/cart', info)
                .then(res => {
                    console.log(res.data);
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(() => {
                    Loader(commit, false);
                })
        },


        getCartListByUser: ({ commit, rootGetters }) => {
            Loader(commit, true);

            const user_id = rootGetters['auth/getUserData'].id;

            axios.post(`http://localhost:8000/api/user/cart/list/${user_id}`)
                .then(res => {
                    commit('setCartListByUser', res.data);
                    // console.log(res.data);

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