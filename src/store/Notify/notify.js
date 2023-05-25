
const smsError = (commit, sms = 'Something wrong!!!') => {
    return commit('notify/setNotification', { sms: sms, type: 'err' }, { root: true })
}

const smsSuccess = (commit, sms = 'Successfully completed.') => {
    return commit('notify/setNotification', { sms: sms, type: 'success' }, { root: true })
}

const smsLogOut = (commit, sms = 'Your you are logged out') => {
    return commit('notify/setNotification', { sms: sms, type: 'logout' }, { root: true })
}

const smsInform = (commit, sms = "Check this out") => {
    return commit('notify/setNotification', { sms: sms, type: 'inform' }, { root: true })
}

export { smsError, smsSuccess, smsLogOut, smsInform }