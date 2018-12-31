class HQTree extends IUIElement {
    async appear() {
        this.treeImage = new Image();
        this.treeImage.src = './assets/img/tree.png';

        await new Promise(resolve =>
            this.treeImageListener = this.treeImage.addEventListener('load', () => {
                this.treeImage.removeEventListener('load', this.treeImageListener);
                resolve();
            }));

        return super.appear([
            {
                figureType: 'image',
                params: [
                    this.treeImage,
                    this.location.x, this.location.y,
                    this.size.width, this.size.height
                ],
            }
        ]);
    }
}