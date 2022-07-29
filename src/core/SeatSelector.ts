import Seat from "./Seat";

export default interface SeatSelector {
    selectFrom(seats: Seat[], target?: number): Seat[];
}