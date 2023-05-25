
import axios from 'axios'
import router from '../../router'
import { Loader } from '../ToolStore/loader.js'

const AuthModule = {
    namespaced: true,
    state() {
        return {
            userData: '',
            userToken: '',
            auth: false,
            isAdmin: false,
        }
    },



    getters: {
        getUserData: state => state.userData,

        getUserToken: state => state.userToken,

        getAuth: state => state.auth,

        isAdmin: state => state.isAdmin,



    },




    mutations: {
        setToken: (state, payload) => state.userToken = payload,

        setAuth: (state, payload) => state.auth = payload,

        setUserData(state, payload) {
            state.userData = payload.userInfo,
                state.userToken = payload.userToken,
                state.auth = payload.auth,
                state.isAdmin = payload.userInfo ? payload.userInfo.role : false
        }


    },



    actions: {

        // LOGIN ================================================================================================
        login: ({ commit, getters }, payload) => {


            Loader(commit, true)

            axios.post(`http://localhost:8000/api/user/login`, payload)
                .then((res) => {
                    commit('setUserData', res.data);

                    const Token = getters.getUserToken;
                    if (Token) {
                        localStorage.setItem('userCredentials', getters.getUserToken);
                    }

                    router.push('/')
                })
                .catch((err) => {
                    console.log(err)
                }).finally(() => {

                    Loader(commit, false)

                })
        },




        //REGISTER ================================================================================================
        register: ({ commit, getters }, payload) => {

            axios.post(`http://localhost:8000/api/user/register`, payload)
                .then((res) => {

                    commit('setUserData', res.data)

                    const Token = getters.getUserToken;
                    if (Token) {
                        localStorage.setItem('userCredentials', getters.getUserToken);
                    }

                    router.push('/')

                }).catch((err) => {
                    console.log(err);
                })
        },


        // LOG OUT ================================================================================================ 
        logout: ({ commit }) => {

            Loader(commit, true)

            localStorage.setItem('userCredentials', '');
            commit('setUserData', '');
            commit('setToken', '');
            commit('setAuth', false);

            Loader(commit, false)
            // router.push({ name: 'login' })


        }
        ,

        // AUTO LOG IN ================================================================================================
        autoLogin: ({ commit }) => {

            const userCredentials = localStorage.getItem('userCredentials');

            axios.post(`http://localhost:8000/api/user/autoLogin`, { 'token': userCredentials })
                .then((res) => {

                    commit('setUserData', res.data)

                })
                .catch((err) => {
                    console.log(err);


                })
        }



    }

}



export default AuthModule;