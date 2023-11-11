// Made by Mike Cook and Rianna Suen - text-based example (using Tracery)

function day1Preload() {

    assets.day1GrammarSource = loadJSON("../assets/day1-grammar-source.json");
    assets.day1Font = loadFont("../assets/day1-Pangolin-Regular.ttf");
}

class Day1 extends Day {

    constructor () {

        super();
        this.loop = true;
        this.controls = "CLICK for a new letter to Santa";
        this.credits = "Made by Mike Cook and Rianna Suen";
        this.label = "text-based example";

        // setup text

        this.grammar = setupGrammar(assets.day1GrammarSource);
        this.randomText;

        // setup snow particles

        this.snow = [];
        this.snowAmount = 200;

        for (let i = 0; i < this.snowAmount; i++) {
            this.snow.push(new this.Snow());
        }
    }

    prerun() {

        this.newText();
    }

    update() {

        background(255);

        // draw text

        textSize(45);
        textFont(assets.day1Font);
        textAlign(CENTER, CENTER);
        rectMode(CENTER);

        fill(180);
        text(this.randomText, width/2-2, height/2-2, width*0.8);
        fill(200);
        text(this.randomText, width/2, height/2, width*0.8);

        // draw snow

        for (let i = 0; i < this.snow.length; i++) {
            this.snow[i].update();
        }
    }

    mousePressed() {

        this.newText();
    }

    newText() {

        // get new text

        this.randomText = getText(this.grammar);

        // reset fallen snow

        for (let i = 0; i < this.snow.length; i++) {
            this.snow[i].clearFallenSnow();
        }
    }

    Snow = class {

        constructor() {

            this.fallenSnow = [];
            this.init();
        }

        init() {

            this.x = random(width);
            this.y = random(height);
            this.radius = random(3, 10);
        }

        clearFallenSnow() {

            this.fallenSnow = [];
        }

        update() {

            if (random() < 0.005) {

                this.fallenSnow.push({
                    x: this.x,
                    y: this.y,
                    radius: this.radius
                });

                this.init();
            }

            this.x += random(-1, 2);
            this.y++;

            this.x = this.x % width;
            this.y = this.y % height;

            this.display();
        }

        display() {

            noStroke();
            fill(255);
            ellipse(this.x, this.y, this.radius);

            for (let i = 0; i < this.fallenSnow.length; i++) {
                ellipse(this.fallenSnow[i].x, this.fallenSnow[i].y, this.fallenSnow[i].radius)
            }
        }
    }
}