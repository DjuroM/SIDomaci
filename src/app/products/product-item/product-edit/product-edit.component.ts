import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/modeli/product.model';
import { ApiService } from 'src/app/servisi/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  updateForm !: FormGroup;
  product!: Product;
  constructor(private route: ActivatedRoute, private apiServis: ApiService,
    private router: Router) { }

  ngOnInit(): void {

    this.product = this.apiServis.getProduct(this.route.snapshot.params['id']);
    this.updateForm = new FormGroup({

      'name': new FormControl(this.product.name, Validators.required),

      'description': new FormControl(this.product.description, Validators.required),
      'price': new FormControl(this.product.price, Validators.required),

    });
  }

  onSubmit() {
    if (!this.updateForm.valid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'It looks like you did not fill out the form!',

      })
    } else {

      Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          Swal.fire('Saved!', '', 'success')
          const name = this.updateForm.value['name'];
          const description = this.updateForm.value['description'];
          const price = this.updateForm.value['price'];

          this.apiServis.updateProduct(this.product.id, name, description, price);
          this.router.navigate(['/products']);
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }
      })
    }
  }


}
