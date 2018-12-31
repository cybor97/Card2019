/*
 ####
######
######
 ####
*/
class PXSnowflake extends IUIElement {
    appear() {
        let parts = [];
        let width = this.size.width, height = this.size.height;
        let partWidth = ~~(width / 6), partHeight = ~~(height / 4),
            x = this.location.x, y = this.location.y;

        for (let yOffset = 0; yOffset < 4; yOffset++)
            for (let xOffset = 0; xOffset < 6; xOffset++)
                if (yOffset > 0 && yOffset < 3 || xOffset > 0 && xOffset < 5) {
                    let cX = x + xOffset * partWidth, cY = y + yOffset * partHeight;
                    parts.push((parts.length === 0)
                        ? {
                            figureType: 'rectangle',
                            fill: 'white',
                            params: [cX, cY, partWidth, partHeight],
                        }
                        : {
                            params: [cX, cY, partWidth, partHeight]
                        });
                }

        return super.appear(parts);
    }
}