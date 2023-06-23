

const ToolsModule = {
    namespaced: true,
    state() {
        return {
            loading: false,
            toggleNav: true,
            count: false,

        }
    },
    getters: {

        getLoading: (state) => state.loading,
        getToggleNav: state => state.toggleNav,
        getCartCount: state => state.Count,


    },
    mutations: {

        // LOADING
        setLoading: (state, payload) => state.loading = payload,


        // NavHide
        toggleNav: (state, payload) => state.toggleNav = payload,

        setCount: (state, payload) => state.count = payload,


    },

}

export default ToolsModule 