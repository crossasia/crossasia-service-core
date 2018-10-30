<template>
    <el-scrollbar wrapClass="scrollbar-wrapper">
        <el-menu
                mode="vertical"
                :show-timeout="200"
                :default-active="$route.path"
                :collapse="isCollapse"
                background-color="#304156"
                text-color="#bfcbd9"
                active-text-color="#409EFF"
        >
            <sidebar-item v-for="route in routers" :key="route.name" :item="route" :base-path="route.path"></sidebar-item>
        </el-menu>
    </el-scrollbar>
</template>

<script lang="ts">
    import Vue from 'vue'
    import SidebarItem from './SidebarItem.vue'
    import {Sidebar} from '../../store/app'

    export default Vue.extend({
        props: ['allowedRoutes'],
        name: 'Sidebar',
        components: { SidebarItem },
        computed: {
            sidebar(): Sidebar {
                return this.$store.getters.sidebar
            },
            routers(): any[] {
                return this.allowedRoutes
            },
            isCollapse(): boolean {
                return !this.sidebar.opened
            }
        }
    })
</script>
