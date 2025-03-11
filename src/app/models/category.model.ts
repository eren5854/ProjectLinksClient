import { ProjectModel } from "./project.model";

export class CategoryModel{
    id:string = "";
    categoryName:string = "";
    description?:string;
    subCategories?:CategoryModel[];
    mainCategoryId?:string;
    appUserId?:string;
    projects?:ProjectModel[];
}