import { Product } from './../../../core/models/product';
import { DataService } from './../../../core/service/data.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  response: any;
  products: Product[];
  finalList: Product[];
  errorMessage: string;
  searchString: string = '';
  categories = [];
  pageLoading: boolean = true;
  filterMenu: FormGroup;
  minPriceContainer = 0;
  maxPriceContainer = 0;
  minPriceSlider = 0;
  maxPriceSlider = 0;

  constructor(private service: DataService, private route: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.service.getProducts().subscribe(
      data => {
        this.response = data;
        this.products = this.response.response;
        this.filterProducts();
        this.generateFilterMenu();
        this.finalList = this.products;
        this.pageLoading = false;
      },
      err => {
        this.response = err;
        this.errorMessage = this.response.error.eror.message;
        this.response = undefined;
        this.pageLoading = false;
      }
    );
  }

  filterProducts() {
    this.products = this.products.filter(product => product.category != "Gift Card");
  }

  generateFilterMenu() {
    let i = 0;
    const cat = new Set();
    let minPrice = this.products[0].price;
    let maxPrice = this.products[0].price;
    for (let product of this.products) {
      cat.add(product.category);
      if (minPrice > product.price) {
        minPrice = product.price;
      } else if (maxPrice < product.price) {
        maxPrice = product.price;
      }
    }
    this.minPriceContainer = minPrice;
    this.maxPriceContainer = maxPrice;
    this.minPriceSlider = minPrice;
    this.maxPriceSlider = maxPrice;
    cat.forEach((category) => {
      this.categories.push({ id: i, name: category })
      i++;
    });
    const categoriesControls = this.categories.map(category => new FormControl(false));
    this.filterMenu = this.fb.group({
      categories: this.fb.array(categoriesControls),
      minPrice: this.fb.control(this.minPriceContainer),
      maxPrice: this.fb.control(this.maxPriceContainer),
    });
  }

  toggleSidenav() {
    let classes = document.getElementById('wrapper').className.split(' ');
    if (classes.indexOf('toggled') != -1) {
      document.getElementById("wrapper").classList.remove('toggled');
    } else {
      document.getElementById("wrapper").classList.add('toggled');
    }
  }

  applyFilters() {
    this.errorMessage = '';
    this.products = [];
    const selectedCategories: [] = this.filterMenu.value.categories
      .map((checked, index) => checked ? this.categories[index].id : null)
      .filter(value => value !== null);
    if (selectedCategories.length == 0) {
      this.products = this.finalList.filter(product => {
        return (product.price >= this.filterMenu.get('minPrice').value && product.price <= this.filterMenu.get('maxPrice').value);
      });
    } else {
      const finalCategories = [];
      selectedCategories.forEach((index) => finalCategories.push(this.categories[index].name));
      this.products = this.finalList.filter(product => {
        return (product.price >= this.filterMenu.get('minPrice').value && product.price <= this.filterMenu.get('maxPrice').value && finalCategories.includes(product.category));
      });
    }
    if (this.products.length == 0) {
      this.errorMessage = 'No Products found with these Filters.';
    }
  }
    // if (selectedCategories.length == 0) {
    //   let minPrice = this.filterMenu.value.minPrice;
    //   if (minPrice == null) {
    //     minPrice = this.minPriceContainer;
    //   }
    //   let maxPrice = this.filterMenu.value.maxPrice;
    //   if (maxPrice == null) {
    //     maxPrice = this.maxPriceContainer;
    //   }
    //   if (minPrice > maxPrice) {
    //     this.filterMenu.value.minPrice = this.minPriceContainer;
    //     this.filterMenu.value.maxPrice = this.maxPriceContainer;
    //     minPrice = 0;
    //     maxPrice = 999999999;
    //   }
    //   this.products = this.finalList.filter(product => {
    //     return product.price >= minPrice && product.price <= maxPrice;
    //   });
    //   if (this.products.length == 0) {
    //     this.errorMessage = 'No Products found with these Filters.'
    //   }
    //   return;
    // }
    // const finalCategories = [];
    // selectedCategories.forEach((index) => finalCategories.push(this.categories[index].name));
    // this.finalList.forEach(product => {
    //   if (finalCategories.includes(product.category)) {
    //     this.products.push(product);
    //   }
    // });
    // let minPrice = this.filterMenu.value.minPrice;
    // if (minPrice == null) {
    //   minPrice = this.minPriceContainer;
    // }
    // let maxPrice = this.filterMenu.value.maxPrice;
    // if (maxPrice == null) {
    //   maxPrice = this.maxPriceContainer;
    // }
    // if (minPrice > maxPrice) {
    //   this.filterMenu.value.minPrice = this.minPriceContainer;
    //   this.filterMenu.value.maxPrice = this.maxPriceContainer;
    //   minPrice = 0;
    //   maxPrice = 999999999;
    // }
    // this.products = this.products.filter(product => {
    //   return product.price >= minPrice && product.price <= maxPrice;
    // });
    // if (this.products.length == 0) {
    //   this.errorMessage = 'No Products found with these Filters.'
    // }
  // }

  redirectToProduct(id) {
    console.log(id);
    this.route.navigate(['/user/product', id]);
  }

  closeModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";

  }
  redirectToGiftCard() {
    if (localStorage.getItem('user') === 'true') {
      this.route.navigate(['/user/payGift']);
    } else {
      var modal = document.getElementById("myModal");
      modal.style.display = "block";
      var btn = document.getElementById("myBtn");
      window.onclick = function (event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }
    }
  }

  redirectToLogin() {
    localStorage.clear();
    document.getElementById("myModal").style.display = "none";
    this.route.navigate(['/profile/login']);
  }

  get categoryFormControls(): FormArray {
    return this.filterMenu.get('categories') as FormArray;
  }

  get minPrice(): FormControl {
    return this.filterMenu.get('minPrice') as FormControl;
  }

  get maxPrice(): FormControl {
    return this.filterMenu.get('maxPrice') as FormControl;
  }

}
