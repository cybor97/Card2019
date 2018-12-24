class IUIElement {
    constructor(location = { x: 0, y: 0 }, size = { width: 0, height: 0 }) {
        this.location = location;
        this.size = size;
    }

    //[{figureType:'', params:[], fill:true/false, delayAfter:Nms}]
    appear(data) {
        let lastFigure, lastFill, lastStroke;
        console.log('Appear data: ', data);

        return Promise.all(data.map(c =>
            new Promise(resolve => {
                if (!c.figureType) {
                    c.figureType = lastFigure;
                }
                if (!c.fill) {
                    c.fill = lastFill;
                }
                if (!c.stroke) {
                    c.lastStroke = lastStroke;
                }
                lastFigure = c.figureType;
                lastFill = c.fill;
                lastStroke = c.stroke;

                this.graphics.render(c, this);
                resolve()
            })
        ));
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