import NestedSelectorPath from "../../../util/NestedSelectorPath";

export default class InterparkRefreshButton {
    private static readonly instance: InterparkRefreshButton = new InterparkRefreshButton();
    private readonly selector: NestedSelectorPath<HTMLAnchorElement> = new NestedSelectorPath('img[alt="좌석 다시 선택"]', '#ifrmSeat');

    public static click(): void {
        InterparkRefreshButton.instance.click();
    }

    private constructor() {}

    private click(): void {
        this.selector.select().click();
    }
}