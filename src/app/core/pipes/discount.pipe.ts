import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'discount'
})
export class DiscountPipe implements PipeTransform {

  transform(price, discount): any {
    return (price - (price * (discount/100))).toFixed(0);
  }

}
