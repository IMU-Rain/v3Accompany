const state = {
    isCollapse: false,
    selectMenu: [],
    menuActive: '1-1'
}
const mutations = {
    collapseMenu(state) {
        state.isCollapse = !state.isCollapse
    },
    addMenu(state, payload) {
        if (state.selectMenu.findIndex(item => payload.path === item.path) === -1) {
            state.selectMenu.push(payload)
        }
    },
    closeMenu(state, index) {
        state.selectMenu.splice(index, 1)
    },
    dynamicMenu(state, payload) {
        console.log(payload);
        console.log(import.meta, "");
    },
    updateMenuActive(state, payload) {
        state.menuActive = payload
    }
}
const actions = {
    async closeMenuAction(state, params) {
        const payload = params.item
        const currentPath = params.currentPath
        const index = state.state.selectMenu.findIndex(item => item.path === payload.path)
        const delPath = state.state.selectMenu[index].path
        state.commit("closeMenu", index)
        if (currentPath === delPath) {
            if (index === 0) {
                if (state.state.selectMenu.length === 0) {
                    return "/"
                } else {
                    return state.state.selectMenu[0].path
                }
            } else {
                return state.state.selectMenu[index - 1].path
            }
        } else {
            return currentPath
        }
    }
}
export default {
    state, mutations, actions
}