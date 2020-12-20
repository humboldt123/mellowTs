import {Command} from "../Command";
import {Utils} from "../../Helpers/Utils";
import {FileManager} from "../../Files/FileManager";

export class Touch extends Command {
    public static identifier = "touch";
    public static description = "Change file timestamps."
    public static aliases = [];
    do(args:string[]) {
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
                if (!FileManager.getFileByPath(this.terminal.currentDirectory + "/" + args[0], this.terminal.root)) {
                    let n:string[] = args[0].split("/");
                    let y:string | undefined = n.pop();
                    FileManager.createFile(y!, FileManager.getFolderByPath(this.terminal.currentDirectory + "/" + n.join("/"), this.terminal.root), "");
                }
        }
    }
}