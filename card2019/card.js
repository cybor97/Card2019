let graphics = null;

function init() {
    document.addEventListener('DOMContentLoaded', async () => {
        await scenePixelated();
        await scenePreshow();
        await sceneShow();
    });
}

async function scenePixelated() {
    let canvas = document.getElementById('targetCanvas');
    let displayWidth = window.innerWidth;
    let displayHeight = window.innerHeight;
    canvas.width = displayWidth;
    canvas.height = displayHeight;

    graphics = new Graphics(canvas);
    let pxStars = [];

    for (i = 0; i < 20; i++) {
        let pxStar = new PXStar(
            { x: ~~(Math.random() * displayWidth), y: ~~(Math.random() * displayHeight) },
            { width: 10, height: 10 });
        pxStar.register(graphics);
        await pxStar.appear();
        pxStars.push(pxStar);
    }
    while (true) {
        await new Promise(resolve => setTimeout(resolve, 10))
            .then(() => {
                let pxStar = pxStars[~~(Math.random() * pxStars.length)];
                pxStar.location.x = ~~(Math.random() * displayWidth);
                pxStar.location.y = ~~(Math.random() * displayHeight);
                pxStar.invalidate();
            });
    }
}

async function scenePreshow() {

}

async function sceneShow() {

}

init();