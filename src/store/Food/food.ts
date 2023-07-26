
import axios from 'axios'
import { Loader } from '../ToolStore/loader.js'
import router from '../../router'



import { smsSuccess, smsError, smsInform } from '../Notify/notify.js'
import { baseUrl } from './../../components/Tools-axios/baseURL';




const FoodModule = {
    namespaced: true,
    state() {
        return {
            foodList: '', //menu
            categories: '',
            tags: '',

            adminFoodList: '', //admin food list
            errors: [],
            categoryErr: '',
            tagErr: '',
            specFood: '',

            SpecialMenu: '',

            detailFood: ''
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

        getSpecialMenu: state => state.SpecialMenu,

        getDetailFood: state => state.detailFood,

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

        setSpecialMenu: (state, payload) => state.SpecialMenu = payload, // Special Menu

        setDetailFood: (state, payload) => state.detailFood = payload



    },



    actions: {
        //==================================================================================
        //Get Categories
        //==================================================================================

        getCategories: ({ commit }) => {
            axios.get(`${baseUrl}/user/categoriesList`)
                .then((res) => {
                    commit('setCategories', res.data);

                }).catch((err) => {

                    smsError(commit, err.response.data.errors)
                })
        },

        // .................................................................................


        //==================================================================================
        // Get Tags
        //==================================================================================

        getTags: ({ commit }) => {
            axios.get(`${baseUrl}/user/tagsList`)
                .then((res) => {
                    commit('setTags', res.data);

                }).catch((err) => {

                    smsError(commit, err.response.data.errors)

                })
        },
        // .................................................................................


        //==================================================================================
        // ALL OR SPECIFIC FOOD by Category
        //==================================================================================

        GetSpecific_All: ({ commit }, payload) => {
            Loader(commit, true)
            axios.get(`${baseUrl}/user/menu/getSpecific/${payload}`)
                .then((res) => {
                    commit('setFoodList', res.data)
                }).catch((err) => {

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


            axios.post(`${baseUrl}/admin/food/create`, payload)
                .then(res => {

                    smsSuccess(commit, res.data.food.name, 'Successfully Created')
                    router.push({ name: 'food_List' })
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

            axios.get(`${baseUrl}/admin/food/edit/${payload}`,)
                .then(res => {
                    commit('setSpecificFood', res.data);
                }).then(() => {
                    router.push({ name: 'food_Edit', params: { id: payload } })
                })
                .catch(err => {

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

            axios.post(`${baseUrl}/admin/food/update`, payload)
                .then(res => {
                    router.push({ name: 'food_List' });
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

            Loader(commit, true)

            axios.post(`${baseUrl}/admin/food/delete/${payload}`)
                .then((res) => {

                    smsInform(commit, `${res.data.food.name}`, 'Successfully Deleted');
                    dispatch('getFoodByType', 2) // 2 is All food
                }).catch(err => {
                    smsError(commit, 'Delete', err)
                })
                .finally(() => {
                    Loader(commit, false)
                })

        },


        //==================================================================================
        // Get Food By (Type) 
        //==================================================================================

        getFoodByType({ commit }, payload) {
            Loader(commit, true)
            axios.get(`${baseUrl}/food/type/${payload}`)
                .then(res => {

                    commit('setAdminFoodList', res.data)
                    commit('setFoodList', res.data)
                })
                .catch(err => {

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

            axios.post(`${baseUrl}/category/create`, payload)
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

            axios.post(`${baseUrl}/category/delete/${payload}`)
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


            axios.post(`${baseUrl}/category/update`, payload)
                .then(res => {
                    dispatch('getCategories');
                    smsSuccess(commit, res.data.category.name, 'Successfully Updated')
                    commit('setCategoryErr', '')
                })
                .catch(err => {
                    smsError(commit, 'Category Update Error', err.response.data.errors.name)

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

            axios.post(`${baseUrl}/tag/add`, payload)
                .then((res) => {
                    dispatch('getTags');
                    commit('setTagErr', '')
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



            axios.post(`${baseUrl}/tag/delete/${payload}`,)
                .then(res => {
                    smsSuccess(commit, res.data.tag.name, 'has been successfully deleted');
                    dispatch('getTags');
                })
                .catch(err => {

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


            axios.post(`${baseUrl}/tag/edit`, payload)
                .then(res => {
                    commit('setTagErr', '')
                    smsSuccess(commit, res.data.tag.name, `has been successfully Changed`);
                    dispatch('getTags');
                }).catch(err => {
                    smsError(commit, err.response.data.errors.name)
                    commit('setTagErr', err.response.data.errors)

                }).finally(() => {
                    Loader(commit, false)
                })
        },


        //==================================================================================
        // Search By Admin
        //==================================================================================
        searchByAdmin: ({ commit }, payload) => {
            Loader(commit, true)

            axios.post(`${baseUrl}/search/food`, payload)
                .then(res => {
                    commit('setAdminFoodList', res.data.result);
                })
                .catch(err => {
                    console.log(err.response.data.message);

                    smsError(commit, 'GENERAL ERROR', err)
                })
                .finally(() => {
                    Loader(commit, false)
                })

        },

        //==================================================================================
        // Special Menu For user (Special Menu)
        //==================================================================================

        specialMenu: ({ commit }) => {
            Loader(commit, true)

            axios.get(`${baseUrl}/user/special/menu`)
                .then(res => {
                    commit('setSpecialMenu', res.data)
                })
                .catch(err => {
                    smsError(commit, "Internal Server Error", err)
                })
                .finally(() => {
                    Loader(commit, false)
                })
        },

        //==================================================================================
        // FOOD DETAIL (USER)
        //==================================================================================

        detailFood: ({ commit, getters }, payload) => {
            Loader(commit, false)
            try {
                const foodList = getters['getFoodList'];

                const detail = foodList.find(i => {
                    return i.id == payload
                });

                commit('setDetailFood', detail)
                router.push({ name: 'detail', params: { id: payload } })
            } catch (error) {
                smsError(commit, 'Food Error', error)
            }
            finally {
                Loader(commit, false)
            }


        }












    }

}
export default FoodModule;