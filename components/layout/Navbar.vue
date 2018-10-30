<template lang="pug">
    .navbar.pr3
        div
            hamburger.hamburger-container(:toggleClick="toggleSideBar" :isActive="sidebar.opened")
        div
            lang-select
            el-button(class="exit-button" type="danger" :loading="isLogoutProcess" @click="logout") {{ $t('logout') }}
</template>

<script lang="ts">
    import Vue from 'vue'
    import Hamburger from '../../components/Hamburger.vue'
    import LangSelect from '../../components/LangSelect.vue'
    import store from '../../store/index'
    import eventBus from '../../utils/event_bus'

    export default Vue.extend({
        name: 'Navbar',
        components: {Hamburger, LangSelect},
        data() {
            return {
                isLogoutProcess: false
            }
        },
        computed: {
            sidebar() {
                return store.state.app.sidebar
            },
        },
        methods: {
            toggleSideBar() {
                this.$store.dispatch('ToggleSidebar')
            },
            logout() {
                this.isLogoutProcess = true
                this.$store.dispatch('Logout').then(() => {
                    this.isLogoutProcess = false
                    this.$router.push('/login')
                }).catch((error) => {
                    this.isLogoutProcess = false
                    eventBus.$emit('app_error', error)
                })
            }
        }
    })
</script>

<style lang="scss" scoped>
    .navbar {
        border-bottom: solid 0.5px #e6e6e6;
        height: 50px;
        line-height: 50px;
        border-radius: 0 !important;
        display: flex;
        justify-content: space-between;

        .hamburger-container {
            /*line-height: 58px;*/
            /*height: 50px;*/
            padding: 0 1rem;
        }
    }

    .exit-button {
        padding: 0.5rem;
        margin-left: 0.8rem;
    }
</style>