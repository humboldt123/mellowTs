import {Command} from "../Command";
import {Utils} from "../../Helpers/Utils";

export class Clear extends Command {
    public static identifier = "clear";
    public static description = "Clear the terminal screen."
    public static aliases = ["cls"];
    do(_args:string[]) {
        Utils.clear(this.terminal)
    }
}