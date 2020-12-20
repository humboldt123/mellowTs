import {IColors} from "./IColors";

export class Color {
    static hexOf:IColors = {
        "red": "#f73e3a",
        "green": "#16c44d",
        "cyan": "#35ffd7",
        "purple": "#9344c6",
        "white": "#ffffff",
        "yellow": "#e4ef50",
        "black": "#000000",
    }
    static mapOf:IColors = {
            "\\033[1;31m": `<span style="color:${Color.hexOf["red"]}">`,
            "\\033[1;32m": `<span style="color:${Color.hexOf["green"]}">`,
            "\\033[1;36m": `<span style="color:${Color.hexOf["cyan"]}">`,
            "\\033[1;35m": `<span style="color:${Color.hexOf["purple"]}">`,
            "\\033[1;37m": `<span style="color:${Color.hexOf["white"]}">`,
            "\\033[1;33m": `<span style="color:${Color.hexOf["yellow"]}">`,
            "\\033[1;30m": `<span style="color:${Color.hexOf["black"]}">`
    }
}