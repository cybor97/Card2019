function init() {
    document.addEventListener('DOMContentLoaded', async () => {
        console.log('Init completed')

        let canvas = document.getElementById('targetCanvas');
        let displayWidth = window.innerWidth;
        let displayHeight = window.innerHeight;
        canvas.width = displayWidth;
        canvas.height = displayHeight;

        let graphics = new Graphics(canvas);

        for (i = 0; i < 20; i++) {
            let pxStar = new PXStar({ x: Math.random() * displayWidth, y: Math.random() * displayHeight }, { width: 20, height: 20 });
            pxStar.register(graphics);
            await pxStar.appear();
        }
    });
}

init();