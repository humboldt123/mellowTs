import {Command} from "../Command";
import {Utils} from "../../Helpers/Utils";

export class Cowsay extends Command {
    public static identifier = "cowsay";
    public static description = "cow. say.";
    public static aliases = [];

    do(args: string[]) {
        let cow:string[] = [
            Utils.sanitize(args.join(" ")),
            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\&nbsp;&nbsp;&nbsp;^__^",
            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\&nbsp;&nbsp;(oo)\\_______",
            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(__)\\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;)\\/\\",
            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;||----w&nbsp;|",
            "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;||&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;||"

        ]
        cow.forEach(n => {
            Utils.echo(Utils.colorFormat(n), this.terminal);
        })

    }
}