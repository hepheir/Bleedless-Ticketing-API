import NestedSelectorPath from "../../../util/NestedSelectorPath";

export default class InterparkSubmitButton {
    private static readonly instance: InterparkSubmitButton = new InterparkSubmitButton();
    private readonly selector: NestedSelectorPath<HTMLImageElement> = new NestedSelectorPath('#NextStepImage', '#ifrmSeat');

    public static click(): void {
        InterparkSubmitButton.instance.click();
    }

    private constructor() {}

    private click(): void {
        this.selector.select().click();
    }
}