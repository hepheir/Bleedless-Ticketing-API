interface Seat {
    getArea(): string;
    getFloor(): string;
    getNumber(): string;
    getRow(): string;
    getType(): string;
    isSelected(): boolean;
    select(): void;
}

interface SeatRepository {
    update(): Promise<any>;
    getSeats(): Seat[];
}

interface SeatSelector {
    select(from: Seat[], target?: number): void;
}

interface Theater {
    calcDistFromStage(seat: Seat): number;
}