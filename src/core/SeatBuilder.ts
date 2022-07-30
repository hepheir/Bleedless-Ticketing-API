import Seat from "./Seat";

export default class SeatBuilder {
    private area: string = "";
    private floor: string = "";
    private number: string = "";
    private row: string = "";
    private type: string = "";
    private isSelected?: () => boolean = undefined;
    private select?: () => void = undefined;

    public build(): Seat {
        this.validateProperties();
        return {
            getArea: () => this.area,
            getFloor: () => this.floor,
            getNumber: () => this.number,
            getRow: () => this.row,
            getType: () => this.type,
            isSelected: this.isSelected,
            select: this.select,
        }
    }

    private validateProperties(): void {
        if (this.isSelected === undefined)
            throw new Error('You must set isSelected()');
        if (this.select === undefined)
            throw new Error('You must set select()');
    }

    public setArea(area: string): this {
        this.area = area;
        return this;
    }

    public setFloor(floor: string): this {
        this.floor = floor;
        return this;
    }

    public setNumber(number: string): this {
        this.number = number;
        return this;
    }

    public setRow(row: string): this {
        this.row = row;
        return this;
    }

    public setType(type: string): this {
        this.type = type;
        return this;
    }

    public setIsSelected(isSelected: () => boolean): this {
        this.isSelected = isSelected;
        return this;
    }

    public setSelect(select: () => void): this {
        this.select = select;
        return this;
    }
}