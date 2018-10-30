<template>
    <div class="app-wrapper" :class="classObj">
        <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"></div>
        <sidebar class="sidebar-container"></sidebar>
        <div class="main-container">
            <navbar></navbar>
            <tags-view></tags-view>
            <app-main></app-main>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Sidebar from './Sidebar.vue'
    import Resize from './ResizeMixin'
    import Navbar from './Navbar.vue'
    import AppMain from './AppMain.vue'
    import TagsView from './TagsView.vue'

    export default Vue.extend({
        name: 'layout',
        components: {Sidebar, Navbar, AppMain, TagsView},
        mixins: [Resize],
        computed: {
            sidebar() {
                return this.$store.state.app.sidebar
            },
            device() {
                return this.$store.state.app.device
            },
            classObj(): any {
                return {
                    hideSidebar: !this.sidebar.opened,
                    openSidebar: this.sidebar.opened,
                    mobile: this.device === 'mobile'
                }
            }
        },
        methods: {
            handleClickOutside() {
                this.$store.dispatch('CloseSidebar')
            }
        }
    })
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import "../../style/mixin.scss";
    .app-wrapper {
        @include clearfix;
        position: relative;
        height: 100%;
        width: 100%;
        &.mobile.openSidebar{
            position: fixed;
            top: 0;
        }
    }
    .drawer-bg {
        background: #000;
        opacity: 0.3;
        width: 100%;
        top: 0;
        height: 100%;
        position: absolute;
        z-index: 2001;
    }
</style>
