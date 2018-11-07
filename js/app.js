// Enemies our player must avoid
class Enemy {
    constructor(speed, y, x = -120) {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started

        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
        this.startX = x;
        this.x = this.startX;
        this.y = y;
        this.sp = speed;
        this.random = 100;
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x += this.sp * this.random * dt;
        if (this.x >= 520) {
            this.x = this.startX;
            this.random = Math.random() * (200-100) + 100;
        }
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor(){
        this.sprite = 'images/char-boy.png';
        this.x = 200;
        this.y = 375;
    }

    update(dt) {
        // console.log(dt);
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(key) {
        // console.log(key);
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

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [new Enemy(1.2, 64), new Enemy(1.8, 64, -250),
                  new Enemy(2, 147), new Enemy(1.5, 147, -100),
                  new Enemy(1, 230), new Enemy(2.2, 230, -150)];
let player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
