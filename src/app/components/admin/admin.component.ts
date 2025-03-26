import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { CategoryModel } from '../../models/category.model';
import { SwalService } from '../../services/swal.service';
import { AuthService } from '../../services/auth.service';
import { ProjectModel } from '../../models/project.model';
import { image } from '../../constants';
import { LinkModel } from '../../models/link.model';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  projectModel: ProjectModel = new ProjectModel();
  projects: ProjectModel[] = [];
  linkModel: LinkModel = new LinkModel();

  categories: CategoryModel[] = [];
  mainCategories: CategoryModel[] = [];

  @ViewChild('fileInput') fileInput!: ElementRef;
  selectedImageUrl: string | null = null;

  selectedCategoryId: string | null = null;
  imageUrl: string = "";

  showLinkCard: boolean = false;
  constructor(
    private http: HttpService,
    private auth: AuthService,
    private swal: SwalService
  ) {
    this.imageUrl = image
    this.getAllCategory();
    this.getAllProject();
  }

  getAllCategory() {
    this.http.get<CategoryModel[]>("Categories/GetAll", (res) => {
      this.categories = res;

      // Subcategories'i categories listesine ekle
      this.categories.forEach(category => {
        if (category.subCategories && category.subCategories.length > 0) {
          this.categories.push(...category.subCategories);
        }
      });

      console.log(this.categories);
    });
  }

  getAllProject() {
    this.http.get<ProjectModel[]>("Projects/GetAll", (res) => {
      this.projects = res;
      console.log(this.projects);

    });
  }

  createProject(form: NgForm) {
    const formData: FormData = new FormData();
    if (form.valid) {
      formData.append("title", this.projectModel.title);
      formData.append("description", this.projectModel.description!);
      formData.append("image", this.fileInput.nativeElement.files[0]);
      formData.append("categoryId", this.selectedCategoryId!);

      this.http.post<string>("Projects/Create", formData, (res) => {
        this.swal.callToast(res, "success");
        this.getAllProject();
        this.getAllCategory();
        this.selectedImageUrl = "";
        this.selectedCategoryId = "";
        this.projectModel = new ProjectModel();
      })
    }
  }

  updateProject(project: ProjectModel, categoryId: string) {
    if (this.selectedCategoryId === null || undefined) {
      this.selectedCategoryId = categoryId;
      console.log(this.selectedCategoryId);
    }
    const formData: FormData = new FormData();

    formData.append("id", project.id)
    formData.append("title", project.title);
    formData.append("description", project.description!);
    formData.append("image", this.fileInput.nativeElement.files[0]);
    formData.append("categoryId", this.selectedCategoryId!);

    this.http.post<string>("Projects/Update", formData, (res) => {
      this.swal.callToast(res, "success");
      this.getAllProject();
      this.getAllCategory();
      this.selectedImageUrl = "";
      this.selectedCategoryId = "";
      this.projectModel = new ProjectModel();
    })
  }

  deleteProject(id: string) {
    this.swal.callSwal("Projeyi silmek istiyor musunuz?", "Evet", () => {
      this.http.get<string>(`Projects/Delete?Id=${id}`, (res) => {
        console.log(res);
        this.getAllProject();
        this.getAllCategory();
      });
    })
  }

  createLink(id: string) {
    this.linkModel.projectId = id;
    this.http.post<string>("Links/Create", this.linkModel, (res) => {
      this.swal.callToast(res, "success");
      this.getAllCategory();
      this.getAllProject();
      this.linkModel = new LinkModel();
      this.showLinkCard = false;
    });
  }

  updateLink(link: LinkModel) {
    this.http.post<string>("Links/Update", link, (res) => {
      this.swal.callToast(res, "success");
      this.getAllCategory();
      this.getAllProject();
    })
  }

  deleteLink(id: string) {
    this.swal.callSwal("Linki silmek istiyor musunuz?", "Evet", () => {
      this.http.get<string>(`Links/Delete?Id=${id}`, (res) => {
        console.log(res);
        this.getAllProject();
        this.getAllCategory();
      });
    })
  }

  triggerFileInput() {
    this.fileInput.nativeElement.click();
  }

  setImage(event: any) {
    const file = event.target.files[0];

    if (file) {
      this.projectModel.image = file.name;
      console.log(this.projectModel.image);

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImageUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onCategoryChange(event: any) {
    this.selectedCategoryId = event.target.value;
    console.log("Seçilen Category ID:", this.selectedCategoryId);
  }

  addLinkCard() {
    this.showLinkCard = !this.showLinkCard;
  }
}
