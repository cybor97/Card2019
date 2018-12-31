class Graphics {
    constructor(canvas) {
        this.context = canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;
        this.uiElements = [];

        //background re-render
        this.rerenderIntervalId = setInterval(() => {
            for (let uiElement of this.uiElements)
                if (uiElement.rerenderRequested) {
                    Promise.resolve()
                        .then(this.render(
                            {
                                figureType: 'clearRect',
                                params: [uiElement.lastX, uiElement.lastY, uiElement.size.width, uiElement.size.height]
                            }, uiElement)
                        )
                        .then(uiElement.render.call(uiElement, uiElement.figureData))
                        .then(() => uiElement.rerenderRequested = false);
                }
        }, 100);
    }

    //{figureType:'', params:[], fill:fillType, stroke:strokeType}
    //Should be defined at least one of: fill, stroke
    render(block, uiElement) {
        if (this.uiElements.indexOf(uiElement) != -1) {
            if (this.context) {
                switch (block.figureType) {
                    case 'rectangle':
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
                        this.context.clearRect(...block.params);
                        break;
                    case 'image':
                        console.log(...block.params);
                        this.context.drawImage(...block.params);
                        break;
                }
            }
            else throw new Error('Cannot render block in uninitialized context!');
        }
        else throw new Error('UIElement should be registered to be rendered!');
    }

    async clear(force) {
        if (force) {
            while (this.uiElements.length > 0) {
                let element = this.uiElements[0];
                await element.fade();
                element.dispose();
            }
        }
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

    dispose() {
        clearInterval(this.rerenderIntervalId);
    }
}