class Form {
    constructor() {
        this.title = createElement('h1');
        this.input = createInput("Name");
        this.button = createButton("PLAY");
        this.reset = createButton("Reset The database");
        this.greeting = createElement('h3');
    }
    display() {
        this.title.html("Math Dash!");
        this.title.position(displayWidth / 2 - 100, 0);

        this.input.position(displayWidth / 2 - 40, displayHeight / 2 - 80);

        this.button.position(displayWidth / 2 + 30, displayHeight / 2);

        this.reset.position(displayWidth - 170, 50);

        this.button.mousePressed(() => {
            this.input.hide();
            this.button.hide();

            player.name = this.input.value();
            playerCount++;
            player.index = playerCount;
            player.update();
            player.updateCount(playerCount);

            this.greeting.html("Hello  : " + player.name);
            this.greeting.position(displayWidth / 2 - 70, displayHeight / 4);
        });
        this.reset.mousePressed(() => {
            player.updateCount(0);
            game.update(0);
            Player.updateCarsAtEnd(0);
        });
    }
    hide() {
        this.input.hide();
        this.button.hide();
        this.greeting.hide();
    }
}