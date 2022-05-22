import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Product } from '../modeli/product.model';
import { ApiService } from '../servisi/api.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  singUpForm!: FormGroup;
  URL_REGEXP = /^https:\/*(?:\w+(?::\w+)?@)?[^\s\/]+(?::\d+)?(?:\/[\w#!:,.?+=&%@\-\/]*)?$/;

  constructor(private apiServis: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.singUpForm = new FormGroup({

      'name': new FormControl(null, Validators.required),
      'brand': new FormControl('maybelline', Validators.required),
      'description': new FormControl(null, Validators.required),
      'price': new FormControl(null, Validators.required),
      'image_link': new FormControl(null, [Validators.required, Validators.pattern(this.URL_REGEXP)]),

    });
  }


  onSubmit() {
    if (!this.singUpForm.valid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'It looks like you did not fill out the form!',

      })
    } else {
      const name = this.singUpForm.value['name'];
      const brand = this.singUpForm.value['brand'];
      const description = this.singUpForm.value['description'];
      const price = this.singUpForm.value['price'];
      const image_link = this.singUpForm.value['image_link'];
      const id = this.apiServis.id;
      const product: Product = {
        id: id, name: name, brand: brand, description: description
        , image_link: image_link, price: price
      }

      this.apiServis.addProduct(product);
      this.router.navigate(['/products']);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 4500
      })

    }
  }
}
