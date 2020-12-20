import {Terminal} from "./Terminal/Terminal";

new Terminal(
    document.getElementById('terminal')!,
    document.getElementById("top")!,
    document.getElementById("bottom")!
).refresh();
