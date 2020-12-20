import {Folder} from "./Folder";
import {File} from "./File";
import {IFileFolder} from "./IFileFolder";

export class FileManager {
    public static moveFileObject(file: File | Folder | null, destination: Folder | null): number {
        if (file == null) {
            console.log("File is wrong type or null?");
            return 2;
        }
        if (destination == null) {
            console.log("Destination is wrong type or null?");
            return 3;
        }
        let newFile: IFileFolder | undefined = file.location?.remove(file.location?.indexOf(file));
        if (newFile !== undefined) {
            newFile.location = destination;
            return destination.addChild(newFile);
        } else return 1;
    }

    public static renameFileObject(file: IFileFolder | null, name: string) {
        if (file == null) {
            console.log("File is null.");
            return 1;
        }
        file.name = name;
        return 0;
    }

    public static removeFile(file: File|null|undefined) {
        return file?.location?.remove(file.location?.indexOf(file));
    }
    public static removeFolder(folder: Folder|null|undefined) {
        return folder?.location?.remove(folder.location?.indexOf(folder));
    }

    public static   moveFile(file: string, destination: string, isDir: boolean, root: Folder):number {
        let filePaths: string[] = file.split("/");
        let filename: string = filePaths.splice(-1, 1)[0];

        let fileFolder: Folder | null = this.getFolderByPath(filePaths.join("/"), root);
        let destinationFolder: Folder | null = this.getFolderByPath(destination, root);

        if (fileFolder == null || destinationFolder == null) {
            console.log("Invalid path.");
            return 1;
        }
        this.moveFileObject(((isDir) ? fileFolder.getFolderByName(filename) : fileFolder.getFileByName(filename)), destinationFolder);
        return 0;
    }

    public static getFileByPath(path: string, root: Folder) {
        let filePaths: string[] = path.split("/");
        let filename: string = filePaths.splice(-1, 1)[0];

        let fileFolder: Folder | null = this.getFolderByPath(filePaths.join("/"), root);
        if (fileFolder.getFileByName(filename) == null) console.log("Invalid path.");
        return fileFolder.getFileByName(filename);
    }

    public static getFolderByPath(path: string, root: Folder) {
        let currentDirectory: Folder | null | undefined = root;
        path.split("/").forEach(element => {
            switch (element) {
                case "":
                case ".":
                    break;
                case "..":
                    currentDirectory = (currentDirectory?.location == null) ? currentDirectory : currentDirectory.location;
                    break;
                default:
                    currentDirectory = currentDirectory?.getFolderByName(element);
                    break;
            }
        })
        if (currentDirectory == null) console.log("Invalid Path.");
        return currentDirectory;
    }

    public static createFolder(name: string, location: Folder): number {
        return location.addChild(new Folder(name, location));
    }

    public static createFile(name: string, location: Folder, content: string | undefined): number {
        return location.addChild(new File(name, location, content || ""));
    }
}