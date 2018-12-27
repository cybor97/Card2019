// import IUIElement from './IUIElement';

class PXDecorations extends IUIElement {
    appear() {
        return super.appear([
            {
                figureType: 'rectangle',
                params: [this.location.x, this.location.y + (this.size.height - ~~(this.size.height / 10)), this.size.width, ~~(this.size.height / 10)],
                fill: this.background || '#fff',
                stroke: this.foreground || '#fff'
            }])
    }

    // render() {
    //     super.render();
    // }

    // fade() {
    //     super.fade();
    // }
}