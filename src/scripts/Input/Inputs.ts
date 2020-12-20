import {IKeysDown} from "./IKeysDown";
import {CommandHandler} from "../Terminal/CommandHandler";
import {Utils} from "../Helpers/Utils";
import {Nano} from "../Command/Commands/Nano";

export class Inputs {
    public keysDown: IKeysDown = {};
    public inputField: string = "";
    public commandHandler:CommandHandler;

    constructor(commandHandler:CommandHandler) {
        this.commandHandler = commandHandler;
    }
    logKeys() {
        onkeydown = onkeyup = (event => this.keysDown[event.key] = event.type === 'keydown');
    }

    manageInput() {
        document.onkeydown = (event => {
            let key: string = event.key.toLowerCase();
            if (this.commandHandler.terminal.inNano && ((this.keysDown["Control"] && key == "x") || this.commandHandler.terminal.nanoPostSave)) {
                if (this.commandHandler.terminal.nanoPostSave) {
                    switch (key) {
                        case "n":
                            this.commandHandler.terminal.nanoPostSave = false;
                            this.commandHandler.terminal.nanoFile = "";
                            this.commandHandler.terminal.inNano = false;
                            this.inputField = "";
                            break;
                        case "y":
                            Nano.handleOutput(this.inputField, this.commandHandler.terminal.nanoFile, this.commandHandler.terminal);
                            this.commandHandler.terminal.nanoPostSave = false;
                            this.commandHandler.terminal.nanoFile = "";
                            this.commandHandler.terminal.inNano = false;
                            this.inputField = "";
                            break;
                        default:
                    }
                } else this.commandHandler.terminal.nanoPostSave = true;
            } else {
                if (key.length > 1) switch (key) {
                    case "backspace":
                        this.inputField = this.inputField.slice(0, -1);
                        break;
                    case "enter":
                        if (!this.commandHandler.terminal.inNano) {
                            this.commandHandler.terminal.blink.status = "";
                            Utils.echo(this.commandHandler.terminal.getNormalLine(), this.commandHandler.terminal)

                            this.commandHandler.handle(this.inputField);
                            // In the case of the command putting us in NANO mode we don't want to overwrite what we
                            // just set. :)
                            if (!this.commandHandler.terminal.inNano)
                                this.inputField = "";
                        } else this.inputField += "\n";
                        break;
                } else this.inputField += this.keysDown["Shift"] ? key.toUpperCase() : key;
            }
        });
    }
}