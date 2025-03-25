import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { CategoryModel } from '../../models/category.model';
import { SwalService } from '../../services/swal.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  categoryModel: CategoryModel = new CategoryModel();
  categories: CategoryModel[] = [];

  categoryModal:boolean = false;

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

  createCategory(){
    this.http.post<string>("Categories/Create", this.categoryModel, (res) => {
      console.log(res);
      this.swal.callToast(res, "success");
    });
  }
}
