javascript: (function () {
    function main() {
        const SEATS_TO_GET = 4;

        const seats = Seat.getAllVisibleSeats();
        const sortedSeats = seats
            .filter(s => s.type == "VIP석")
            .filter(s => 10 <= s.column && s.column <= 26)
            .sort((s1, s2) => s1.weight - s2.weight);

        sortedSeats.slice(0, SEATS_TO_GET).forEach(s => s.node.click());
        Seat.doneSelect();
    }

    const ifrmSeat = document.querySelector('#ifrmSeat');
    const ifrmSeatView = ifrmSeat.contentDocument.querySelector('#ifrmSeatView');
    const ifrmSeatDetail = ifrmSeat.contentDocument.querySelector('#ifrmSeatDetail');
    const doneBtn = ifrmSeat.contentDocument.querySelector('#NextStepImage');

    class Seat {
        constructor(stySeat) {
            const [ rawSeatType, seatId ] = stySeat.title.trim().split(' ');
            const seatType = rawSeatType.slice(1,-1);

            this.node = stySeat;
            this.id = seatId; /* 좌석 정보 */

            this.type = seatType; /* 석 */
            this.floor = Number(this.id.match(/[0-9]+층/)[0].replace('층', ''));
            this.row = Number(this.id.match(/[0-9]+열/)[0].replace('열', ''));
            this.column = Number(this.id.match(/[0-9]+$/));
        }

        get weight() {
            const WIDTH = 35;
            const HEIGHT = 10;
            const CENTER = 17;
            /* 층 >> 중앙블록 >= 열 순으로 */
            return this.floor*WIDTH*HEIGHT + (Math.abs(CENTER-this.column)/WIDTH) + this.row
        }

        static getAllVisibleSeats() {
            const seats = ifrmSeatDetail.contentDocument.querySelectorAll('.stySeat');
            return Array.from(seats).map(seat => {
                var [ seatType, seatId ] = seat.title.trim().split(' ');
                seatType = seatType.slice(1,-1);
                return new Seat(seat, seatType, seatId);
            });
        }

        static doneSelect() {
            doneBtn.click();
        }
    }


    ifrmSeatDetail.onload = main;
    try {
        main();
    } catch (error) {}
})();
