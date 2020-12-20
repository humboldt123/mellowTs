export class Blink {
    character: string;
    timer: number;
    status: string;

    constructor(character: string, timer: number) {
        this.character = character;
        this.timer = timer;
        this.status = "";
    }

    startBlinking() {
        window.setInterval(() => this.status = this.status == "" ? "█" : "", this.timer);
    }
}