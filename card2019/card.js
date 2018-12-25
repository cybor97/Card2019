let canvas = null;
let audio = null;

let graphics = null;

let displayWidth = 0, displayHeight = 0;

function init() {
    document.addEventListener('DOMContentLoaded', async () => {
        canvas = document.getElementById('targetCanvas');
        audio = document.getElementById('targetAudio');

        displayWidth = window.innerWidth;
        displayHeight = window.innerHeight;
        canvas.width = displayWidth;
        canvas.height = displayHeight;

        graphics = new Graphics(canvas);

        await new Promise(resolve => document.body.addEventListener('click', this.documentClick = () => {
            document.body.removeEventListener('click', this.documentClick);
            resolve();
        }));

        await scenePixelated();
        await scenePreshow();
        await sceneShow();
    });
}

async function scenePixelated() {
    let pxStars = [];

    for (i = 0; i < 20; i++) {
        let pxStar = new PXStar(
            { x: randomInt(displayWidth), y: randomInt(displayHeight) },
            { width: 12, height: 12 });
        pxStar.register(graphics);
        await pxStar.appear();
        pxStars.push(pxStar);
    }

    audio.src = './assets/audio/starlight.mp3';
    audio.play();

    let pxStarsBlinkIntervalId;
    await new Promise(resolve => {
        setInterval(() => {
            let pxStar = pxStars[~~(Math.random() * pxStars.length)];
            pxStar.location.x = randomInt(displayWidth);
            pxStar.location.y = randomInt(displayHeight);
            pxStar.invalidate();
        }, 500);
        setTimeout(resolve, 10000);
    });
    clearInterval(pxStarsBlinkIntervalId);
}

async function scenePreshow() {

}

async function sceneShow() {

}

function randomInt(max) {
    return ~~(Math.random() * max)
}

init();