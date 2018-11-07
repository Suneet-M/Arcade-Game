// Enemies our player must avoid
class Enemy {
    constructor(speed, y, x = -120) {
        this.sprite = 'images/enemy-bug.png';
        this.startX = x;

        this.x = this.startX;
        this.y = y;

        this.sp = speed;
        this.random = 100;
    }

    update(dt) {
        // increment in position by specific speed
        this.x += this.sp * this.random * dt;

        // for randomizing speed every time enemy crosses the road
        if (this.x >= 520) {
            // reset enemy position
            this.x = this.startX;
            //getting a random number b/w 100-200
            this.random = Math.random() * (200-100) + 100; 
        }
    }

    // Draws the enemy on the screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Our Player
class Player {
    constructor(){
        this.sprite = 'images/char-boy.png';
        this.x = 200;
        this.y = 375;
    }

    update(dt) {

    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(key) {
        if (key == 'left') {
            (this.x !== -2) ? this.x -= 101 : 1;
        }
        if (key == 'up') {
            (this.y !== -40) ? this.y -= 83 : 1;
        }
        if (key == 'down') {
            (this.y !== 375) ? this.y += 83 : 1;
        }
        if (key == 'right') {
            (this.x !== 402) ? this.x += 101 : 1;
        }
    }
}

// Enemy and PLayer instances
let allEnemies = [new Enemy(1.2, 64), new Enemy(1.8, 64, -250),
                  new Enemy(2, 147), new Enemy(1.5, 147, -100),
                  new Enemy(1, 230), new Enemy(2.2, 230, -150)];
let player = new Player();

// Keypress Handler
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
