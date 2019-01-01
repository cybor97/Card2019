class HQStar extends IUIElement {
    async appear() {
        this.starImage = new Image();
        this.starImage.src = [
            './assets/img/star1.png',
            './assets/img/star2.png'
        ][Math.floor(Math.random() * 2)];

        await new Promise(resolve =>
            this.starImageListener = this.starImage.addEventListener('load', () => {
                this.starImage.removeEventListener('load', this.starImageListener);
                resolve();
            }));

        return super.appear([
            {
                figureType: 'image',
                params: [
                    this.location.x, this.location.y,
                    this.size.width, this.size.height,
                ],
                image: this.starImage
            }
        ]);
    }
}