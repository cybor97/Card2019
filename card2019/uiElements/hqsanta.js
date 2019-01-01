class HQSanta extends IUIElement {
    async appear() {
        this.santaImage = new Image();
        this.santaImage.src = './assets/img/santaSky.png';

        await new Promise(resolve =>
            this.santaImageListener = this.santaImage.addEventListener('load', () => {
                this.santaImage.removeEventListener('load', this.santaImageListener);
                resolve();
            }));

        return super.appear([
            {
                figureType: 'image',
                params: [
                    this.location.x, this.location.y,
                    this.size.width, this.size.height,
                ],
                image: this.santaImage,
            }
        ]);
    }
}