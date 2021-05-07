class Player {
    constructor() {
        this.index = null;
        this.name = null;
        this.distance = 0;
        this.rank = null;
    }

    getCount() {
        var countRef = database.ref('playerCount');
        countRef.on("value", (data) => {
            playerCount = data.val();
        })
    }
    updateCount(count) {
        database.ref('/').update({
            'playerCount': count
        });
    }
    update() {
        var playerIndex = "players/player" + this.index;
        database.ref(playerIndex).set({
            'name': this.name,
            'distance': this.distance
        });
    }

    static getPlayersInfo() {
        var playersInfoRef = database.ref('players');
        playersInfoRef.on("value", (data) => {
            allPlayers = data.val();
        })
    }
    getCarsAtEnd() {
        database.ref('carsatend').on("value", (data) => {
            this.rank = data.val();
        })
    }

    static updateCarsAtEnd(rank) {
        database.ref('/').update({
            'carsatend': rank
        });
    }
}