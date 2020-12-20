import {Command} from "../Command";
import {Utils} from "../../Helpers/Utils";
import {Terminal} from "../../Terminal/Terminal";
import {FileManager} from "../../Files/FileManager";

export class Nano extends Command {
    public static identifier = "nano";
    public static description = "Text editor.";
    public static aliases = [];

    do(args: string[]) {
        if (this.terminal.currentDirectory == null) this.terminal.currentDirectory = this.terminal.root;
        switch (args[0]) {
            case null:
            case undefined:
                Utils.echo(Utils.colorFormat(Utils.sanitize("\\033[1;31mMissing operand.")), this.terminal);
                break;
            case ".":
            case "..":
            case "/":
            case "\\":
                Utils.echo(Utils.colorFormat(Utils.sanitize("\\033[1;31mInvalid file name.")), this.terminal);
                break;
            default:
                this.terminal.nanoPostSave = false;
                this.terminal.inNano = true;
                this.terminal.nanoFile = args[0];

                this.terminal.inputManager.inputField = this.terminal.currentDirectory.getFileByName(args[0])?.getContent() || "";
        }


    }

    static handleOutput(input: string, file: string, terminal: Terminal) {
        if (terminal.currentDirectory == null) terminal.currentDirectory = terminal.root;
        if (terminal.currentDirectory?.getFileByName(file) == null) {
            FileManager.createFile(file, terminal.currentDirectory, input);
        } else terminal.currentDirectory?.getFileByName(file)?.setContent(input);
    }
}