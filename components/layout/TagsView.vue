<template>
    <div class="tags-view-container">
        <scroll-pane class='tags-view-wrapper' ref='scrollPane'>
            <router-link ref='tag' class="tags-view-item" :class="isActive(tag)?'active':''"
                         v-for="tag in Array.from(visitedViews)"
                         :to="tag" :key="tag.path" @contextmenu.prevent.native="openMenu(tag,$event)">
                {{ translateTitle(tag.meta.title) }} {{ tag.meta.dynamic }}
                <span class='el-icon-close' @click.prevent.stop='closeSelectedTag(tag)'></span>
            </router-link>
        </scroll-pane>
        <ul class='contextmenu' v-show="visible" :style="{left:left+'px',top:top+'px'}">
            <li @click="closeSelectedTag(selectedTag)">{{$t('tagsView.close')}}</li>
            <li @click="closeOthersTags">{{$t('tagsView.closeOthers')}}</li>
            <li @click="closeAllTags">{{$t('tagsView.closeAll')}}</li>
        </ul>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import ScrollPane from './ScrollPane'
    import {TagView} from '../../store/tagView'

    export default Vue.extend({
        components: {ScrollPane},
        data() {
            return {
                visible: false,
                top: 0,
                left: 0,
                selectedTag: {}
            }
        },
        computed: {
            visitedViews(): any {
                return this.$store.state.tagView.visitedViews
            }
        },
        watch: {
            $route() {
                this.addViewTags()
                this.moveToCurrentTag()
            },
            visible(value) {
                if (value) {
                    document.body.addEventListener('click', this.closeMenu)
                } else {
                    document.body.removeEventListener('click', this.closeMenu)
                }
            }
        },
        mounted() {
            this.addViewTags()
        },
        methods: {
            generateTagView(): TagView | null {
                if (this.$route.name) {
                    const view = {
                        name: this.$route.name,
                        title: this.$route.meta.title,
                        noCache: this.$route.meta.noCache,
                        path: this.$route.path,
                        meta: Object.assign({}, this.$route.meta)
                    } as TagView
                    return view
                }
                return null
            },
            isActive(route: any) {
                return route.path === this.$route.path
            },
            addViewTags() {
                const view = this.generateTagView()
                if (!view) {
                    return false
                }
                this.$store.dispatch('AddVisitedViews', view)
            },
            moveToCurrentTag() {
                const tags = this.$refs.tag as any[]
                this.$nextTick(() => {
                    for (const tag of tags) {
                        if (tag.to.path === this.$route.path) {
                            (this.$refs.scrollPane as any).moveToTarget(tag.$el)
                            break
                        }
                    }
                })
            },
            closeSelectedTag(view: any) {
                this.$store.dispatch('DelVisitedViews', view).then((views) => {
                    if (this.isActive(view)) {
                        const latestView = views.slice(-1)[0]
                        if (latestView) {
                            this.$router.push(latestView)
                        } else {
                            this.$router.push('/')
                        }
                    }
                })
            },
            closeOthersTags() {
                this.$router.push(this.selectedTag)
                this.$store.dispatch('DelOthersViews', this.selectedTag).then(() => {
                    this.moveToCurrentTag()
                })
            },
            closeAllTags() {
                this.$store.dispatch('DelAllViews')
                this.$router.push('/')
            },
            openMenu(tag: any, e: any) {
                this.visible = true
                this.selectedTag = tag
                const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
                this.left = e.clientX - offsetLeft + 15 // 15: margin right
                this.top = e.clientY
            },
            closeMenu() {
                this.visible = false
            },
            translateTitle(title: string) {
                return this.$t('route.' + title)
            }
        }
    })
</script>

<style lang="scss" scoped>
    .tags-view-container {
        .tags-view-wrapper {
            background: #fff;
            height: 34px;
            border-bottom: 1px solid #d8dce5;
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
            .tags-view-item {
                display: inline-block;
                position: relative;
                height: 26px;
                line-height: 26px;
                border: 1px solid #d8dce5;
                color: #495060;
                background: #fff;
                padding: 0 8px;
                font-size: 12px;
                margin-left: 5px;
                margin-top: 4px;
                &:first-of-type {
                    margin-left: 15px;
                }
                &.active {
                    background-color: #42b983;
                    color: #fff;
                    border-color: #42b983;
                    &::before {
                        content: '';
                        background: #fff;
                        display: inline-block;
                        width: 8px;
                        height: 8px;
                        border-radius: 50%;
                        position: relative;
                        margin-right: 2px;
                    }
                }
            }
        }
        .contextmenu {
            margin: 0;
            background: #fff;
            z-index: 100;
            position: absolute;
            list-style-type: none;
            padding: 5px 0;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 400;
            color: #333;
            box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
            li {
                margin: 0;
                padding: 7px 16px;
                cursor: pointer;
                &:hover {
                    background: #eee;
                }
            }
        }
    }
</style>

<style rel="stylesheet/scss" lang="scss">
    //reset element css of el-icon-close
    .tags-view-wrapper {
        .tags-view-item {
            .el-icon-close {
                width: 16px;
                height: 16px;
                vertical-align: 2px;
                border-radius: 50%;
                text-align: center;
                transition: all .3s cubic-bezier(.645, .045, .355, 1);
                transform-origin: 100% 50%;
                &:before {
                    transform: scale(.6);
                    display: inline-block;
                    vertical-align: -3px;
                }
                &:hover {
                    background-color: #b4bccc;
                    color: #fff;
                }
            }
        }
    }
</style>
