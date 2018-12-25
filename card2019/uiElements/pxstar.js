class PXStar extends IUIElement {

    appear() {
        this.offsetCoef = 0.1;

        let width = this.size.width, height = this.size.height;
        let partWidth = ~~(width / 3), partHeight = ~~(height / 3),
            x = this.location.x, y = this.location.y;

        let widthOffset = ~~(partWidth * this.offsetCoef) || 1,
            heightOffset = ~~(partHeight * this.offsetCoef) || 1;

        return super.appear([
            {
                figureType: 'rectangle',
                params: [x + widthOffset, y + heightOffset, partWidth, partHeight],
                fill: this.background || '#ff0',
                stroke: this.foreground || '#ff0'
            },
            {
                params: [x + width - partWidth - widthOffset, y + heightOffset, partWidth, partHeight],
            },
            {
                params: [x + widthOffset, y + height - partHeight - heightOffset, partWidth, partHeight],
            },
            {
                params: [x + width - partWidth - widthOffset, y + height - partHeight - heightOffset, partWidth, partHeight],
            },
            {
                params: [x + ~~(width / 2) - ~~(partWidth / 2), y + ~~(height / 2) - ~~(partHeight / 2), partWidth + widthOffset, partHeight + heightOffset],
            }
        ]);
    }

    render() {
        if (this.background || this.stroke) {
            for (let figure of this.figureData) {
                figure.fill = this.background;
                figure.stroke = this.foreground;
            }
        }

        return super.render(this.figureData);
    }

    fade() {
        return super.fade(this.figureData);
    }
}