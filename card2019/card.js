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

    let graphics = new Graphics(canvas);
    let pxStars = [];

    for (i = 0; i < 20; i++) {
        let pxStar = new PXStar(
            { x: Math.random() * displayWidth, y: Math.random() * displayHeight },
            { width: 10, height: 10 });
        pxStar.register(graphics);
        await pxStar.appear();
        pxStars.push(pxStar);
    }
    return await new Promise(resolve => setInterval(resolve, 100));
}

async function scenePreshow() {

}

async function sceneShow() {

}

init();