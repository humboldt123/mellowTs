import {Command} from "../Command";
import {Utils} from "../../Helpers/Utils";
import {FileManager} from "../../Files/FileManager";

export class MakeDirectory extends Command {
    public static identifier = "mkdir";
    public static description = "Creates directories with the specified names.";
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
                Utils.echo(Utils.colorFormat(Utils.sanitize("\\033[1;31mInvalid directory name.")), this.terminal);
                break;
            default:
                if (!this.terminal.currentDirectory.getFolderByName(args[0])) {
                    FileManager.createFolder(args[0], this.terminal.currentDirectory);
                } else Utils.echo(Utils.colorFormat(Utils.sanitize("\\033[1;31mDirectory already exists.")), this.terminal);
        }
    }
}