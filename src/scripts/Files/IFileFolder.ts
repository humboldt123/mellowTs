import {Folder} from "./Folder";

export interface IFileFolder {
    name:string
    location:Folder|null
    isDir:boolean
}