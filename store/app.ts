import Vue from 'vue'
import Vuex, {ActionContext, ActionTree, GetterTree, MutationTree} from 'vuex'

Vue.use(Vuex)

export interface Sidebar {
    opened: boolean
}

export class State {
    public language: string = window.localStorage.getItem('language') || 'ru'
    public device: string = 'desktop'
    public sidebar: Sidebar = {opened: true}
}

const getters = <GetterTree<State, any>> {
    language(state: State): string {
        return state.language
    },

    device(state: State): string {
      return state.device
    },

    sidebar(state: State): Sidebar {
        return state.sidebar
    }
}

const mutations = <MutationTree<State>> {
    SET_LANGUAGE(state: State, lang: string) {
        state.language = lang
    },

    TOGGLE_DEVICE(state: State, device: string) {
        state.device = device
    },

    TOGGLE_SIDEBAR(state: State) {
        state.sidebar.opened = !state.sidebar.opened
    },

    CLOSE_SIDEBAR(state: State) {
        state.sidebar.opened = false
    }
}

const actions = <ActionTree<State, any>> {
    SetLanguage(store: ActionContext<State, any>, lang: string) {
        store.commit('SET_LANGUAGE', lang)
    },

    ToggleDevice(store: ActionContext<State, any>, device: string) {
        store.commit('TOGGLE_DEVICE', device)
    },

    ToggleSidebar(store: ActionContext<State, any>) {
        store.commit('TOGGLE_SIDEBAR')
    },

    CloseSidebar(store: ActionContext<State, any>) {
        store.commit('CLOSE_SIDEBAR')
    }
}

const app = {
    state: new State(),
    getters,
    mutations,
    actions
}

export default app