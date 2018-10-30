<template>
    <section class="app-main">
        <transition name="fade-transform" mode="out-in">
            <keep-alive :include="cachedViews">
                <router-view :key="key"></router-view>
            </keep-alive>
        </transition>
    </section>
</template>

<script lang="ts">
    import Vue from 'vue'
    import {TagView} from '../../store/tagView'

    export default Vue.extend({
        name: 'AppMain',

        computed: {
            cachedViews(): TagView[] {
                return this.$store.state.tagView.cachedViews
            },
            key(): string {
                return this.$route.fullPath
            }
        }
    })
</script>

<style scoped>
    .app-main {
        /*84 = navbar + tags-view = 50 +34 */
        min-height: calc(100vh - 84px);
        position: relative;
        overflow: hidden;
    }
</style>

