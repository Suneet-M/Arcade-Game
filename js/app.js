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

    // Used to check collision
    get endX() {
        return this.x + 101;
    }

    get endY() {
        return this.y + 83;
    }

    // To move the enemy
    update(dt) {
        // Increment in position by specific speed
        this.x += this.sp * this.random * dt;

        // For resting position & randomizing speed every time enemy crosses the road
        if(this.x >= 520) {
            this.x = this.startX; // reset enemy position
            //getting a random number b/w 100-200
            this.random = Math.random() * (200-100) + 100; 
        }

        checkCollision(this);
    }

    // Draws the enemy on the screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Our Player
class Player {
    constructor() {
        this.sprite = 'images/char-boy.png';

        // Placed the player's feet in center of the block
        this.startX = 200;
        this.startY = 375;

        this.x = this.startX;
        this.y = this.startY;
    }

    // Approxiamte location of player's feet using block's dimensions
    get feetY() {
        return this.y + 83;
    }

    get feetX() {
        // Half of block's horizontal dimension used
        return this.x + 50.5;
    }

    update(dt) {

    }

    // Draws the player on the screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // To move the player
    handleInput(key) {
        // Each block on the convas is layed as 101px*83px
        // so character must move the same pixels
        // to keep him/her centered on the block
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


// Functions

function checkCollision(enemy){
    // By mapping a rectangle for the enemy from [x to endX] and [y to endY]
    // For player, the feet's position is taken into consideration
    if(player.feetX <= enemy.endX && player.feetX >= enemy.x) {
        if(player.feetY <= enemy.endY && player.feetY >= enemy.y) {
            resetPlayer();
        }
    }
}

function resetPlayer() {
    player.x = player.startX;
    player.y = player.startY;
}