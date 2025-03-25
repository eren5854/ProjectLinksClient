import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(){
  }

  ngOnInit(): void {
    this.initFilter();
  }

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
