import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Product } from '../modeli/product.model';
import { ApiService } from '../servisi/api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ProductsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'brand', 'price']
  products: Product[] = [];
  expandedElement!: Product | null;


  constructor(private apiServis: ApiService) { }

  ngOnInit(): void {
    this.products = this.apiServis.getProducts();
  }

}
