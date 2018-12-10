import IUIElement from '../uiElements/IUIElement';

class Graphics {
    static uiElements = [];
    static context = null;

    static init(canvas) {
        this.context = canvas.getContext('2D');
    }

    //{figureType:'', params:[], fill:true/false}
    static render(block, uiElement) {
        if (this.uiElements.indexOf(uiElement) != -1) {
            if (this.context) {
                //TODO: Implement
            }
            else throw new Error('Cannot render block in uninitialized context!');
        }
        else throw new Error('UIElement should be registered to be rendered!');
    }

    static register(uiElement) {
        this.uiElements.push(uiElement);
    }

    static unregister(uiElement) {
        this.uiElements.splice(this.uiElements.indexOf(uiElement), 1);
    }
}