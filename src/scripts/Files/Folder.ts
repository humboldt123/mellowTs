import "./File";
import {IFileFolder} from "./IFileFolder";
import {File} from "./File";

export class Folder implements IFileFolder {
    public readonly name: string;
    public readonly location: Folder | null;
    public readonly isDir: boolean = true;
    private children: IFileFolder[] = [];

    public constructor(name: string, location: Folder | null) {
        this.name = name;
        this.location = location;
    }

    public getChildren() {
        return this.children;
    }

    public getFileByName(name: string): File | null {
        for (let i: number = 0; i < this.children.length; i++) {
            if (this.children[i].name == name && !this.children[i].isDir) {
                return this.children[i] as File;
            }
        }
        return null;
    }

    public getFolderByName(name: string): Folder | null {
        for (let i: number = 0; i < this.children.length; i++) {
            if (this.children[i].name == name && this.children[i].isDir) {
                return this.children[i] as Folder;
            }
        }
        return null;
    }

    public addChild(child: IFileFolder): number {
        for (let i: number = 0; i < this.children.length; i++)
            if (this.children[i].name == child.name) return 1;
        this.children.push(child);
        return 0;
    }

    public indexOf(file: IFileFolder): number {
        return this.children.indexOf(file);
    }

    public remove(index: number) {
        return this.children.splice(index, 1)[0];
    }

    public toString(): string {
        let folderNames: string[] = [];
        let location: Folder | null | undefined = this.location;
        folderNames.push(this.name);
        if (this.location) while (true) {
            folderNames.unshift(location!.name);
            if (location!.location == null)
                break;
            else location = location!.location;
        }
        return folderNames.length == 1 ? "/" : folderNames.join("/");
    }
}