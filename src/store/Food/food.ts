
import axios from 'axios'
import { Loader } from '../ToolStore/loader.js'
import router from '../../router'

import { smsSuccess, smsError, smsInform } from '../Notify/notify.js'
import { dispatch } from './../../../../restaurant_api/vendor/livewire/livewire/js/util/dispatch';






const FoodModule = {
    namespaced: true,
    state() {
        return {
            foodList: '',
            categories: '',
            tags: '',
            errors: [],
            categoryErr: '',
            tagErr: '',
            specFood: ''
        }
    },

    getters: {
        getCategories: state => state.categories,

        getTags: state => state.tags,

        getFoodList: state => state.foodList,

        getSpecific: state => state.specFood,

        getFoodErr: state => state.errors,

        getCategoryErr: state => state.categoryErr,

        getTagErr: state => state.tagErr,

    },

    mutations: {
        setCategories: (state, payload) => state.categories = payload,

        setTags: (state, payload) => state.tags = payload,

        setFoodList: (state, payload) => state.foodList = payload,

        setSpecificFood: (state, payload) => state.specFood = payload,

        setErr: (state, payload) => state.errors = payload,

        setCategoryErr: (state, payload) => state.categoryErr = payload,

        setTagErr: (state, payload) => state.tagErr = payload,

        //Clear  =======================================
        clearCategoryErr: (state) => state.categoryErr = '',
        clearTagErr: (state) => state.tagErr = '',

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
        // Get Tags
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

        GetSpecific_All: ({ commit }, payload) => {
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

            axios.get(`http://localhost:8000/api/food/edit/${payload}`,)
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

            Loader(commit, true)

            axios.post(`http://localhost:8000/api/food/update`, payload)
                .then(res => {
                    router.push({ name: 'food-List' });
                    smsSuccess(commit, `${res.data.food.name}`, `Successfully Updated .`);
                })
                .catch(err => {
                    commit('setErr', err.response.data.errors);
                    smsError(commit, "Update Error", 'Incomplete Process !!!')
                }).finally(() => {
                    Loader(commit, false)
                })

        },

        //==================================================================================
        // Delete Food 
        //==================================================================================

        deleteFood: ({ commit, dispatch }, payload) => {
            // console.log(payload);
            Loader(commit, true)

            axios.post(`http://localhost:8000/api/food/delete/${payload}`)
                .then((res) => {

                    smsInform(commit, `${res.data.food.name}`, 'Successfully Deleted');
                    dispatch('GetSpecific_All', 'All')
                }).catch(err => {
                    smsError(commit, 'Delete', err)
                })
                .finally(() => {
                    Loader(commit, false)
                })

        },

        //==================================================================================
        //==================================================================================
        // Categories
        //==================================================================================
        //==================================================================================


        addCategory: ({ commit, dispatch }, payload) => {

            Loader(commit, true)

            axios.post(`http://localhost:8000/api/category/create`, payload)
                .then((res) => {
                    dispatch('getCategories');
                    commit('clearCategoryErr');
                    smsSuccess(commit, res.data.category.name, 'has been successfully created')
                }).catch((err) => {

                    commit('setCategoryErr', err.response.data.errors);
                    smsError(commit, 'Category', err.response.data.errors.name)
                }).finally(() => {
                    Loader(commit, false)
                })

        },


        deleteCategory: ({ commit, dispatch }, payload) => {
            Loader(commit, true)

            axios.post(`http://localhost:8000/api/category/delete/${payload}`)
                .then(res => {
                    dispatch('getCategories');
                    smsSuccess(commit, res.data.category.name, 'has been successfully deleted');

                }).catch(err => {
                    smsError(commit, 'Category', err.response.data.errors.name)

                }).finally(() => {
                    Loader(commit, false)
                })
        },

        //==================================================================================
        //==================================================================================
        // TAGS 
        //==================================================================================
        //==================================================================================

        addTag: ({ commit, dispatch }, payload) => {
            Loader(commit, true);

            axios.post(`http://localhost:8000/api/tag/add`, payload)
                .then((res) => {
                    dispatch('getTags');
                    commit('clearTagErr');
                    smsSuccess(commit, res.data.tag.name);

                }).catch(err => {

                    commit('setTagErr', err.response.data.errors)
                    smsError(commit, err.response.data.errors.name)
                }).finally(() => {
                    Loader(commit, false)
                })

        },

        deleteTag: ({ commit, dispatch }, payload) => {
            Loader(commit, true);
            // console.log(payload);


            axios.post(`http://localhost:8000/api/tag/delete/${payload}`,)
                .then(res => {
                    smsSuccess(commit, res.data.tag.name, 'has been successfully deleted');
                    dispatch('getTags');
                })
                .catch(err => {
                    console.log(err.response.data.errors);
                    smsError(commit, err.response.data.errors.name)
                }).finally(() => {
                    Loader(commit, false)
                })


        }





    }

}
export default FoodModule;