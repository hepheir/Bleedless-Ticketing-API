interface Seat {
    /**
     * 좌석의 구역.
     * 예) A구역, B구역, 스탠딩 라 구역, ...
     */
    getArea(): string;

    /**
     * 좌석이 위치한 층.
     */
    getFloor(): string;

    /**
     * 좌석 번호.
     */
    getNumber(): string;

    /**
     * 좌석이 위치한 열.
     */
    getRow(): string;

    /**
     * 좌석의 종류.
     * 예) VIP석, 좌측1루석, R석, 전석, ...
     */
    getType(): string;

    /**
     * 좌석을 선택한다.
     */
    select(): Promise<void>;
}

interface SeatForm {
    /**
     * 페이지로 부터 선택 가능한 좌석들을 읽어온다.
     */
    getAvailableSeats(): Promise<Seat[]>;

    /**
     * 주어진 좌석들을 선택한다.
     * @param seats 선택할 좌석의 배열.
     */
    select(seats: Seat[]): Promise<void>;

    /**
     * 선택된 좌석들을 제출한다.
     * 일반적으로 결제 페이지로 넘어간다.
     */
    submit(): void;
}

interface SeatSelector {
    /**
     * 주어진 좌석들 중, 선택하고자 하는 좌석을 선별한다.
     * @param seats 선택할 수 있는 좌석의 배열.
     * @returns 선택된 좌석의 배열.
     */
    select(seats: Seat[]): Seat[];
}

interface Theater {
    calcDistFromStage(seat: Seat): number;
}