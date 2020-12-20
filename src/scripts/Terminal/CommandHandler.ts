import {Terminal} from "./Terminal";
import {Command} from "../Command/Command";
import {Echo} from "../Command/Commands/Echo";
import {ICommand} from "../Command/ICommand";
import {ChangeDirectory} from "../Command/Commands/ChangeDirectory";
import {Listing} from "../Command/Commands/Listing";
import {PrintWorkingDirectory} from "../Command/Commands/PrintWorkingDirectory";
import {Utils} from "../Helpers/Utils";
import {Help} from "../Command/Commands/Help";
import {Clear} from "../Command/Commands/Clear";
import {MakeDirectory} from "../Command/Commands/MakeDirectory";
import {Nano} from "../Command/Commands/Nano";
import {Touch} from "../Command/Commands/Touch";
import {Remove} from "../Command/Commands/Remove";
import {Move} from "../Command/Commands/Move";
import {Wttr} from "../Command/Commands/Wttr";
import {Cowsay} from "../Command/Commands/Cowsay";

export class CommandHandler {
    terminal: Terminal;
    commands: ICommand[] = [];

    constructor(terminal: Terminal) {
        this.terminal = terminal;
        this.registerCommands();
    }

    handle(input: string) {
        // Todo make command class
        let args: string[] = input.split(" ");
        let command = args.shift();
        let success: boolean = false;
        this.commands.forEach(it => {
            if (it.identifier == command || (!!it.aliases.length && it.aliases.some(it => it == command))) {
                // @ts-ignore:
                // We can't construct an interface so we have it as a class for this.
                new it(this.terminal).do(args);
                success = true;
            }
        });
        if (!success && command !== "")
            Utils.echo(Utils.colorFormat(`\\033[1;31mCommand "${command}" not found!`), this.terminal);
    }

    registerCommands() {
        Command.register([
            Echo,
            ChangeDirectory,
            Listing,
            PrintWorkingDirectory,
            Help,
            Clear,
            MakeDirectory,
            Nano,
            Touch,
            Remove,
            Move,
            Wttr,
            Cowsay
        ], this);
    }
}