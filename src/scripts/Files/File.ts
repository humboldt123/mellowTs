import {IFileFolder} from "./IFileFolder";
import {Folder} from "./Folder";

export class File implements IFileFolder {
    public readonly name: string;
    public readonly location: Folder;
    public readonly isDir: boolean = false;
    private content: string;

    public constructor(name: string, location: Folder, content: string) {
        this.name = name;
        this.location = location;
        this.content = content;
    }

    public getContent() {
        return this.content;
    }

    public setContent(content: string) {
        this.content = content;
    }
}