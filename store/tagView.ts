import Vue from 'vue'
import Vuex, {ActionContext, ActionTree, GetterTree, MutationTree} from 'vuex'

Vue.use(Vuex)

export interface TagView {
    path?: string
    title?: string
    noCache?: boolean
    name?: string
    meta?: any
}

export class State {
    public cachedViews: TagView[] = []
    public visitedViews: TagView[] = []
}

const getters = <GetterTree<State, any>> {
    // count(state: State): number {
    //     return state.count
    // }
}

const mutations = <MutationTree<State>> {
    ADD_VISITED_VIEWS(state: State, view: TagView) {
        if (state.visitedViews.some((v) => v.path === view.path)) {
            return
        }
        state.visitedViews.push(Object.assign({}, view, {
            title: view.title || 'noName'
        }))
        if (!view.noCache) {
            state.cachedViews.push({name: view.name})
        }
    },
    DEL_VISITED_VIEWS(state: State, view: TagView) {
        state.visitedViews.forEach(((v, i) => {
            if (v.path === view.path) {
                state.visitedViews.splice(i, 1)
            }
        }))
        for (const i of state.cachedViews) {
            if (i.name === view.name) {
                const index = state.cachedViews.indexOf(i)
                state.cachedViews.splice(index, 1)
                break
            }
        }
    },
    DEL_OTHERS_VIEWS(state: State, view: TagView) {
        state.visitedViews.forEach(((v, i) => {
            if (v.path === view.path) {
                state.visitedViews = state.visitedViews.slice(i, i + 1)
            }
        }))
        for (const i of state.cachedViews) {
            if (i.name === view.name) {
                const index = state.cachedViews.indexOf(i)
                state.cachedViews = state.cachedViews.slice(index, index + 1)
                break
            }
        }
    },
    DEL_ALL_VIEWS(state: State) {
        state.visitedViews = []
        state.cachedViews = []
    }
}

const actions = <ActionTree<State, any>> {
    AddVisitedViews(store: ActionContext<State, any>, view: TagView) {
        store.commit('ADD_VISITED_VIEWS', view)
    },
    DelVisitedViews(store: ActionContext<State, any>, view: TagView) {
        return new Promise((resolve) => {
            store.commit('DEL_VISITED_VIEWS', view)
            resolve([...store.state.visitedViews])
        })
    },
    DelOthersViews(store: ActionContext<State, any>, view: TagView) {
        return new Promise((resolve) => {
            store.commit('DEL_OTHERS_VIEWS', view)
            resolve([...store.state.visitedViews])
        })
    },
    DelAllViews(store: ActionContext<State, any>, view: TagView) {
        return new Promise((resolve) => {
            store.commit('DEL_ALL_VIEWS')
            resolve([...store.state.visitedViews])
        })
    }
}

const tagView = {
    state: new State(),
    getters,
    mutations,
    actions
}

export default tagView