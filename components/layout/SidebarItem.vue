<template>
    <div v-if="!item.hidden&&item.children" class="menu-wrapper">
        <router-link v-if="hasOneShowingChild(item.children) && !onlyOneChild.children && !item.alwaysShow"
                     :to="resolvePath(onlyOneChild.path)">
            <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
                <font-awesome-icon v-if="onlyOneChild.meta&&onlyOneChild.meta.icon" :icon="onlyOneChild.meta.icon"></font-awesome-icon>
                <span v-if="onlyOneChild.meta&&onlyOneChild.meta.title" slot="title">{{translateTitle(onlyOneChild.meta.title)}}</span>
            </el-menu-item>
        </router-link>

        <el-submenu v-else :index="item.name||item.path">
            <template slot="title">
                <font-awesome-icon v-if="item.meta && item.meta.icon" :icon="item.meta.icon"></font-awesome-icon>
                <span v-if="item.meta&&item.meta.title" slot="title">{{translateTitle(item.meta.title)}}</span>
            </template>

            <template v-for="child in item.children" v-if="!child.hidden">
                <sidebar-item :is-nest="true" class="nest-menu" v-if="child.children&&child.children.length>0"
                              :item="child" :key="child.path" :base-path="resolvePath(child.path)"></sidebar-item>
                <router-link v-else :to="resolvePath(child.path)" :key="child.name">
                    <el-menu-item :index="resolvePath(child.path)">
                        <font-awesome-icon v-if="child.meta && child.meta.icon" :icon="child.meta.icon"></font-awesome-icon>
                        <span v-if="child.meta&&child.meta.title" slot="title">{{translateTitle(child.meta.title)}}</span>
                    </el-menu-item>
                </router-link>
            </template>
        </el-submenu>

    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import path from 'path'
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

    export default Vue.extend({
        name: 'SidebarItem',
        components: {FontAwesomeIcon},
        props: {
            // route object
            item: {
                type: Object,
                required: true
            },
            isNest: {
                type: Boolean,
                default: false
            },
            basePath: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                onlyOneChild: null
            }
        },
        methods: {
            hasOneShowingChild(children: any) {
                const showingChildren = children.filter((item: any) => {
                    if (item.hidden) {
                        return false
                    } else {
                        // temp set(will be used if only has one showing child )
                        this.onlyOneChild = item
                        return true
                    }
                })
                if (showingChildren.length === 1) {
                    return true
                }
                return false
            },
            resolvePath(...paths: any[]) {
                return path.resolve(this.basePath, ...paths)
            },
            translateTitle(title: string) {
                return this.$t('route.' + title)
            }
        }
    })
</script>

<style lang="scss" scoped>
    .svg-inline--fa {
        margin-right: 0.8rem;
    }
</style>