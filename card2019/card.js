let canvas = null;
let audio = null;
let preclick = null;

let graphics = null;

let displayWidth = 0, displayHeight = 0;

const PX_FRACTION_SIZE = 2, PX_ANIMATION_STEP = PX_FRACTION_SIZE;

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

        await new Promise(resolve => document.body.addEventListener('click',
            this.documentClick = () => {
                document.body.removeEventListener('click', this.documentClick);
                preclick.style.display = 'none';
                resolve();
            }));

        // await scenePixelated();

        preclick.style.display = 'block';
        preclick.innerText = 'No, not this way...';

        await scenePreshow();
        preclick.style.display = 'none';

        await sceneShow();
    });
}

async function scenePixelated() {
    let pxStars = [];

    let pxDecorations = new PXDecorations(
        { x: 0, y: 0 },
        { width: displayWidth, height: displayHeight }
    );
    pxDecorations.register(graphics);
    await pxDecorations.appear();

    for (i = 0; i < 15; i++) {
        let pxStar = new PXStar(
            { x: randomInt(0, displayWidth), y: randomInt(0, ~~(displayHeight * 0.9)) },
            { width: PX_FRACTION_SIZE * 3, height: PX_FRACTION_SIZE * 3 });
        pxStar.register(graphics);
        await pxStar.appear();
        pxStars.push(pxStar);
    }

    audio.src = './assets/audio/starlight.mp3';
    await audio.play();
    audio.loop = true;

    let pxStarsBlinkIntervalId;
    pxStarsBlinkIntervalId = setInterval(() => {
        let pxStar = pxStars[~~(Math.random() * pxStars.length)];
        pxStar.location.x = randomInt(0, displayWidth);
        pxStar.location.y = randomInt(0, ~~(displayHeight * 0.85));
        pxStar.background = `rgb(${randomInt(200, 255)}, ${randomInt(180, 255)}, 0)`;
        pxStar.invalidate();
    }, 500);

    let pxTree = new PXTree(
        {
            x: displayWidth / 2 - PX_FRACTION_SIZE * 30,
            y: displayHeight - ~~(displayHeight / 8) - PX_FRACTION_SIZE * 75
        },
        { width: PX_FRACTION_SIZE * 60, height: PX_FRACTION_SIZE * 60 });
    pxTree.register(graphics);
    await pxTree.appear();

    let pxSnowflakes = [];
    for (let i = 0; i < 20; i++) {
        let randCoef = Math.random();
        let pxSnowflake = new PXSnowflake({
            x: ~~(randCoef * displayWidth),
            y: ~~(randCoef * (displayHeight - displayHeight / 8))
        },
            { width: PX_FRACTION_SIZE * 6, height: PX_FRACTION_SIZE * 6 });
        pxSnowflake.register(graphics);
        await pxSnowflake.appear();
        pxSnowflakes.push(pxSnowflake);
    }

    let snowflakesFallIntervalId;
    snowflakesFallIntervalId = setInterval(() => {
        for (let snowflake of pxSnowflakes) {
            let moveCoefX = randomInt(1, PX_ANIMATION_STEP);

            snowflake.location.x += moveCoefX > 0 ? ~~(moveCoefX / 1.5) : -(moveCoefX * 2);
            if (snowflake.location.y < displayHeight - snowflake.size.height - displayHeight / 8) {
                let moveCoefY = randomInt(0, PX_ANIMATION_STEP * 3);
                snowflake.location.y += moveCoefY;
            }
            else {
                snowflake.location.y = 0;
                snowflake.location.x = randomInt(0, displayWidth);
            }
            pxTree.invalidate();
            snowflake.invalidate();
        }
    }, 20);


    await new Promise(resolve => setTimeout(resolve, 10000));
    clearInterval(pxStarsBlinkIntervalId);
    clearInterval(snowflakesFallIntervalId);

    await graphics.clear(true);
}

async function scenePreshow() {

}

async function sceneShow() {
    let hqDecorations = new HQDecorations(
        { x: 0, y: 0 },
        { width: displayWidth, height: displayHeight }
    );
    hqDecorations.register(graphics);
    await hqDecorations.appear();

    let hqTree = new HQTree(
        {
            x: displayWidth / 2 - 150,
            y: ~~(displayHeight / 5)
        },
        {
            width: 300,
            height: 500
        }
    );
    hqTree.register(graphics);
    await hqTree.appear();
}

function randomInt(min, max) {
    return ~~(Math.random() * max + min)
}

init();