import {Terminal} from "../Terminal/Terminal";
import {CommandHandler} from "../Terminal/CommandHandler";
import {ICommand} from "./ICommand";

export class Command implements ICommand {
    constructor(terminal: Terminal) {
        this.terminal = terminal;
    }

    // @ts-ignore
    do(args: string[]) {

    }

    static register(c: ICommand[], b: CommandHandler) {
        c.forEach(it => b.commands.push(it));
    }


    terminal: Terminal;
    identifier: string;
    description: string;
    aliases: string[] = [];
}