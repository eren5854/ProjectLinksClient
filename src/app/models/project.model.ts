import { LinkModel } from "./link.model";

export class ProjectModel{
    id:string = "";
    title:string = "";
    listNumber:number = 0;
    image?:any;
    categoryId?:string;
    links?:LinkModel[];
}