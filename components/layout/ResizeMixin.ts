import Vue from 'vue'

const {body} = document
const WIDTH = 1024
const RATIO = 3

export default Vue.extend({
    watch: {
        $route(route) {
            if (this.$store.getters.device === 'mobile' && this.$store.getters.sidebar.opened) {
                this.$store.dispatch('CloseSidebar')
            }
        }
    },
    beforeMount() {
        window.addEventListener('resize', this.resizeHandler)
    },
    mounted() {
        const isMobile = this.isMobile()
        if (isMobile) {
            this.$store.dispatch('ToggleDevice', 'mobile')
            this.$store.dispatch('CloseSidebar')
        }
    },
    methods: {
        isMobile() {
            const rect = body.getBoundingClientRect()
            return rect.width - RATIO < WIDTH
        },
        resizeHandler() {
            if (!document.hidden) {
                const isMobile = this.isMobile()
                this.$store.dispatch('ToggleDevice', isMobile ? 'mobile' : 'desktop')

                if (isMobile) {
                    this.$store.dispatch('CloseSidebar')
                }
            }
        }
    }
})
