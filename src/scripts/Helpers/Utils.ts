import {Terminal} from "../Terminal/Terminal";
import {Color} from "./Color";

export class Utils {
    static sanitize(input: string): string {
        return input
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/"/g, '&quot;')
            .replace(/\n/g, "<br>");
    }

    static colorFormat(input: string): string {
        let amount:number = 0;
        for (let it in Color.mapOf) {
            amount += (input.match(new RegExp(this.regexSanitize(it), 'g')) || []).length;
            input = input.replace(new RegExp(this.regexSanitize(it), 'g'), Color.mapOf[it]);
        }
        return input + "</span>".repeat(amount);
    }

    static echo(input: string, terminal: Terminal) {
        terminal.lines.push(input);
    }
    static clear(terminal: Terminal) {
        terminal.lines = [];
    }

    static regexSanitize(string: string): string {
        return string.replace(/[*.?^$+{}()|[\]\\]/g, '\\$&');
    }
}