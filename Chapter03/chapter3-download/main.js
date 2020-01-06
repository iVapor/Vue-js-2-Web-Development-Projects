new Vue({
    name: 'game',
    el: '#app',
    data: state,
    mounted() {
        log(this.$data === state)
    },
    template: `<div id="#app">
    {{ worldRatio }}
</div>`,
})

window.addEventListener('resize', () => {
    state.worldRatio = getWorldRatio()
})