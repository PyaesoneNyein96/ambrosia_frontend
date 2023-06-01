
import axios from 'axios'
import { Loader } from '../ToolStore/loader.js'
import router from '../../router'

import { smsSuccess, smsError, smsInform } from '../Notify/notify.js'

const FoodModule = {
    namespaced: true,
    state() {
        return {
            foodList: '',
            categories: '',
            tags: '',
            // foodTag: '',
            errors: [],
            specFood: ''
        }
    },

    getters: {
        getCategories: state => state.categories,

        getTags: state => state.tags,

        getFoodList: state => state.foodList,

        getSpecific: state => state.specFood,

        getFoodErr: state => state.errors,

    },

    mutations: {
        setCategories: (state, payload) => state.categories = payload,

        setTags: (state, payload) => state.tags = payload,

        setFoodList: (state, payload) => state.foodList = payload,

        setErr: (state, payload) => state.errors = payload,

        setSpecificFood: (state, payload) => state.specFood = payload

    },



    actions: {
        //==================================================================================
        //Categories
        //==================================================================================

        getCategories: ({ commit }) => {
            axios.get('http://localhost:8000/api/user/categoriesList')
                .then((res) => {
                    commit('setCategories', res.data);

                }).catch((err) => {
                    console.log(err);
                })
        },

        //==================================================================================
        // Get Tag 
        //==================================================================================

        getTags: ({ commit }) => {
            axios.get('http://localhost:8000/api/user/tagsList')
                .then((res) => {
                    commit('setTags', res.data);

                }).catch((err) => {

                    console.log(err);

                })
        },

        //==================================================================================
        // ALL OR SPECIFIC FOOD by Category
        //==================================================================================

        GetSpecific: ({ commit }, payload) => {
            Loader(commit, true)
            axios.get(`http://localhost:8000/api/user/menu/getSpecific/${payload}`)
                .then((res) => {
                    commit('setFoodList', res.data)
                }).catch((err) => {
                    console.log(err);

                }).finally(() => {
                    Loader(commit, false)
                })
        },


        //==================================================================================
        // FOOD CREATE 
        //==================================================================================

        createFood: ({ commit }, payload) => {

            Loader(commit, true)
            // le.log(payload);

            axios.post(`http://localhost:8000/api/food/create`, payload)
                .then(res => {
                    console.log(res.data);

                    router.push({ name: 'food-List' })
                }).catch(err => {
                    commit('setErr', err.response.data.errors);
                }).finally(() => {
                    Loader(commit, false)
                })

        },



        //==================================================================================
        // GET FOOD BY EAC SPECIFIC (EDIT) 
        //==================================================================================

        getFoodBySpecific: ({ commit }, payload) => {
            Loader(commit, true)

            axios.get(`http://localhost:8000/api/food/${payload}`,)
                .then(res => {
                    commit('setSpecificFood', res.data);
                }).then(() => {
                    router.push({ name: 'food-Edit', params: { id: payload } })
                })
                .catch(err => {
                    console.log(err);

                }).finally(() => {
                    Loader(commit, false)
                })
        },


        //==================================================================================
        // Update Food 
        //==================================================================================

        UpdateFood: ({ commit }, payload) => {


            axios.post(`http://localhost:8000/api/food/update`, payload)
                .then(res => {
                    router.push({ name: 'food-List' });


                    smsSuccess(commit, `${res.data.food.name}`, `Successfully Updated .`);
                })
                .catch(err => {
                    commit('setErr', err.response.data.errors);
                    smsError(commit, "Update Error", 'Incomplete Process !!!')
                })

        }


    }

}
export default FoodModule;