
import axios from 'axios'

const FoodModule = {
    namespaced: true,
    state() {
        return {
            foodList: '',
            categories: ''
        }
    },

    getters: {
        getCategories: (state) => state.categories,

        getFoodList: (state) => state.foodList,

    },

    mutations: {
        setCategories: (state, payload) => state.categories = payload,

        setFoodList: (state, payload) => state.foodList = payload,

    },



    actions: {
        //Categories
        getCategories: ({ commit }) => {
            axios.get('http://localhost:8000/api/user/categoriesList')
                .then((res) => {
                    commit('setCategories', res.data);

                }).catch((err) => {
                    console.log(err);

                })
        },


        // ALL OR SPECIFIC
        GetSpecific: ({ commit }, payload) => {

            axios.get(`http://localhost:8000/api/user/menu/getSpecific/${payload}`)
                .then((res) => {
                    commit('setFoodList', res.data)
                }).catch((err) => {
                    console.log(err, 'xxx');

                })
        }


    }

}
export default FoodModule;