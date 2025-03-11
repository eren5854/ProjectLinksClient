import { CategoryModel } from "./category.model";

export class UserModel{
    id?:string;
    userName:string = "";
    email:string = "";
    password:string = "";
    categories?:CategoryModel[];
}