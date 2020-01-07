new Vue({
    name: 'game',
    el: '#app',
    data: state,
    mounted() {
    },
    computed: {
        testCard() {
            return cards.archers
        }
    },
    created() {
        this.testHand = this.createTestHand()
        log('this.testHand', this.testHand)
    },
    methods: {
        handlePlay() {
            console.log('You played a card!')
        },
        createTestHand() {
            const cards = []
            // 遍历获取卡牌的 id
            const ids = Object.keys(cards)

            // 抽取 5 张卡牌
            for (let i = 0; i < 5; i++) {
                cards.push(this.testDrawCard())
            }

            return cards
        },
        testDrawCard() {     // 使用 id 随机选取一张卡牌
            const ids = Object.keys(cards)
            const randomId = ids[Math.floor(Math.random() * ids.length)]      // 返回一张新的卡牌
            return {
                // 卡牌的唯一标识符
                uid: cardUid++,
                // 定义的 id
                id: randomId,
                // 定义对象
                def: cards[randomId],
            }
        },
        testPlayCard(card) {
            // 将卡牌从玩家手牌中移除即可
            log('card', card)
            const index = this.testHand.indexOf(card)
            this.testHand.splice(index, 1)
        }
    },

    template: `<div id="#app">
        <top-bar :turn="turn" :current-player-index="currentPlayerIndex" 
            :players="players"/>
            
        <div class="world">
            <castle v-for="(player, index) in players" :player="player" :index="index" />
          <div class="land" />
          <div class="clouds">
            <cloud v-for="index in 10" :type="(index - 1) % 5 + 1" />
          </div>
        </div>
    
        <transition  name="hand">   
            <hand v-if="!activeOverlay"  :cards="testHand"  @card-play="testPlayCard" /> 
        </transition> 
        
        <transition name="zoom">
            <overlay v-if="activeOverlay">    
                <component :is="'overlay-content-' + activeOverlay" :player="currentPlayer" 
                    :opponent="currentOpponent" :players="players" />
            </overlay>
        </transition>
    </div>`,
})

window.addEventListener('resize', () => {
    state.worldRatio = getWorldRatio()
})
