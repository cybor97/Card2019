class Graphics {
    constructor(canvas) {
        this.context = canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;
        this.uiElements = [];
    }

    //{figureType:'', params:[], fill:fillType, stroke:strokeType}
    //Should be defined at least one of: fill, stroke
    render(block, uiElement) {
        if (this.uiElements.indexOf(uiElement) != -1) {
            if (this.context) {

                //TODO: Implement on-demand
                switch (block.figureType) {
                    case 'rectangle':
                        console.log('Block params: ', block.params);
                        if (block.fill) {
                            this.setFill(block.fill);
                            this.context.fillRect(...block.params);
                        }
                        if (block.stroke) {
                            this.setStroke(block.stroke);
                            this.context.strokeRect(...block.params);
                        }
                        break;
                    case 'clearRect':
                        console.log('Clear rect params: ', block.params);
                        this.context.clearRect(...block.params);
                        break;
                    case '':
                        break;
                }
            }
            else throw new Error('Cannot render block in uninitialized context!');
        }
        else throw new Error('UIElement should be registered to be rendered!');
    }

    clear() {
        this.context.clearRect(0, 0, this.width, this.height);
    }

    setFill(fill) {
        this.context.fillStyle = fill;
    }

    setStroke(stroke) {
        this.context.strokeStyle = stroke;
    }

    register(uiElement) {
        this.uiElements.push(uiElement);
    }

    unregister(uiElement) {
        this.uiElements.splice(this.uiElements.indexOf(uiElement), 1);
    }
}