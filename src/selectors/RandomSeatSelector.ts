export default class RandomSeatSelector implements SeatSelector {
    select(seats: Seat[], target?: number): void {
        seats.slice(0, target).forEach(seat => seat.select());
    }
}