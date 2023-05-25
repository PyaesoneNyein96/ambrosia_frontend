

const Notify = {
    namespace: true,
    state() {
        return {
            AlertNotify: [false, '', ''],

            loading: false,
        }
    },
    getters: {
        getAlertNofiry: state => state.AlertNotify

    },
    mutations: {
        setNotification: (state, payload) => {
            state.AlertNotify = [true, payload.sms, payload.type]
        },

        // LOADING

        setLoading: (state, payload) => state.loading = payload
    },

}

export default Notify 