export default class SimpleSeatSelector implements SeatSelector {
    private readonly target = 1;

    select(seats: Seat[]): Seat[] {
        return seats.slice(0, this.target);
    }
}