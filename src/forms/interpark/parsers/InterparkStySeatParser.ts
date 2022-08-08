import SeatBuilder from "../../../core/SeatBuilder";

export default class InterparkStySeatParser {
    private static readonly seatInfoPattern: RegExp = /\[(?<type>.+)] ((?<area>.+) )?((?<floor>.+층)-)?((?<row>.+열)-)?(?<number>.+)/;
    private static readonly seatIdPattern: RegExp = /SelectSeat.*\('(?<stySelectSeatId>SID\d+)'.+/;
    private readonly builder: SeatBuilder;
    private readonly stySeat: StySeat;

    public static parse(stySeat: StySeat): Seat {
        return new InterparkStySeatParser(stySeat).parse();
    }

    private constructor(stySeat: StySeat) {
        this.stySeat = stySeat;
        this.builder = new SeatBuilder();
    }

    private parse(): Seat {
        this.buildStySeatInfo();
        this.buildStySeatInteractions();
        return this.builder.build();
    }

    private buildStySeatInfo(): void {
        const {groups} = this.stySeat.title.match(InterparkStySeatParser.seatInfoPattern);
        this.builder
            .setArea(groups.area || "")
            .setFloor(groups.floor || "")
            .setNumber(groups.number || "")
            .setRow(groups.row || "")
            .setType(groups.type || "");
    }

    private buildStySeatInteractions(): void {
        this.builder
            .setIsSelected(this.isSelected)
            .setSelect(this.select);
    }

    private isSelected(): boolean {
        return this.getStySelectSeat().style.display != 'none';
    }

    private getStySelectSeat(): StySelectSeat {
        return this.stySeat
            .parentElement
            .querySelector('#'+this.parseStySelectSeatId());
    }

    private select(): void {
        this.stySeat.click();
    }

    private parseStySelectSeatId(): string {
        return this.stySeat
            .getAttribute('onclick')
            .match(InterparkStySeatParser.seatIdPattern)
            .groups
            .stySelectSeatId;
    }
}