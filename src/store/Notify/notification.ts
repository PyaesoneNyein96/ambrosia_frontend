

const Notify = {
    namespaced: true,
    state() {
        return {
            AlertNotify: [false, '', '', ''],

            loading: false,
        }
    },
    getters: {
        getAlertNotify: state => state.AlertNotify

    },
    mutations: {
        //Notification SMS 

        setNotification: (state, payload) => {
            state.AlertNotify = [true, payload.title, payload.sms, payload.type]
        },

        // LOADING

        setLoading: (state, payload) => state.loading = payload
    },

}

export default Notify 