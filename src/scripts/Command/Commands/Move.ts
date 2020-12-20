import {Command} from "../Command";
import {Utils} from "../../Helpers/Utils";
import {FileManager} from "../../Files/FileManager";

export class Move extends Command {
    public static identifier = "mv";
    public static description = "Move a file or directory"
    public static aliases = [];
    do(args:string[]) {
        this.terminal.currentDirectory = this.terminal.currentDirectory || this.terminal.root;
        if (args[0]) {
            if (args[0] == "-r") {
                if (args[1] && args[2]) {
                    if (FileManager.moveFile(this.terminal.currentDirectory.toString() + "/" + args[1], this.terminal.currentDirectory.toString() + "/" + args[2], true, this.terminal.root)) {
                        Utils.echo(Utils.colorFormat(Utils.sanitize("\\033[1;31mFile does not exist or is invalid.")), this.terminal);
                    }
                } else {
                    Utils.echo(Utils.colorFormat(Utils.sanitize("\\033[1;31mMissing operand.")), this.terminal);
                }
            } else {
                if (args[1]) {
                    if (FileManager.moveFile(this.terminal.currentDirectory.toString() + "/" + args[0], this.terminal.currentDirectory.toString() + "/" + args[1], false, this.terminal.root)) {
                        Utils.echo(Utils.colorFormat(Utils.sanitize("\\033[1;31mFile does not exist or is invalid.")), this.terminal);
                    }
                } else {
                    Utils.echo(Utils.colorFormat(Utils.sanitize("\\033[1;31mMissing operand.")), this.terminal);
                }
            }
        }
    }
}