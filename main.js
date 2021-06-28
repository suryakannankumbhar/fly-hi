const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 400;

let spacePressed = false;
let angle = 0;
let hue = 0;
let frame = 0;
let score = 0;
let gameSpeed = 2;
const background = new Image();
background.src = 'BG.png';
const BG = {
    x1: 0,
    x2: canvas.width,
    y: 0,
    width: canvas.width,
    height: canvas.height,
};

function handleBackground() {
    if (BG.x1 <= -BG.width + gameSpeed) {
        BG.x1 = BG.width;
    } else {
        BG.x1 -= gameSpeed;
    }
    if (BG.x2 <= -BG.width + gameSpeed) {
        BG.x2 = BG.width;
    } else {
        BG.x2 -= gameSpeed;
    }

    ctx.drawImage(background, BG.x1, BG.y, BG.width, BG.height);
    ctx.drawImage(background, BG.x2, BG.y, BG.width, BG.height);
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.fillRect(10, canvas.height - 90, 50, 50);
    handleBackground();
    handleObstacles();
    handleParticles();
    bird.update();
    bird.draw();
    ctx.fillStyle = 'white';
    ctx.font = '60px Georgia';
    ctx.strokeText(score, 535, 45);
    ctx.fillText(score, 535, 45);
    handleCollisions();
    if (handleCollisions()) {
        return;
    }
    requestAnimationFrame(animate);
    angle += 0.12;
    hue++;
    frame++;
}
animate();

window.addEventListener('keydown', function (e) {
    if (e.code === 'Space') spacePressed = true;
});
window.addEventListener('touchstart', function (e) {
    if (e.type === 'touchstart') spacePressed = true;
});

window.addEventListener('keyup', function (e) {
    if (e.code === 'Space') spacePressed = false;
    bird.frameX = 0;
});
window.addEventListener('touchend', function (e) {
    if (e.type === 'touchend') spacePressed = false;
    bird.frameX = 0;
});

const bang = new Image();
bang.src = 'boom.png';
function handleCollisions() {
    for (let i = 0; i < obstaclesArray.length; i++) {
        if (
            bird.x < obstaclesArray[i].x + obstaclesArray[i].width &&
            bird.x + bird.width > obstaclesArray[i].x &&
            ((bird.y < 0 + obstaclesArray[i].top && bird.y + bird.height > 0) ||
                (bird.y > canvas.height - obstaclesArray[i].bottom &&
                    bird.y + bird.height < canvas.height))
        ) {
            ctx.drawImage(bang, bird.x, bird.y, 100, 100);
            ctx.font = '30px Georgia';
            ctx.fillStyle = 'white';
            ctx.fillText(
                'Game Over!! Your Score is ' + score,
                130,
                canvas.height / 2
            );

            return true;
        }
    }
}

const refresh = document.getElementById('refresh');
refresh.addEventListener('click', function (e) {
    window.location.reload();
});
