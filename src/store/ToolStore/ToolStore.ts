

const ToolsModule = {
    namespaced: true,
    state() {
        return {
            loading: false,
            toggleNav: true,
            count: false,

            reservationPath: false

        }
    },
    getters: {

        getLoading: (state) => state.loading,
        getToggleNav: state => state.toggleNav,
        getCartCount: state => state.Count,

        getReservationPath: state => state.reservationPath


    },
    mutations: {

        // LOADING
        setLoading: (state, payload) => state.loading = payload,


        // NavHide
        toggleNav: (state, payload) => state.toggleNav = payload,

        setCount: (state, payload) => state.count = payload,

        setReservationPath: (state, payload) => state.reservationPath = payload


    },

}

export default ToolsModule 