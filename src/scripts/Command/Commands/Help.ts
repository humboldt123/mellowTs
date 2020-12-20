import {Command} from "../Command";
import {Utils} from "../../Helpers/Utils";

export class Help extends Command {
    public static identifier = "help";
    public static description = "Display information about builtin commands."
    public static aliases = ["man"];
    do(_args:string[]) {
        // Using "this.terminal.inputManager.commandHandler" is a hack but it works
        Utils.echo(Utils.sanitize("List of available commands:\n\n" + this.terminal.inputManager.commandHandler.commands.map(n => `${n.identifier} - ${n.description}`).join("\n")), this.terminal);
    }
}