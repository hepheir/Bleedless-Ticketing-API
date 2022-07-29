export default interface Seat {
    getArea(): string;
    getFloor(): string;
    getNumber(): string;
    getRow(): string;
    getType(): string;
    isSelected(): boolean;
    select(): void;
}