import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/modeli/product.model';
import { ApiService } from 'src/app/servisi/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {

  product!: Product;

  constructor(private apiservis: ApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.product = this.apiservis.getProduct(this.route.snapshot.params['id']);
  }

  onClick() {
    this.router.navigate(['edit', this.route.snapshot.params['id']], { relativeTo: this.route, queryParamsHandling: 'preserve' });
  }

  onDelete() {


    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.apiservis.deleteProduct(this.route.snapshot.params['id']);
        this.router.navigate(['/products']);
        Swal.fire('Deleted!', '', 'success')
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

}
