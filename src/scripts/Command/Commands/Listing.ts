import {Command} from "../Command";
import {Utils} from "../../Helpers/Utils";

export class Listing extends Command {
    public static identifier = "ls";
    public static description = "List directory contents."
    public static aliases = [];
    do(_args:string[]) {
        //todo make this code not ugly
        if (this.terminal.currentDirectory == null) this.terminal.currentDirectory = this.terminal.root;
        let folders: string = "";
        this.terminal.currentDirectory.getChildren().forEach(it => {
            folders += (it.isDir ? "\\033[1;36m" : "\\033[1;31m")+ it.name + " ";
        });
        if (folders != "")
            Utils.echo(Utils.colorFormat(Utils.sanitize(folders)), this.terminal);
    }
}