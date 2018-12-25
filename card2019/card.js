let canvas = null;
let audio = null;
let preclick = null;

let graphics = null;

let displayWidth = 0, displayHeight = 0;

function init() {
    document.addEventListener('DOMContentLoaded', async () => {
        canvas = document.getElementById('targetCanvas');
        audio = document.getElementById('targetAudio');
        preclick = document.getElementById('targetPreclick');

        displayWidth = window.innerWidth;
        displayHeight = window.innerHeight;
        canvas.width = displayWidth;
        canvas.height = displayHeight;

        graphics = new Graphics(canvas);

        await new Promise(resolve => document.body.addEventListener('click', this.documentClick = () => {
            document.body.removeEventListener('click', this.documentClick);
            // document.getElementById('targetPreclick').remove();
            preclick.style.display = 'none';
            resolve();
        }));

        await scenePixelated();

        preclick.style.display = 'block';
        preclick.innerText = 'This is just PoC, more - soon :D';

        await scenePreshow();
        await sceneShow();
    });
}

async function scenePixelated() {
    let pxStars = [];

    for (i = 0; i < 20; i++) {
        let pxStar = new PXStar(
            { x: randomInt(0, displayWidth), y: randomInt(0, displayHeight) },
            { width: 11, height: 11 });
        pxStar.register(graphics);
        await pxStar.appear();
        pxStars.push(pxStar);
    }

    audio.src = './assets/audio/starlight.mp3';
    await audio.play();
    audio.loop = true;

    let pxStarsBlinkIntervalId;
    await new Promise(resolve => {
        pxStarsBlinkIntervalId = setInterval(() => {
            let pxStar = pxStars[~~(Math.random() * pxStars.length)];
            pxStar.location.x = randomInt(0, displayWidth);
            pxStar.location.y = randomInt(0, displayHeight);
            pxStar.background = `rgb(${randomInt(200, 255)}, ${randomInt(180, 255)}, 0)`;
            pxStar.invalidate();
        }, 100);
        setTimeout(resolve, 10000);
    });
    clearInterval(pxStarsBlinkIntervalId);
}

async function scenePreshow() {

}

async function sceneShow() {

}

function randomInt(min, max) {
    return ~~(Math.random() * max + min)
}

init();