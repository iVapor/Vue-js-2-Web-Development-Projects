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
    methods: {
        handlePlay() {
            playCard(card)
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

        handleCardLeaveEnd() {
            applyCard()
        },
        testPlayCard(card) {
            // 将卡牌从玩家手牌中移除即可
            log('card', card)
            const index = this.testHand.indexOf(card)
            this.testHand.splice(index, 1)
        },

        handleOverlayClose() {
            overlayCloseHandlers[this.activeOverlay]()
        },
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
            <hand v-if="!activeOverlay"  :cards="currentHand" 
                @card-leave-end="handleCardLeaveEnd" 
                @card-play="handlePlayCard" /> 
        </transition> 
        
        <transition name="zoom">
            <overlay v-if="activeOverlay" @close="handleOverlayClose">    
                <component :is="'overlay-content-' + activeOverlay" :player="currentPlayer" 
                    :opponent="currentOpponent" :players="players" />
            </overlay>
        </transition>
    </div>`,
})


var overlayCloseHandlers = {
    'player-turn'() {
        if (state.turn > 1) {
            state.activeOverlay = 'last-play'
        } else {
            newTurn()
        }
    },

    'last-play'() {
        newTurn()
    },

    'game-over'() {
        document.location.reload()
    },
}

window.addEventListener('resize', () => {
    state.worldRatio = getWorldRatio()
})

// Gameplay

state.activeOverlay = 'player-turn'

function beginGame() {
    state.players.forEach(drawInitialHand)
}


function playCard(card) {
    if (state.canPlay) {
        state.canPlay = false
        currentPlayingCard = card

        // Remove the card from player hand
        const index = state.currentPlayer.hand.indexOf(card)
        state.currentPlayer.hand.splice(index, 1)

        // Add the card to the discard pile
        addCardToPile(state.discardPile, card.id)
    }
}


function applyCard() {
    const card = currentPlayingCard

    applyCardEffect(card)

    // Wait a bit for the player to see what's going on
    setTimeout(() => {
        // Check if the players are dead
        state.players.forEach(checkPlayerLost)

        if (isOnePlayerDead()) {
            endGame()
        } else {
            nextTurn()
        }
    }, 700)
}


function nextTurn() {
    state.turn++
    state.currentPlayerIndex = state.currentOpponentId
    state.activeOverlay = 'player-turn'
}

function newTurn() {
    state.activeOverlay = null
    if (state.currentPlayer.skipTurn) {
        skipTurn()
    } else {
        startTurn()
    }
}


function skipTurn() {
    state.currentPlayer.skippedTurn = true
    state.currentPlayer.skipTurn = false
    nextTurn()
}

function startTurn() {
    state.currentPlayer.skippedTurn = false
    if (state.turn > 2) {
        // Draw new card
        setTimeout(() => {
            state.currentPlayer.hand.push(drawCard())
            state.canPlay = true
        }, 800)
    } else {
        state.canPlay = true
    }
}


function endGame() {
    state.activeOverlay = 'game-over'
}
