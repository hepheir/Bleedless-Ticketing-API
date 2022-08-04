export default class SeatService {
    private form: SeatForm;
    private selector: SeatSelector;
    private target: number = 1;

    public useForm(form: SeatForm): void {
        this.form = form;
    }

    public useSelector(selector: SeatSelector): void {
        this.selector = selector;
    }

    public setTargets(amount: number): void {
        this.target = amount;
    }

    public run(): void {
        this.form.getSelectableSeats()
            .then(seats => this.selector.select(seats, this.target))
            .then(() => this.form.submit());
    }
}