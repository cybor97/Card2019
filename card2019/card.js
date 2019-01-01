let canvas = null;
let audio = null;
let preclick = null;

let graphics = null;

let displayWidth = 0, displayHeight = 0, minSize = 0;

const PX_FRACTION_SIZE = 2, PX_ANIMATION_STEP = PX_FRACTION_SIZE;

function init() {
    document.addEventListener('DOMContentLoaded', async () => {
        canvas = document.getElementById('targetCanvas');
        audio = document.getElementById('targetAudio');
        preclick = document.getElementById('targetPreclick');

        preclick.innerText = 'Нажмите сюда!';

        displayWidth = window.innerWidth;
        displayHeight = window.innerHeight;
        minSize = displayWidth < displayHeight ? displayWidth : displayHeight;

        canvas.width = displayWidth;
        canvas.height = displayHeight;

        graphics = new Graphics(canvas);

        await new Promise(resolve => document.body.addEventListener('click',
            this.documentClick = () => {
                document.body.removeEventListener('click', this.documentClick);
                preclick.style.display = 'none';
                resolve();
            }));

        await scenePixelated();

        await scenePreshow();

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
            y: displayHeight - ~~(displayHeight / 10) - PX_FRACTION_SIZE * 75
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
    preclick.style.display = 'block';
    preclick.innerText = 'Нет, так не пойдет...';
    await new Promise(resove => setTimeout(resove, 2000));
    preclick.style.display = 'none';

    audio.src = './assets/audio/cascada.mp3';
    await audio.play();
}

async function sceneShow() {
    //#region Decorations
    let hqDecorations = new HQDecorations(
        { x: 0, y: 0 },
        { width: displayWidth, height: displayHeight }
    );
    hqDecorations.register(graphics);
    await hqDecorations.appear();
    //#endregion
    //#region Tree
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
    //#endregion
    //#region Santa
    let hqSanta = new HQSanta(
        { x: 20, y: 50 },
        { width: ~~(minSize / 2.5), height: ~~(minSize / 7) });
    hqSanta.register(graphics);
    //#endregion    
    //#region Stars
    let hqStars = [];
    for (let i = 0; i < 15; i++) {
        let hqStar = new HQStar(
            { x: randomInt(0, displayWidth), y: randomInt(0, ~~(displayHeight * 0.9)) },
            { width: 20, height: 20 }
        );
        hqStar.register(graphics);
        await hqStar.appear();
        hqStars.push(hqStar);
    }

    setInterval(() => {
        let hqStar = hqStars[~~(Math.random() * hqStars.length)];
        hqStar.location.x = randomInt(0, displayWidth);
        hqStar.location.y = randomInt(0, ~~(displayHeight * 0.85));
    }, 500);
    //#endregion
    //#region Presents
    let hqPresents = [];
    for (let i = 0; i < 10; i++) {
        randCoef = ~~(Math.random() * 200) - 100;
        let hqPresent = new HQPresent(
            { x: displayWidth / 2 + randCoef, y: 100 },
            { width: ~~Math.abs(randCoef / 2 - 20) + 20, height: ~~Math.abs(randCoef / 2 - 20) + 20 }
        );
        hqPresent.register(graphics);
        hqPresents.push(hqPresent);
    }
    //#endregion
    //#region Snowflakes
    let hqSnowflakes = [];
    for (let i = 0; i < 15; i++) {
        let hqSnowflake = new HQSnowflake(
            { x: randomInt(0, displayWidth), y: randomInt(0, ~~(displayHeight * 0.9)) },
            { width: 20, height: 20 }
        );
        hqSnowflake.register(graphics);
        await hqSnowflake.appear();
        hqSnowflakes.push(hqSnowflake);
    }

    setInterval(() => {
        for (let snowflake of hqSnowflakes) {
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
            hqDecorations.invalidate();
            for (let star of hqStars) {
                star.invalidate();
            }
            for (let present of hqPresents) {
                present.invalidate();
            }
            hqSanta.invalidate();
            hqTree.invalidate();
            snowflake.invalidate();
        }
    }, 10);
    //#endregion
    //#region Santa(logic)
    await hqSanta.appear();

    let preTreeInterval = setInterval(() => {
        if (hqSanta.location.x < ~~(displayWidth / 2 - hqSanta.size.width / 2)) {
            hqSanta.location.x += 1;
        }
        else {
            preclick.style.display = 'block';
            preclick.innerText = 'Нажмите на деда мороза!';

            clearInterval(preTreeInterval);
        }
    }, 20);

    await new Promise(resolve => document.body.addEventListener('click',
        this.documentClick = () => {
            document.body.removeEventListener('click', this.documentClick);
            resolve();
        }));
    preclick.style.display = 'none';


    setInterval(() => {
        hqSanta.location.x += 1;
    }, 20);
    //#endregion
    //#region Presents(logic)
    for (let present of hqPresents) {
        await present.appear();
    }
    let presentsDownInterval = 0;
    await new Promise(resolve =>
        presentsDownInterval = setInterval(() => {
            let allDown = true;
            for (let present of hqPresents) {
                if (present.location.y < ~~(displayHeight * 0.85)) {
                    // present.location.x += ;
                    present.location.y += 3;
                    allDown = false;
                }
            }
            if (allDown) {
                clearInterval(presentsDownInterval);
                resolve();
            }
        }, 50));

    preclick.style.display = 'block';
    preclick.innerText = 'Нажмите на подарок';

    await new Promise(resolve => document.body.addEventListener('click',
        this.documentClick = () => {
            document.body.removeEventListener('click', this.documentClick);
            resolve();
        }));

    preclick.style.background = '#232323aa';
    preclick.style.padding = '5px';
    preclick.style.fontSize = '12pt';
    preclick.style.borderRadius = '5px';
    preclick.style.shadow = '#232323 2px 2px 3px';
    preclick.style.textAlign = 'center';
    preclick.style.userSelect = 'none';

    let pre = document.createElement('pre');
    let textMatch = document.location.href.split('#');
    if (textMatch) {
        pre.innerText = b64ToUTF8(textMatch[1]);
    }
    preclick.appendChild(pre);
    //#endregion
}

function randomInt(min, max) {
    return ~~(Math.random() * max + min)
}

function b64ToUTF8(str) {
    return decodeURIComponent(escape(window.atob(str)));
}

init();