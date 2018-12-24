class IUIElement {
    constructor(location = { x: 0, y: 0 }, size = { width: 0, height: 0 }) {
        this.location = location;
        this.size = size;
    }

    //[{figureType:'', params:[], fill:true/false, delayAfter:Nms}]
    appear(data) {
        let i = 0, lastFigure, lastFill, lastStroke;
        console.log('Appear data: ', data);

        return new Promise(resolve => {
            let renderNext = () => {
                if (!data[i].figureType) {
                    data[i].figureType = lastFigure;
                }
                if (!data[i].fill) {
                    data[i].fill = lastFill;
                }
                if (!data[i].stroke) {
                    data[i].lastStroke = lastStroke;
                }
                lastFigure = data[i].figureType;
                lastFill = data[i].fill;
                lastStroke = data[i].stroke;

                this.graphics.render(data[i], this);
                if (++i < data.length)
                    setTimeout(renderNext, 100);
                else resolve();
            };
            renderNext();
        });
    }

    render(data) {
        this.graphics.render(data, this);
    }

    //[{figureType:'', params:[], fill:true/false, delayAfter:Nms}]
    fade(data) {
        //TODO: setTimeout for all data
        this.graphics.render(data, this);
    }

    //Register UIElement to use in Graphics. There's no reason to override
    register(graphics) {
        this.graphics = graphics;
        this.graphics.register(this);
    }

    //Register UIElement to use in Graphics. There's no reason to override
    dispose() {
        this.graphics.unregister(this);
        this.graphics = null;
    }
}