import InterparkRefreshButton from "./controllers/InterparkRefreshButton";
import InterparkSelectableSeats from "./controllers/InterparkSelectableSeats";
import InterparkStySeatParser from "./parsers/InterparkStySeatParser";
import InterparkSubmitButton from "./controllers/InterparkSubmitButton";

export default class InterparkSeatForm implements SeatForm {
    private cachedSeats: Seat[] = [];

    public constructor() {
        this.cacheSeats();
    }

    public async getAvailableSeats(): Promise<Seat[]> {
        return this.cachedSeats;
    }

    public async refresh(): Promise<void> {
        InterparkRefreshButton.click();
        this.cacheSeats();
    }

    private cacheSeats(): void {
        this.cachedSeats = Array
            .from(InterparkSelectableSeats.getAll())
            .map(InterparkStySeatParser.parse);
    }

    public async select(seats: Seat[]): Promise<void> {
        await Promise.all(seats.map(s => s.select()));
    }

    public async submit(): Promise<void> {
        InterparkSubmitButton.click();
    }
}