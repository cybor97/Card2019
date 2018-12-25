class IUIElement {
    constructor(location = { x: 0, y: 0 }, size = { width: 0, height: 0 }) {
        this.location = location;
        this.size = size;

        this.rerenderRequested = false;
        this.rerenderIntervalId = -1;

        this.figureData = [];

        this.lastX = location.x;
        this.lastY = location.y;
    }

    //[{figureType:'', params:[], fill:true/false, delayAfter:Nms}]
    appear(data) {
        let lastFigure, lastFill, lastStroke;

        data.forEach(c => {
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
        });
        this.figureData = data;

        //background re-render
        this.rerenderIntervalId = setInterval(() => {
            if (this.rerenderRequested) {
                Promise.resolve()
                    .then(this.graphics.render(
                        {
                            figureType: 'clearRect',
                            //FIXME: Remove hardcoded offsets, round params well
                            params: [this.lastX - 1, this.lastY - 1, this.size.width + 2, this.size.height + 2]
                        }, this)
                    )
                    .then(this.render.call(this, this.figureData))
                    .then(() => this.rerenderRequested = false);
            }
        }, 100);

        return this.render(data);
    }

    render(data) {
        for (let figure of data) {
            if (this.location.x != this.lastX) {
                figure.params[0] += this.location.x - this.lastX;
            }
            if (this.location.y != this.lastY) {
                figure.params[1] += this.location.y - this.lastY;
            }
        }

        this.lastX = this.location.x;
        this.lastY = this.location.y;

        return Promise.all(data.map(c => Promise.resolve().then(() => this.graphics.render(c, this))));
    }

    fade(data) {
        //TODO: Review
        clearInterval(this.rerenderIntervalId);
        return this.render(data);
    }

    invalidate() {
        this.rerenderRequested = true;
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