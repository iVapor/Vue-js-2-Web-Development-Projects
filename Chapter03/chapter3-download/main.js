new Vue({
    name: 'game',
    el: '#app',
    data: state,
    mounted() {
        log(this.$data === state)
    },
    template: `<div id="#app">
        <top-bar :turn="turn" :current-player-index="currentPlayerIndex" 
            :players="players"/>
    </div>`,
})

window.addEventListener('resize', () => {
    state.worldRatio = getWorldRatio()
})