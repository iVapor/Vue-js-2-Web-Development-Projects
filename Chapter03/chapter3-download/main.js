new Vue({
    name: 'game',
    el: '#app',
    data: state,
    mounted() {
        log(this.$data === state)
    },
    computed: {
        testCard() {
            return cards.archers
        }
    },
    methods: {
        handlePlay() {
            console.log('You played a card!')
        },
    },

    template: `<div id="#app">
        <top-bar :turn="turn" :current-player-index="currentPlayerIndex" 
            :players="players"/>
        <card :def="testCard"   v-on:play="handlePlay" />
    </div>`,
})

window.addEventListener('resize', () => {
    state.worldRatio = getWorldRatio()
})