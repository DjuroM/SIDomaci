import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../modeli/product.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public productArray: Product[] = [];
  public id: number = 496;
  constructor(private http: HttpClient) { }


  public setProducts() {
    this.fetchProducts().subscribe(
      response => {
        this.productArray.push(...response);
      }
    )
  }

  public addProduct(product: Product) {
    // this.productArray.push(product);
    this.productArray.unshift(product);
    this.id++;
  }

  public updateProduct(id: number, name: string, description: string, price: number) {
    this.productArray.forEach((element, index) => {
      if (element['id'] == id) {
        element['name'] = name;
        element['description'] = description;
        element['price'] = price;

      }
    });
  }

  public deleteProduct(id: number) {
    this.productArray.forEach((element, index) => {
      if (element['id'] == id) {
        this.productArray.splice(index, 1);

      }
    });
  }

  public getProducts(): Product[] {
    return this.productArray;
  }
  public getProduct(id: number): Product {
    for (const product of this.productArray) {
      if (product['id'] == id) return product
    }
    return this.productArray[1];
  }

  private fetchProducts(): Observable<Product[]> {
    return this.http.get<Product[]>('https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline').pipe(
      map(response => {
        const productArr: Product[] = [];
        response.forEach(response => {



          productArr.push({
            id: response['id'], name: response['name'], brand: response['brand']
            , description: response['description'], image_link: response['image_link'], price: response['price']
          });
        });
        return productArr;
      })
    )
  }
}
