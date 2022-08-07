interface IfrmSeat extends HTMLIFrameElement {
}

interface IfrmSeatDetail extends HTMLIFrameElement {
}

interface StySeat extends HTMLImageElement {
    src: string;
    className: "stySeat";
    style: CSSStyleDeclaration;
    title: string;
    onclick: (this: GlobalEventHandlers, ev: MouseEvent) => any;
}

interface StySelectSeat extends HTMLImageElement {
    src: string;
    id: string;
    className: "stySelectSeat";
    style: CSSStyleDeclaration;
    alt: string;
    title: string;
    onclick: (this: GlobalEventHandlers, ev: MouseEvent) => any;
    seatinfo: string;
    ri: string;
    ci: string;
    sa: string;
    rg: string;
    sn: string;
    value: string;
}