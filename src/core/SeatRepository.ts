import Seat from "./Seat";

export default interface SeatRepository {
    update(): Promise<any>;
    
    getSeats(): Seat[];
}