export function isSeat(seatLike: Object): seatLike is Seat {
    try {
        validateSeat(seatLike);
        return true;
    } catch (e) {
        return false;
    }
}

function validateSeat(seatLike: Object): void {
    const properties = [
        'getArea',
        'getFloor',
        'getNumber',
        'getRow',
        'getType',
        'isSelected',
        'select',
    ];
    for (const property of properties) {
        checkHasProperty(seatLike, property);
    }
}

function checkHasProperty(object: Object, property: string): void {
    if (!object.hasOwnProperty(property))
        throw new TypeError();
}