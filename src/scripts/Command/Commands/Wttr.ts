import {Command} from "../Command";
import {Utils} from "../../Helpers/Utils";

export class Wttr extends Command {
    public static identifier = "wttr";
    public static description = "Tell the weather";
    public static aliases = [];

    do(_args: string[]) {
        fetch("http://wttr.in/?format=2").then(res => res.text()).then(data => {
            Utils.echo(Utils.colorFormat(Utils.sanitize(data)), this.terminal);
        });
    }
}