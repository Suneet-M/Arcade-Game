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
        switch (key) {
            case 'left':
                (this.x !== -2) ? this.x -= 101 : 1;
                break;

            case 'up':
                (this.y !== -40) ? this.y -= 83 : 1;
                break;

            case 'down':
                (this.y !== 375) ? this.y += 83 : 1;
                break;

            case 'right':
                (this.x !== 402) ? this.x += 101 : 1;
                break;
        }
    }
}


// Enemy and PLayer instances
let allEnemies = [new Enemy(1.5, 64), new Enemy(3, 64, -550), new Enemy(6, 64, -1000),
                  new Enemy(2, 147), new Enemy(1.2, 147, -200), new Enemy(3, 147, -800),
                  new Enemy(1, 230), new Enemy(2.2, 230, -450)];
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
            reduceLives();
        }
    }
}

function checkWin() {
    if(player.y == -40) {
        player.win = true;
        showModal('win');
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
    if(i < 0) {
        showModal('lose');
    }
    else {
        lives[i].classList.remove('fas');
        lives[i].classList.add('far');
    }
}

function resetLives() {
    for(i=0; i<lives.length; i++) {
        lives[i].classList.add('fas');
    }
}

function resetGame() {
    player.win = false;
    resetPlayer();
    resetLives();
    hideModal();
    Engine.start();
}

const modalBody = document.querySelector('.modal-body')
      modalBodyWin = document.querySelector('.modal-win'),
      modalBodyLose = document.querySelector('.modal-lose'),
      modalBack = document.querySelector('.modal-back'),
      closeButtons = Array.from(document.querySelectorAll('.close')),
      resetButtons = Array.from(document.querySelectorAll('.reset'));

function showModal(status) {
    modalBack.classList.add('show');

    // win modal or lose modal
    if(status == 'win') {
        modalBodyWin.classList.add('show', 'tada');
    }
    if(status == 'lose') {
        modalBodyLose.classList.add('show', 'wobble');
    }

    // to display lives directly fetch from score-panel
    document.querySelector('.content').innerHTML =
    document.querySelector('.score-panel').innerHTML;

    // add event listeners
    toggleListeners('on');
}

function hideModal() {
    modalBody.classList.add('bounceOut');

    // to allow time for animation
    setTimeout(() => {
        modalBody.classList.remove('show', 'tada', 'wobble', 'bounceOut');
        modalBack.classList.remove('show');
    },780)

    // remove event listeners
    toggleListeners('off');
}

function toggleListeners(sw) {
    switch (sw) {
        case 'on':
            closeButtons.forEach((button) =>
                button.addEventListener('click', hideModal));
            resetButtons.forEach((button) =>
                button.addEventListener('click', resetGame));
            break;

        case 'off':
            closeButtons.forEach((button) =>
                button.removeEventListener('click', hideModal));
            resetButtons.forEach((button) =>
                button.removeEventListener('click', resetGame));
    }
}