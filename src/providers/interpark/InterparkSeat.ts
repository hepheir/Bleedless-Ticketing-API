import Seat from "../../core/Seat";

export default class InterparkSeat implements Seat {
    private static readonly seatInfoPattern = /\[(?<type>.+)] ((?<area>.+) )?((?<floor>.+층)-)?((?<row>.+열)-)?(?<number>.+)/;
    private area: string = "";
    private floor: string = "";
    private number: string = "";
    private row: string = "";
    private type: string = "";

    public constructor(
        private readonly stySeat: HTMLImageElement,
        private readonly stySelectSeat: HTMLImageElement
    ) {
        this.parseSeatInfo(stySeat.title);
    }

    private parseSeatInfo(seatInfo: string): void {
        const {area, floor, number, row, type} = seatInfo.match(InterparkSeat.seatInfoPattern).groups;
        this.area = area || "";
        this.floor = floor || "";
        this.number = number || "";
        this.row = row || "";
        this.type = type || "";
    }

    public getArea(): string {
        return this.area;
    }

    public getFloor(): string {
        return this.floor;
    }

    public getNumber(): string {
        return this.number;
    }

    public getRow(): string {
        return this.row;
    }

    public getType(): string {
        return this.type;
    }

    public isSelected(): boolean {
        return !this.stySelectSeat
            .getAttribute('style')
            .includes('display:none');
    }

    public select(): void {
        this.stySeat.click();
    }
}