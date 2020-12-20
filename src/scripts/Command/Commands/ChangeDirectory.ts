import {Command} from "../Command";
import {FileManager} from "../../Files/FileManager";

export class ChangeDirectory extends Command {
    public static identifier = "cd";
    public static description = " Change the working directory."
    public static aliases = [];
    do(args:string[]) {
        if (this.terminal.currentDirectory == null) this.terminal.currentDirectory = this.terminal.root;
        let directoryAsPathname = this.terminal.currentDirectory.toString().split("/");
        args.join(" ").split("/").forEach(it => {
            switch (it) {
                case ".":
                    break;
                case "..":
                    directoryAsPathname.splice(directoryAsPathname.length - 1, 1);
                    break;
                default:
                    directoryAsPathname.push(it);
            }
        });
        this.terminal.currentDirectory = FileManager.getFolderByPath(directoryAsPathname.join("/"), this.terminal.root) || this.terminal.currentDirectory;

    }
}