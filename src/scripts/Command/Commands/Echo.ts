import {Command} from "../Command";
import {Utils} from "../../Helpers/Utils";

export class Echo extends Command {
    public static identifier = "echo";
    public static description = "Write arguments to the standard output."
    public static aliases = [];
    do(args:string[]) {
        Utils.echo(Utils.colorFormat(Utils.sanitize(args.join(" "))), this.terminal);
    }
}