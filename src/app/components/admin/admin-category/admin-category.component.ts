import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CategoryModel } from '../../../models/category.model';
import { HttpService } from '../../../services/http.service';
import { SwalService } from '../../../services/swal.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-admin-category',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-category.component.html',
  styleUrl: './admin-category.component.css'
})
export class AdminCategoryComponent {

  categoryModel: CategoryModel = new CategoryModel();
  categories: CategoryModel[] = [];

  addCardDiv = false;

  selectedCategoryId: string | null = null;

  constructor(
    private http: HttpService,
    private swal: SwalService,
    public auth: AuthService
  ){
    this.getAllCategory();
  }

  getAllCategory(){
    this.http.get<CategoryModel[]>("Categories/GetAll", (res) => {
      this.categories = res;
      console.log(this.categories);
      
    });
  }

  createCategory(form:NgForm){
    this.categoryModel.appUserId = this.auth.user.id;
    this.categoryModel.mainCategoryId = this.selectedCategoryId!;
    if(form.valid){
      this.http.post<string>("Categories/Create", this.categoryModel, (res) => {
        console.log(res);
        this.swal.callToast(res, "success");
        this.categoryModel = new CategoryModel();
        this.addCardDiv = false;
        this.getAllCategory();
      });
    }
  }

  updateCategory(form:NgForm, category:CategoryModel){
    category.mainCategoryId = this.selectedCategoryId || undefined;
    console.log(category.mainCategoryId);
    if(form.valid){
      this.http.post<string>("Categories/Update", category, (res) => {
        console.log(res);
        this.swal.callToast(res, "success");
        this.getAllCategory();
      });
    }
    this.selectedCategoryId = "";
  }

  // updateCategory(form:NgForm, subCategory:CategoryModel){
  //   subCategory.mainCategoryId = this.selectedCategoryId!;
  //   console.log(subCategory.mainCategoryId);
    
  //   if(form.valid){
  //     this.http.post<string>("Categories/Update", subCategory, (res) => {
  //       console.log(res);
  //       this.swal.callToast(res, "success");
  //       this.getAllCategory();
  //     });
  //   }
  //   this.selectedCategoryId = "";
  // }

  deleteCategory(id:string){
    this.swal.callSwal( "Seçilen kategori silinsin mi?", "Evet", ()=> {
      this.http.get<string>(`Categories/Delete?Id=${id}`, (res) => {
        console.log(res);
        this.getAllCategory();
      })
    })
  }

  onCategoryChange(event: any) {
    this.selectedCategoryId = event.target.value;
    console.log("Seçilen Category ID:", this.selectedCategoryId);
  }

  addCard() {
    this.addCardDiv = !this.addCardDiv;
  }
}
