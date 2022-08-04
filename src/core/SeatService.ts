export default class SeatService {
    private repository: SeatRepository;
    private selector: SeatSelector;
    private target: number = 1;

    public useRepository(repository: SeatRepository): void {
        this.repository = repository;
    }

    public useSelector(selector: SeatSelector): void {
        this.selector = selector;
    }

    public setTargets(amount: number): void {
        this.target = amount;
    }

    public run(): void {
        this.selector.select(this.repository.getSeats(), this.target);
    }
}