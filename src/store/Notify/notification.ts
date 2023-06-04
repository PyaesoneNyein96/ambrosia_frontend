

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
            // 0 Trigger or condition , 1 title, 2 sms, 3 (info,err,logout,question)
        },

        // LOADING

        setLoading: (state, payload) => state.loading = payload
    },

}

export default Notify 