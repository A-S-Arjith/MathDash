class Game {
    constructor() {
        this.text = createElement('h2');
        this.formedQuestion = createElement('h2');
        this.answerinput = createInput("Answer here");
        this.submit = createButton("Submit");
        this.response = 1;
        this.number1 = Math.round(random(1, 100));
        this.number2 = Math.round(random(1, 100));
        this.sign = Math.round(random(1, 4));
        this.sign1 = null;
        this.answer = null;
    }
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })
    }

    update(state) {
        database.ref('/').update({
            'gameState': state
        });
    }
    async start() {
        background(trackstart);
        if (gameState === 0) {
            player = new Player();
            var playerCountRef = await database.ref('playerCount').once("value");
            if (playerCountRef.exists()) {
                playerCount = playerCountRef.val();
                player.getCount();
            }
            form = new Form();
            form.display();
        }
        car1 = createSprite(100, 200);
        car1.addImage("car1", car1Img)
        car2 = createSprite(300, 200);
        car2.addImage("car2", car2Img)
        car3 = createSprite(500, 200);
        car3.addImage("car3", car3Img)
        car4 = createSprite(700, 200);
        car4.addImage("car4", car4Img)

        cars = [car1, car2, car3, car4];
    }
    async play() {

        form.hide();
        background(ground);
        image(track, 0, -displayHeight * 4, displayWidth, displayHeight * 5)
        Player.getPlayersInfo();
        player.getCarsAtEnd();
        if (allPlayers !== undefined) {
            var index = 0;
            var x = 200;
            var y;
            for (var plr in allPlayers) {
                index++;
                x = x + 240;
                y = displayHeight - allPlayers[plr].distance
                cars[index - 1].x = x;
                cars[index - 1].y = y;
                if (index === player.index) {
                    fill("red");
                    textSize(35);
                    text(player.name, cars[index - 1].x - 50, cars[index - 1].y - 50);
                    camera.position.x = displayWidth / 2;
                    camera.position.y = cars[index - 1].y;
                }
            }
        }
        while (this.response === 1) {
            // console.log(this.response);
            this.response = await this.question();
            //     console.log(this.response);
        }

        if (player.distance > 4250) {
            gameState = 2;
            player.rank += 1;
            Player.updateCarsAtEnd(player.rank);
        }
        drawSprites();
    }

    end() {
        console.log("Game Ended");
        console.log("Rank : " + player.rank);
    }

    async question() {
        textSize(30);
        this.text.html("Solve the problem to move ahead!");
        this.text.position(300, camera.position.y - 200);
        this.number1 = Math.round(random(1, 100));
        this.number2 = Math.round(random(1, 100));
        this.sign = Math.round(random(1, 4));
        switch (this.sign) {
            case 1: this.sign1 = " + ";
                this.answer = this.number1 + this.number2;
                break;
            case 2: this.sign1 = " - ";
                this.answer = this.number1 - this.number2;
                break;
            case 3: this.sign1 = " * ";
                this.answer = this.number1 * this.number2;
                break;
            case 4: this.sign1 = " / ";
                this.answer = this.number1 / this.number2;
                break;
            default: break;
        }
        this.formedQuestion.html(this.number1 + this.sign1 + this.number2 + "= ?")
        this.formedQuestion.position(350,150);
        this.answerinput.position(350,100);
        this.submit.position(350,70);
        var r = await this.responsed();

        return r;
    }
    async responsed() {
        this.submit.mousePressed(async () => {
            var answer = await this.answerinput.value()
            if (this.answer == answer) {
                alert("Correct!")
                this.question();
                player.distance += 50;
                player.update();
            } else {
               alert("Try again!");
                return -1;
            }
        })
    }
}