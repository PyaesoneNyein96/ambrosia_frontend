
import axios from 'axios'
import router from '../../router'
import { Loader } from '../ToolStore/loader.js'
import { smsError, smsSuccess, smsLogOut } from '../Notify/notify.js'
import { baseUrl, imageUrl } from './../../components/Tools-axios/baseURL';



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


            axios.post(`${baseUrl}/user/login`, payload)

                .then((res) => {
                    if (res.data.userInfo.image !== null) {
                        res.data.userInfo.image = `${imageUrl}/storage/profile/` + res.data.userInfo.image;
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

                    smsError(commit, "Login Error", err.response.data.message)
                }).finally(() => {

                    Loader(commit, false)

                })
        },




        //REGISTER ================================================================================================
        register: ({ commit, getters }, payload) => {

            axios.post(`${baseUrl}/user/register`, payload)
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
                smsError(commit, error)

            }


            Loader(commit, false)


        }
        ,

        // AUTO LOG IN ================================================================================================
        autoLogin: ({ commit }) => {

            const userCredentials = localStorage.getItem('userCredentials');

            axios.post(`${baseUrl}/user/autoLogin`, { 'token': userCredentials })
                .then((res) => {
                    if (res.data.userInfo.image !== null) {
                        res.data.userInfo.image = `${imageUrl}/storage/profile/` + res.data.userInfo.image;
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

            axios.post(`${baseUrl}/user/profile/update`, payload)
                .then(res => {

                    if (res.data.userInfo.image !== null) {
                        res.data.userInfo.image = `${imageUrl}/storage/profile/` + res.data.userInfo.image;
                    }
                    console.log(res.data.userInfo.image);


                    commit('setUserData', res.data)
                    commit('setProfileErr', '')

                    smsSuccess(commit, 'Profile Update', "Profile  Successfully Updated. ")
                }).catch(err => {
                    smsError(commit, 'Profile Update Error', err.response.data.message)
                    smsError(commit, err.response.data.message)

                    // if (Array.isArray(err.response.data.errors)) {
                    commit('setProfileErr', err.response.data.errors)
                    // }

                })
        },

        // Password Change ========================================================================================

        passwordUpdate: ({ commit, dispatch }, payload) => {

            Loader(commit, true)

            axios.post(`${baseUrl}/user/password/change`, payload)
                .then(res => {
                    if (res.data == 200) {
                        dispatch('logout')
                            .then(() => {
                                smsSuccess(commit, "Password Changed", 'Your Password is Successfully Changed, please Login Again');
                            })
                    } else if (res.data == 401) {
                        smsError(commit, "Old Password", 'Your Old password is incorrect!')
                    }
                })
                .catch(err => {
                    smsError(commit, 'Err', err.response.data.message)
                })
                .finally(() => {
                    Loader(commit, false)
                })
        }


    }

}



export default AuthModule;