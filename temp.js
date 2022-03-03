javascript: (function () {
    ifrmSeat = document.querySelector('#ifrmSeat');
    ifrmSeatView = ifrmSeat.contentDocument.querySelector('#ifrmSeatView');
    ifrmSeatDetail = ifrmSeat.contentDocument.querySelector('#ifrmSeatDetail');

    /* (롯데 콘서트홀) R석이 있는 위치 선택 */
    ifrmSeatView.contentWindow.GetBlockSeatList('', '', 'RGN003');

    function select_near_seats(seats, n_seats) {
        target_column = null;
        target_seats = [];
        for (i = 0; i < seats.length; i++) {
            seat = seats[i];
            if (seat.column == target_column) {
                if (target_seats[target_seats.length-1].row+1 == seat.row) {
                    target_seats.push(seat);
                    if (target_seats.length == n_seats)
                        break;
                    continue;
                }
            }
            target_column = seat.column;
            target_seats = [seat];
        }

        if (target_seats.length == n_seats) {
            target_seats.forEach(seat => seat.node.click());
            ifrmSeat.contentDocument.querySelector('#NextStepImage').click();
        }
    };

    ifrmSeatDetail.onload = () => {
        seats = ifrmSeatDetail.contentDocument.querySelectorAll('.stySeat');
        seats = Array.from(seats).map(seat => {
            return {
                node: seat,
                column: Number(seat.title.match(/[0-9]+열/)[0].replace('열', '')),
                row: Number(seat.title.match(/열-[0-9]+/)[0].replace('열-', '')),
                section: seat.title.match(/[A-Z]구역/)[0].match(/[A-Z]/)[0],
                class: seat.title.match(/\[[A-Z]석\]/)[0].match(/[A-Z]/)[0],
            }
        });

        console.log(seats);

        sorted_seats = seats.filter(seat => (seat.class == 'A' && seat.section == 'R' && seat.column > 5))
            .sort((s1, s2) => (s1.row > s2.row))
            .sort((s1, s2) => (s1.column > s2.column));
        select_near_seats(sorted_seats, 3);

        sorted_seats = seats.filter(seat => (seat.class == 'A' && seat.section == 'R'))
            .sort((s1, s2) => (s1.row > s2.row))
            .sort((s1, s2) => (s1.column > s2.column));
        select_near_seats(sorted_seats, 3);

        sorted_seats = seats.filter(seat => (seat.class == 'A'))
            .sort((s1, s2) => (s1.row > s2.row))
            .sort((s1, s2) => (s1.column > s2.column));
        select_near_seats(sorted_seats, 3);
    }
})();
