
const smsError = (commit, title = 'Error', sms = 'Something wrong!!!') => {
    return commit('notify/setNotification', { title: title, sms: sms, type: 'error' }, { root: true })
}

const smsSuccess = (commit, title = 'Success', sms = 'Successfully completed.') => {
    return commit('notify/setNotification', { title: title, sms: sms, type: 'success' }, { root: true })
}

const smsLogOut = (commit, title = 'It was a pleasure serving you.', sms = 'We hope to see you again soon.') => {
    return commit('notify/setNotification', { title: title, sms: sms, type: 'logout' }, { root: true })
}

const smsInform = (commit, title = 'Information', sms = "Check this out") => {
    return commit('notify/setNotification', { title: title, sms: sms, type: 'inform' }, { root: true })
}

const smsQuestion = (commit, title = 'Are you sure !!', sms = 'If u sure, hit YES button') => {
    return commit('notify/setNotification', { title: title, sms: sms, type: 'question' }, { root: true })
}

const cartSuccess = (commit, title = 'Cart.', sms = 'Successfully added to your Cart.') => {
    return commit('notify/setNotification', { title: title, sms: sms, type: 'cartSuccess' }, { root: true })
}

const orderSuccess = (commit, title = 'Order', sms = 'Your Order is successfully Done.') => {
    return commit('notify/setNotification', { title: title, sms: sms, type: 'OrderSuccess' }, { root: true })
}


export { smsError, smsSuccess, smsLogOut, smsInform, smsQuestion, cartSuccess, orderSuccess }