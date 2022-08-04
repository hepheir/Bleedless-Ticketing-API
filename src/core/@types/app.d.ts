interface Seat {
    getArea(): string;
    getFloor(): string;
    getNumber(): string;
    getRow(): string;
    getType(): string;
    isSelected(): boolean;
    select(): void;
}

interface SeatForm {
    getSelectableSeats(): Promise<Seat[]>;
    submit(): void;
}

interface SeatSelector {
    select(from: Seat[], target?: number): Seat[];
}

interface Theater {
    calcDistFromStage(seat: Seat): number;
}