
import axios from 'axios'
import router from '../../router'
import { Loader } from '../ToolStore/loader.js'
import { smsError, smsSuccess, smsLogOut } from '../Notify/notify.js'

const AuthModule = {
    namespaced: true,
    state() {
        return {
            userData: '',
            userToken: '',
            auth: false,
            isAdmin: '',
            profileErr: '',

        }
    },



    getters: {
        getUserData: state => state.userData,

        getUserToken: state => state.userToken,

        getAuth: state => state.auth,

        isAdmin: state => state.isAdmin,

        getAuthErr: state => state.authErr,

        getProfileErr: state => state.profileErr,





    },




    mutations: {
        setToken: (state, payload) => state.userToken = payload,

        setAuth: (state, payload) => state.auth = payload,

        setUserData(state, payload) {
            state.userData = payload.userInfo,
                state.userToken = payload.userToken,
                state.auth = payload.auth,
                state.isAdmin = payload.userInfo ? payload.userInfo.role : 0
        },

        setProfileErr: (state, payload) => state.profileErr = payload,

    },



    actions: {

        // LOGIN ================================================================================================
        login: ({ commit, getters }, payload) => {


            Loader(commit, true)

            // console.log(payload);
            axios.post(`http://localhost:8000/api/user/login`, payload)

                .then((res) => {
                    if (res.data.userInfo.image !== null) {
                        res.data.userInfo.image = `http://localhost:8000/storage/profile/` + res.data.userInfo.image;
                    }

                    commit('setUserData', res.data);

                    const Token = getters.getUserToken;
                    if (Token) {
                        localStorage.setItem('userCredentials', getters.getUserToken);
                    }
                    smsSuccess(commit, 'Login', 'Welcome to our Ambrosia');

                    router.push({ name: 'main_dashboard' })

                })
                .catch((err) => {
                    // console.log(err.response.data);
                    smsError(commit, "Login Error", err.response.data.message)
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
                    smsSuccess(commit, "Register", 'Register Successfully Done')
                    router.push('/')



                }).catch((err) => {
                    smsError(commit, 'Register Error', err)
                })
        },


        // LOG OUT ================================================================================================ 
        logout: ({ commit }) => {

            Loader(commit, true)

            try {
                smsLogOut(commit);
                router.push({ name: 'home' })
                    .then(() => {
                        localStorage.setItem('userCredentials', '');
                        commit('setAuth', false);
                        commit('setToken', '');
                        commit('setUserData', '');
                    })

            } catch (error) {
                console.log(error);

            }


            Loader(commit, false)


        }
        ,

        // AUTO LOG IN ================================================================================================
        autoLogin: ({ commit }) => {

            const userCredentials = localStorage.getItem('userCredentials');

            axios.post(`http://localhost:8000/api/user/autoLogin`, { 'token': userCredentials })
                .then((res) => {
                    if (res.data.userInfo.image !== null) {
                        res.data.userInfo.image = `http://localhost:8000/storage/profile/` + res.data.userInfo.image;
                    }
                    commit('setUserData', res.data)

                })
                .catch((err) => {

                    localStorage.setItem('userCredentials', '')
                    router.push({ name: 'login' });
                    smsError(commit, 'Auto Login Error', `Something went wrong, Please Login again.${err}`)
                })
        },

        // User Profile Data Update ========================================================================================

        profileUpdate: ({ commit }, payload) => {
            // console.log(payload);

            axios.post('http://localhost:8000/api/user/profile/update', payload)
                .then(res => {

                    if (res.data.userInfo.image !== null) {
                        res.data.userInfo.image = `http://localhost:8000/storage/profile/` + res.data.userInfo.image;
                    }
                    commit('setUserData', res.data)
                    commit('setProfileErr', '')

                    smsSuccess(commit, 'Profile Update', "Profile  Successfully Updated. ")
                }).catch(err => {
                    smsError(commit, 'Profile Update Error', err.response.data.message)
                    console.log(err.response);

                    // if (Array.isArray(err.response.data.errors)) {
                    commit('setProfileErr', err.response.data.errors)
                    // }

                })
        }



    }

}



export default AuthModule;