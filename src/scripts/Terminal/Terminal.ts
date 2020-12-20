import {Utils} from "../Helpers/Utils";
import {Blink} from "./Blink";
import {Inputs} from "../Input/Inputs";
import {DisableContextMenu} from "../Input/DisableContextMenu";
import {Folder} from "../Files/Folder";
import {FileManager} from "../Files/FileManager";
import {CommandHandler} from "./CommandHandler";

export class Terminal {
    div: Element;
    top: Element;
    bottom: Element;
    blink: Blink;
    inNano: boolean = false;
    nanoPostSave: boolean = false;
    nanoFile: string = "";
    inputManager: Inputs;
    root: Folder;
    currentDirectory: Folder | null;

    lines: string[] = [];

    user: string = "user";
    system: string = "system";

    constructor(div: Element, top: Element, bottom: Element) {
        this.div = div;
        this.top = top;
        this.bottom = bottom;
        this.root = new Folder("", null);

        // Start the blinking
        this.blink = new Blink("", 500);
        this.blink.startBlinking();

        // Initialize our input manager
        this.inputManager = new Inputs(new CommandHandler(this));
        this.inputManager.logKeys();
        this.inputManager.manageInput();

        // Disable the context menu
        DisableContextMenu.disableContextMenu();

        // Set the document title
        document.title = `${this.user}@${this.system}:~$`;

        // Initialize our filesystem
        this.currentDirectory = this.root;
        this.initializeFilesystem();
    }

    handleDisplay() {
        if (!this.inNano) {
            this.div.innerHTML = this.lines.join("<br>") + (this.lines.length > 0 ? "<br>" : "") + this.getNormalLine() + this.blink.status;
            this.top.innerHTML = "";
            this.bottom.innerHTML = "";
        } else {
            this.top.innerHTML = `<h3 style="background-color: white; color: black">GNU nano 0.1<span style="float:right; margin-right: 50%; background-color: white; color: black">${this.nanoFile}</span></h3>`;
            this.div.innerHTML = Utils.sanitize(this.inputManager.inputField) + this.blink.status;

            this.bottom.innerHTML = (!this.nanoPostSave) ?
                `<div style="position: absolute;bottom: 0;left: 0;">^X Exit</div>` :
                `<div style="position: absolute;bottom: 0;left: 0;"><div>Safe modified buffer? (Answering "No" will DISCARD changes.)</div><br><span style="background-color: white; color: black">Y</span> Yes<br><span style="background-color: #ffffff; color: black">N</span> No</div>`;
        }
    }

    getNormalLine() {
        // Force our current directory to never be null.
        if (this.currentDirectory == null) this.currentDirectory = this.root;

        // Lets make our prompt
        let currentPath = this.currentDirectory.toString();
        let currentPrettyPath = currentPath.replace(`/home/${this.user}`, "");
        let promptHeader: string = Utils.colorFormat(`\\033[1;32m${this.user}@${this.system}\\033[1;37m:\\033[1;36m~${currentPrettyPath}\\033[1;37m$ `);
        return `<span id="prompt-header">${promptHeader}</span>` + Utils.sanitize(this.inputManager.inputField);
    }

    initializeFilesystem() {
        // Set up the root folder
        [
            "bin", "bin", "boot", "dev", "etc", "home", "lib",
            "media", "mnt", "opt", "proc", "run", "sbin",
            "srv", "sys", "tmp", "usr", "var"
        ].forEach(folder => FileManager.createFolder(folder, this.root));

        // Make the users folder
        FileManager.createFolder(this.user, FileManager.getFolderByPath("home", this.root));


        // Set up a current directory
        this.currentDirectory = FileManager.getFolderByPath(`home/${this.user}`, this.root);
        if (this.currentDirectory == null) this.currentDirectory = this.root;
    }

    refresh() {
        window.setInterval(() => this.handleDisplay(), 1);
    }
}