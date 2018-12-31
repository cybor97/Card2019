class HQDecorations extends IUIElement {
    async appear() {
        this.backgroundImage = new Image();
        this.backgroundImage.src = './assets/img/moon.jpg';

        this.snowGroundImage = new Image();
        this.snowGroundImage.src = './assets/img/snowGround.jpg';

        await Promise.all([
            new Promise(resolve =>
                this.backgroundImageListener = this.backgroundImage.addEventListener('load', () => {
                    this.backgroundImage.removeEventListener('load', this.backgroundImageListener);
                    resolve();
                })),
            new Promise(resolve =>
                this.snowGroundImageListener = this.snowGroundImage.addEventListener('load', () => {
                    this.snowGroundImage.removeEventListener('load', this.snowGroundImageListener);
                    resolve();
                }))
        ]);

        return super.appear([
            {
                figureType: 'image',
                params: [
                    this.backgroundImage,
                    this.location.x + 50, this.location.y + 50,
                    50, 50
                ],
            },
            {
                figureType: 'image',
                params: [
                    this.snowGroundImage,
                    this.location.x, this.location.y + (this.size.height - ~~(this.size.height / 10)),
                    this.size.width, ~~(this.size.height / 10)
                ],
            }
        ]);
    }
}