export default class SeatService {
    private form: SeatForm = null;
    private selector: SeatSelector = null;

    public useForm(form: SeatForm): void {
        this.form = form;
    }

    public useSelector(selector: SeatSelector): void {
        this.selector = selector;
    }

    public run(): void {
        this.onWillRun();
        this.onRun();
    }

    private onWillRun(): void {
        this.checkForm();
        this.checkSelector();
    }

    private checkForm(): void {
        if (this.form === null) {
            throw new Error('Form is required.');
        }
    }

    private checkSelector(): void {
        if (this.selector === null) {
            throw new Error('Selector is required.');
        }
    }

    private onRun(): void {
        this.reserveSeats();
    }

    private reserveSeats(): void {
        Promise.resolve(this.form.getAvailableSeats())
            .then(this.selector.select)
            .then(this.form.select)
            .then(this.form.submit);
    }
}