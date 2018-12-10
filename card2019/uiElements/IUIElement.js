export class IUIElement {
    constructor(location = { x: 0, y: 0 }, size = { width: 0, height: 0 }) {
        this.location = location;
        this.size = size;
    }

    //[{figureType:'', params:[], fill:true/false, delayAfter:Nms}]
    appear(data) {
        //TODO: setTimeout for all data
        this.graphics.render(data);
    }

    render(data) {
        this.graphics.render(data);
    }

    //[{figureType:'', params:[], fill:true/false, delayAfter:Nms}]
    fade(data) {
        //TODO: setTimeout for all data
        this.graphics.render(data);
    }

    register(graphics) {
        this.graphics = graphics;
        this.graphics.register(this);
    }

    dispose() {
        this.graphics.unregister(this);
        this.graphics = null;
    }
}