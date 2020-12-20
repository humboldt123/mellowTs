import {Command} from "../Command";
import {Utils} from "../../Helpers/Utils";

export class PrintWorkingDirectory extends Command {
    public static identifier = "pwd";
    public static description = "Print name of current/working directory."
    public static aliases = [];

    do(_args:string[]) {

        Utils.echo(Utils.sanitize((this.terminal.currentDirectory || "/").toString()), this.terminal);
    }
}