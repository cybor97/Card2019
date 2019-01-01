class HQSnowflake extends IUIElement {
    async appear() {
        this.snowflakeImage = new Image();
        this.snowflakeImage.src = [
            './assets/img/snowflake1.png',
            './assets/img/snowflake2.png',
            './assets/img/snowflake3.png',
            './assets/img/snowflake4.png',
        ][Math.floor(Math.random() * 4)];

        await new Promise(resolve =>
            this.snowflakeImageListener = this.snowflakeImage.addEventListener('load', () => {
                this.snowflakeImage.removeEventListener('load', this.snowflakeImageListener);
                resolve();
            }));

        return super.appear([
            {
                figureType: 'image',
                params: [
                    this.location.x, this.location.y,
                    this.size.width, this.size.height,
                ],
                image: this.snowflakeImage,
            }
        ]);
    }
}