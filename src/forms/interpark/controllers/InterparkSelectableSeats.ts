import NestedSelectorPath from "../../../util/NestedSelectorPath";

export default class InterparkSelectableSeats {
    private static readonly instance: InterparkSelectableSeats = new InterparkSelectableSeats();
    private readonly selector: NestedSelectorPath<StySeat> = new NestedSelectorPath('.stySeat', '#ifrmSeat', '#ifrmSeatDetail');

    public static getAll(): NodeListOf<StySeat> {
        return InterparkSelectableSeats.instance.getAll();
    }

    private constructor() {}

    private getAll(): NodeListOf<StySeat> {
        return this.selector.selectAll();
    }
}