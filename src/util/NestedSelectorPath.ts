export default class NestedSelectorPath<T extends Element> {
    private readonly selectorPath: string;
    private readonly iframeSelectorPaths: string[];

    public constructor(selectorPath: string, ...iframeSelectorPaths: string[]) {
        this.selectorPath = selectorPath;
        this.iframeSelectorPaths = iframeSelectorPaths;
    }

    public select(): T {
        return this.diveIntoIFrames().querySelector(this.selectorPath);
    }

    public selectAll(): NodeListOf<T> {
        return this.diveIntoIFrames().querySelectorAll(this.selectorPath);
    }

    private diveIntoIFrames(): Document {
        let currentDocument = document;
        for (const selector of this.iframeSelectorPaths) {
            currentDocument = currentDocument.querySelector<HTMLIFrameElement>(selector).contentDocument;
        }
        return currentDocument;
    }
}