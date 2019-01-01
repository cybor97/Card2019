class HQPresent extends IUIElement {
    async appear() {
        this.presentImage = new Image();
        this.presentImage.src = [
            './assets/img/present1.png',
            './assets/img/present2.png',
            './assets/img/present3.png',
            './assets/img/present4.png',
        ][Math.floor(Math.random() * 4)];

        await new Promise(resolve =>
            this.presentImageListener = this.presentImage.addEventListener('load', () => {
                this.presentImage.removeEventListener('load', this.presentImageListener);
                resolve();
            }));

        return super.appear([
            {
                figureType: 'image',
                params: [
                    this.location.x, this.location.y,
                    this.size.width, this.size.height,
                ],
                image: this.presentImage,
            }
        ]);
    }
}