import { Product } from './../models/product';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productFilter'
})
export class ProductFilterPipe implements PipeTransform {

  transform(productList: Product[], searchString: string): any {
    let resultProducts = [];
    for (let product of productList) {
      searchString = searchString.toLowerCase();
      let searchIndex = product.productName.toLowerCase() +
        product.category.toLowerCase() +
        product.vendor.toLowerCase() +
        product.description.toLowerCase();
      if (searchIndex.includes(searchString)) {
        resultProducts.push(product);
      }
    }
    if (resultProducts.length == 0) {
      for (let product of productList) {
        if (searchString.toLowerCase().includes(product.category.toLowerCase()) || searchString.toLowerCase().includes(product.productName.toLowerCase())) {
          resultProducts.push(product);
        }
      }
    }
    return resultProducts;
  }

}
