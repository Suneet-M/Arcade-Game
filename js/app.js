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
        return this.x + tileWidth;
    }

    get endY() {
        return this.y + tileHeight;
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
        checkWin();
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

        this.win = false;
        this.lose = false;
    }

    // Approxiamte location of player's feet using block's dimensions
    get feetY() {
        return this.y + tileHeight;
    }

    get feetX() {
        // Half of block's horizontal dimension used
        return this.x + (tileWidth/2);
    }

    update(dt) {

    }

    // Draws the player on the screen
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // To move the player
    handleInput(key) {
        // Each block on the canvas is layed as 101px*83px
        // so character must move the same pixels
        // to keep him/her centered on the block
        switch (key) {
            case 'left':
                (this.x !== -2) ? this.x -= tileWidth : 1;
                break;

            case 'up':
                (this.y !== -40) ? this.y -= tileHeight : 1;
                break;

            case 'down':
                (this.y !== 375) ? this.y += tileHeight : 1;
                break;

            case 'right':
                (this.x !== 402) ? this.x += tileWidth : 1;
                break;
        }
    }
}


// Enemy and PLayer instances
let allEnemies = [new Enemy(1.5, 64), new Enemy(3, 64, -550), new Enemy(6, 64, -1000),
                  new Enemy(2, 147), new Enemy(1.2, 147, -200), new Enemy(3, 147, -800),
                  new Enemy(1, 230), new Enemy(2.2, 230, -450)];
let player = new Player();

// Dimensions for every block on the canvas
const tileWidth = 101,
      tileHeight = 83;

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
            reduceLives();
        }
    }
}

function resetPlayer() {
    player.x = player.startX;
    player.y = player.startY;
}

let lives = Array.from(document.querySelectorAll('.fa-heart'));
let i = lives.length;
function reduceLives() {
    i--;
    lives[i].classList.remove('fas');
    lives[i].classList.add('far');
    checkLose();
}

function checkWin() {
    if(player.y == -40) {
        gameWin();
    }
}

function gameWin() {
    player.win = true;
    num = 0; // to act on first modal from array
    showModal();
}

function checkLose() {
    if(i == 0) {
        gameLose();
    }
}

function gameLose() {
    player.lose = true;
    num = 1; // to act on second modal from array
    showModal();
}

function resetLives() {
    for(i = 0; i < lives.length; i++) {
        lives[i].classList.add('fas');
    }
}

function resetGame() {
    player.win = false;
    player.lose = false;
    resetPlayer();
    resetLives();
    hideModal();
    Engine.start();
}

const modalBack = document.querySelector('.modal-back'),
      modalBody = Array.from(document.querySelectorAll('.modal-body')), // both modals added to array
      closeButtons = Array.from(document.querySelectorAll('.close')),
      resetButtons = Array.from(document.querySelectorAll('.reset'));
let num;
// 'num' will state which modal is in perspective for animating, showModal, hideModal, and toggleListeners
// it will contribute to good performance because only the modal we want will have classes and listeners added.

function showModal() {
    modalBack.classList.add('show');

    // display win modal or lose modal
    modalBody[num].classList.add('show');

    // entry animation for modal in perspective
    (num == 0) ? modalBody[num].classList.add('tada') : modalBody[num].classList.add('wobble');

    // to display lives directly fetch from score-panel
    document.querySelector('.content').innerHTML =
    document.querySelector('.score-panel').innerHTML;

    // add event listeners
    toggleListeners('on');
}

function hideModal() {
    modalBody[num].classList.add('bounceOut'); // exit animation

    // to allow time for animation
    setTimeout(() => {
        modalBody[num].classList.remove('show', 'tada', 'wobble', 'bounceOut');
        modalBack.classList.remove('show');
    },780)

    // remove event listeners
    toggleListeners('off');
}

function toggleListeners(sw) {
    switch (sw) {
        case 'on':
            closeButtons[num].addEventListener('click', hideModal);
            resetButtons[num].addEventListener('click', resetGame);
            break;

        case 'off':
            closeButtons[num].removeEventListener('click', hideModal);
            resetButtons[num].removeEventListener('click', resetGame);
    }
}