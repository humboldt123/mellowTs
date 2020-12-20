import {Command} from "../Command";
import {FileManager} from "../../Files/FileManager";
import {Utils} from "../../Helpers/Utils";

export class Remove extends Command {
    public static identifier = "rm";
    public static description = "Remove file or directory."
    public static aliases = [];
    do(args:string[]) {
        this.terminal.currentDirectory = this.terminal.currentDirectory || this.terminal.root;
        if (args[0]) {
            if (args[0] == "-r") {
                if (args[1]) {
                    if (!FileManager.removeFolder(FileManager.getFolderByPath(this.terminal.currentDirectory.toString() + "/" + args[1], this.terminal.root))) {
                        Utils.echo(Utils.colorFormat(Utils.sanitize("\\033[1;31mFolder does not exist or is invalid.")), this.terminal);
                    }
                } else {
                    Utils.echo(Utils.colorFormat(Utils.sanitize("\\033[1;31mMissing operand.")), this.terminal);
                }
            } else {
                if (!FileManager.removeFile(FileManager.getFileByPath(this.terminal.currentDirectory.toString() + "/" + args[0], this.terminal.root))) {
                    Utils.echo(Utils.colorFormat(Utils.sanitize("\\033[1;31mFile does not exist or is invalid.")), this.terminal);
                }
            }
        }
    }
}