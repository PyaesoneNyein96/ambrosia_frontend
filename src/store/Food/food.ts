
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

            adminFoodList: '',
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

        getAdminFoodList: state => state.adminFoodList, //admin food list 

        getSpecific: state => state.specFood,

        getFoodErr: state => state.errors,

        getCategoryErr: state => state.categoryErr,

        getTagErr: state => state.tagErr,

    },

    mutations: {
        setCategories: (state, payload) => state.categories = payload,

        setTags: (state, payload) => state.tags = payload,

        setFoodList: (state, payload) => state.foodList = payload, // user menu

        setAdminFoodList: (state, payload) => state.adminFoodList = payload, // admin food list set 

        setSpecificFood: (state, payload) => state.specFood = payload, // admin Edit item set

        setErr: (state, payload) => state.errors = payload, // Food add or update

        setCategoryErr: (state, payload) => state.categoryErr = payload, //category err

        setTagErr: (state, payload) => state.tagErr = payload, // tag err



    },



    actions: {
        //==================================================================================
        //Get Categories
        //==================================================================================

        getCategories: ({ commit }) => {
            axios.get('http://localhost:8000/api/user/categoriesList')
                .then((res) => {
                    commit('setCategories', res.data);

                }).catch((err) => {
                    // console.log(err);
                    smsError(commit, err.response.data.errors)
                })
        },

        // .................................................................................


        //==================================================================================
        // Get Tags
        //==================================================================================

        getTags: ({ commit }) => {
            axios.get('http://localhost:8000/api/user/tagsList')
                .then((res) => {
                    commit('setTags', res.data);

                }).catch((err) => {
                    // console.log(err);
                    smsError(commit, err.response.data.errors)

                })
        },
        // .................................................................................


        //==================================================================================
        // ALL OR SPECIFIC FOOD by Category
        //==================================================================================

        GetSpecific_All: ({ commit }, payload) => {
            Loader(commit, true)
            axios.get(`http://localhost:8000/api/user/menu/getSpecific/${payload}`)
                .then((res) => {
                    commit('setFoodList', res.data)
                }).catch((err) => {
                    // console.log(err);
                    smsError(commit, err.response.data.errors)

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
                    smsSuccess(commit, res.data.food.name, 'Successfully Created')
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
                    // console.log(err);
                    smsError(commit, err.response.data.errors)

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
                    dispatch('getFoodByType', 2)
                }).catch(err => {
                    smsError(commit, 'Delete', err)
                })
                .finally(() => {
                    Loader(commit, false)
                })

        },


        //==================================================================================
        // Get Food By Type 
        //==================================================================================

        getFoodByType({ commit }, payload) {
            Loader(commit, true)
            axios.get(`http://localhost:8000/api/food/type/${payload}`)
                .then(res => {
                    // console.log(res);
                    commit('setAdminFoodList', res.data)
                })
                .catch(err => {
                    // console.log(err);
                    smsError(commit, 'Type Error', err);
                })
                .finally(() => {
                    Loader(commit, false)
                })

        },


        // .................................................................................


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
                    commit('setCategoryErr', '');
                    smsSuccess(commit, res.data.category.name, 'has been successfully created')
                }).catch((err) => {

                    commit('setCategoryErr', err.response.data.errors);
                    smsError(commit, 'Category', err.response.data.errors.name)
                }).finally(() => {
                    Loader(commit, false)
                })

        },

        //==================================================================================
        // Delete Category
        //==================================================================================
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
        //Update Category
        //==================================================================================

        updateCategory: ({ commit, dispatch }, payload) => {
            Loader(commit, true)


            axios.post('http://localhost:8000/api/category/update', payload)
                .then(res => {
                    dispatch('getCategories');
                    smsSuccess(commit, res.data.category.name, 'Successfully Updated')
                    commit('setCategoryErr', '')
                })
                .catch(err => {
                    smsError(commit, 'Category Update Error', err.response.data.errors.name)
                    console.log(err);
                })
                .finally(() => {
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
                    // commit('setTagErr', '');
                    smsSuccess(commit, res.data.tag.name);

                }).catch(err => {

                    commit('setTagErr', err.response.data.errors)
                    smsError(commit, err.response.data.errors.name)
                }).finally(() => {
                    Loader(commit, false)
                })

        },


        //==================================================================================
        // Delete Tag
        //==================================================================================

        deleteTag: ({ commit, dispatch }, payload) => {
            Loader(commit, true);
            // console.log(payload);


            axios.post(`http://localhost:8000/api/tag/delete/${payload}`,)
                .then(res => {
                    smsSuccess(commit, res.data.tag.name, 'has been successfully deleted');
                    dispatch('getTags');
                })
                .catch(err => {
                    // console.log(err.response.data.errors);
                    smsError(commit, err.response.data.errors.name)
                }).finally(() => {
                    Loader(commit, false)
                })
        },

        //==================================================================================
        // Update Tag
        //==================================================================================
        updateTag: ({ commit, dispatch }, payload) => {
            Loader(commit, true)


            axios.post(`http://localhost:8000/api/tag/edit`, payload)
                .then(res => {
                    smsSuccess(commit, res.data.tag.name, `has been successfully Changed`);
                    dispatch('getTags');
                }).catch(err => {
                    smsError(commit, err.response.data.errors.name)
                    console.log(err);

                }).finally(() => {
                    Loader(commit, false)
                })
        },


        //==================================================================================
        // Search By Admin
        //==================================================================================
        searchByAdmin: ({ commit }, payload) => {
            Loader(commit, true)

            axios.post('http://localhost:8000/api/search', payload)
                .then(res => {
                    commit('setAdminFoodList', res.data.result);
                })
                .catch(err => {
                    console.log(err);
                    smsError(commit, 'GENERAL ERROR', err)
                })
                .finally(() => {
                    Loader(commit, false)
                })

        }





    }

}
export default FoodModule;