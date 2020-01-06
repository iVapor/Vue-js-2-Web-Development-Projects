// Some usefull variables
var maxHealth = 10
var maxFood = 10
var handSize = 5
var cardUid = 0
var currentPlayingCard = null

// The consolidated state of our app
var state = {
    // World
    worldRatio: getWorldRatio(),
    // TODO Other things
    // Game
    turn: 1,
    players: [
        {
            name: 'Anne of Cleves',
            food: 10,
            health: 10,
            skipTurn: false,
            skippedTurn: false,
            hand: [],
            lastPlayedCardId: null,
            dead: false,
        },
        {
            name: 'William the Bald',
            food: 10,
            health: 10,
            skipTurn: false,
            skippedTurn: false,
            hand: [],
            lastPlayedCardId: null,
            dead: false,
        },

    ],
    currentPlayerIndex: Math.round(Math.random()),
}
