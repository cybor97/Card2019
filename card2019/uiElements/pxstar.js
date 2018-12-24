class PXStar extends IUIElement {

    appear() {
        const offsetCoef = 0.1;


        let width = this.size.width, height = this.size.height;
        let partWidth = width / 3, partHeight = height / 3,
            x = this.location.x, y = this.location.y;
        let widthOffset = partWidth * offsetCoef, heightOffset = partHeight * offsetCoef;

        super.appear([
            {
                'figureType': 'rectangle',
                'params': [x + widthOffset, y + heightOffset, partWidth, partHeight],
                'fill': '#ff0',
                'stroke': '#0f0'
            },
            {
                'params': [x + width - partWidth - widthOffset, y + heightOffset, partWidth, partHeight],
                'stroke': '#ff0'
            },
            {
                'params': [x + widthOffset, y + height - partHeight - heightOffset, partWidth, partHeight],
                'stroke': '#0f0'
            },
            {
                'params': [x + width - partWidth - widthOffset, y + height - partHeight - heightOffset, partWidth, partHeight],
                'stroke': '#ff0'
            },
            {
                'params': [x + width / 2 - partWidth / 2, y + height / 2 - partHeight / 2, partWidth + widthOffset, partHeight + heightOffset],
                'stroke': '#f00'
            }
        ]);
    }

    render() {
        super.render([

        ]);
    }

    fade() {
        super.fade([

        ]);
    }
}