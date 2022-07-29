import Seat from "./Seat";

export default interface Theater {
    calcDistFromStage(seat: Seat): number;
}