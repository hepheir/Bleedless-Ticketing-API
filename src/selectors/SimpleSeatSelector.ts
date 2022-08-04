export default class SimpleSeatSelector implements SeatSelector {
    select(seats: Seat[], target?: number): Seat[] {
        return seats.slice(0, target);
    }
}