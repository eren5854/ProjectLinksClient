import { Component } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { CategoryModel } from '../../models/category.model';
import { CommonModule } from '@angular/common';
import { image } from '../../constants';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  categories: CategoryModel[] = [];
  mainCategories: CategoryModel[] = [];

  imageUrl: string = "";
  constructor(
    private http: HttpService,
  ) {
    this.imageUrl = image
    this.getAllCategory();
  }

  getAllCategory() {
    this.http.get<CategoryModel[]>("Categories/GetAll", (res) => {
      this.categories = res;
  
      // Sadece ana kategorileri al
      this.mainCategories = res.filter(category => !category.mainCategoryId);
  
      console.log("Ana Kategoriler:", this.mainCategories);
  
      // Subcategories'i categories listesine ekle
      this.categories.forEach(category => {
        if (category.subCategories && category.subCategories.length > 0) {
          this.categories.push(...category.subCategories);
        }
      });
  
      console.log("Tüm Kategoriler:", this.categories);
  
      // Veriler çekildikten sonra initFilter'ı çağır
      setTimeout(() => this.initFilter(), 1000);
    });
  }

  // ngOnInit(): void {
  //   this.initFilter();
  // }

  initFilter(): void {
    let filterItem = document.querySelector('.items-links');
    let filterImages = document.querySelectorAll('.project-img');

    if (!filterItem) return; // Eğer öğe yoksa fonksiyon çalışmasın.

    filterItem.addEventListener('click', (selectedItem: any) => {
      if (selectedItem.target.classList.contains('item-link')) {
        let activeElement = document.querySelector('.menu-active');
        if (activeElement) activeElement.classList.remove('menu-active');

        selectedItem.target.classList.add('menu-active');
        let filterName = selectedItem.target.getAttribute('data-name');

        filterImages.forEach((image: Element) => {
          let imageFilterName = image.getAttribute('data-name');
          if ((imageFilterName === filterName) || filterName === 'all') {
            (image as HTMLElement).style.display = 'block';
          } else {
            (image as HTMLElement).style.display = 'none';
          }
        });
      }
    });
  }
}
