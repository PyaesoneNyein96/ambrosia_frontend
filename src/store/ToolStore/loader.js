
const Loader = (commit, status) => {
    return commit('tool/setLoading', status, { root: true })
}

export { Loader }