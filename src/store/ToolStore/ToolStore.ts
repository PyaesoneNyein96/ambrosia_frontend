

const ToolStore = {
    namespaced: true,
    state() {
        return {
            loading: false,
            toggleNav: true,

        }
    },
    getters: {

        getLoading: (state) => state.loading,
        getToggleNav: state => state.toggleNav,


    },
    mutations: {

        // LOADING
        setLoading: (state, payload) => state.loading = payload,


        // NavHide
        toggleNav: (state, payload) => state.toggleNav = payload


    },

}

export default ToolStore 