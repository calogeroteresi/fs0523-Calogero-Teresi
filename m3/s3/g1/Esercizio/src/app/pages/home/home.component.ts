import { Component } from '@angular/core';
import { ProductService } from '../../product.service';
import { IProduct } from '../../iproduct';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  products:IProduct[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit() {
     this.productService.getAllProducts().subscribe({
      next: (data: any) => {
        this.products = data.products;
        console.log(this.products);
      },
      error: (error) => {
        console.error('Si è verificato un errore:', error);

      }
    });
  }

}
