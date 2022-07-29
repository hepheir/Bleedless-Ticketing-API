import InterparkSeat from "./InterparkSeat";
import Seat from "../../core/Seat";
import * as jsdom from "jsdom";

function createSeat(): Seat {
    return {
        getType: () => "1루 일반석",
        getFloor: () => "",
        getArea: () => "201블럭",
        getRow: () => "C열",
        getNumber: () => "2",
        isSelected: () => false,
        select: () => null,
    }
}

function createDocument(): Document {
    return new jsdom.JSDOM().window.document;
}

function createStySeatNode(seat: Seat): HTMLImageElement {
    const document = createDocument();
    const node = document.createElement('img');
    node.setAttribute("src", "//ticketimage.interpark.com/TMGSNAS/TMGS/G/59_90.gif");
    node.setAttribute("class", "stySeat");
    node.setAttribute("style", "left:69;top:363");
    node.setAttribute("title", `[${seat.getType()}] ${seat.getArea()} ${seat.getRow()}-${seat.getNumber()}`);
    node.setAttribute("onclick", `SelectSeatKBO('SID0','59','','${seat.getArea()} ${seat.getRow()}','${seat.getNumber()}','547')`);
    return node;
}

function createStySelectSeatNode(seat: Seat): HTMLImageElement {
    const document = createDocument();
    const node = document.createElement('img');
    node.setAttribute("src", "//ticketimage.interpark.com/TMGSNAS/TMGS/S/S_90.gif");
    node.setAttribute("id", "SID0");
    node.setAttribute("class", "stySelectSeat");
    node.setAttribute("style", "left:69;top:363; display:none;");
    node.setAttribute("onclick", `SelectSeatKBO('SID0','59','','${seat.getArea()} ${seat.getRow()}','${seat.getNumber()}','547')`);
    node.setAttribute("seatinfo", `${seat.getArea()} ${seat.getRow()}-${seat.getNumber()}`);
    node.setAttribute("ri", "2");
    node.setAttribute("ci", "1");
    node.setAttribute("sa", "0");
    node.setAttribute("rg", "547_2");
    node.setAttribute("sn", "2");
    node.setAttribute("value", "N");
    return node;
}

test('test constructing InterparkSeat via new keyword', () => {
    const sampleSeat = createSeat();
    const seat = new InterparkSeat(createStySeatNode(sampleSeat), createStySelectSeatNode(sampleSeat));
    expect(seat.getType()).toBe(sampleSeat.getType());
    expect(seat.getFloor()).toBe(sampleSeat.getFloor());
    expect(seat.getArea()).toBe(sampleSeat.getArea());
    expect(seat.getRow()).toBe(sampleSeat.getRow());
    expect(seat.getNumber()).toBe(sampleSeat.getNumber());
})