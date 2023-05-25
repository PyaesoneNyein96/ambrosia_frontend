
import axios from 'axios'
import router from '../../router'

const AuthModule = {
    namespaced: true,
    state() {
        return {
            userData: '',
            userToken: '',
            auth: null,
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
                state.auth = payload.auth
        }


    },



    actions: {

        // LOGIN ================================================================================================
        login: ({ commit, getters }, payload) => {

            axios.post(`http://localhost:8000/api/user/login`, payload)
                .then((res) => {
                    commit('setUserData', res.data);

                    const Token = getters.getUserToken;
                    if (Token) {
                        localStorage.setItem('userCredentials', getters.getUserToken);
                    }

                    router.push('/')

                }).catch((err) => {
                    console.log(err)
                });
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
            localStorage.setItem('userCredentials', '');
            commit('setUserData', '')
            commit('setToken', '')
            commit('setAuth', false)
            router.push('/')

        }
        ,

        // AUTO LOG IN ================================================================================================
        autoLogin: ({ commit }) => {

            const userCredentials = localStorage.getItem('userCredentials');

            axios.post(`http://localhost:8000/api/user/autoLogin`, { 'token': userCredentials })
                .then((res) => {

                    commit('setUserData', res.data)

                }).catch((err) => {
                    console.log(err);

                })
        }



    }

}



export default AuthModule;