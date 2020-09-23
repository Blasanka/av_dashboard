import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ApiServiceService } from 'app/api-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class AdminProductsComponent implements OnInit, OnDestroy, AfterViewInit {

  products: any[];

  constructor(private api: ApiServiceService,
    private spinner: NgxSpinnerService) { }

  ngAfterViewInit() {
    this.spinner.show(undefined, {
      type: 'ball-triangle-path',
      size: 'medium',
      bdColor: 'rgba(0, 0, 0, 0.8)',
      color: '#fff',
      fullScreen: true
    });
  }

  ngOnInit(): void {
    this.api.getAdminAllProducts()
    .pipe(
      finalize(() => this.spinner.hide())
    )
    .subscribe((res: any) => {
      this.products = res.data;
    },
    err => {
      console.log(err);
    });
  }

  changePendingStatus(product, status) {
    Swal.fire({
      title: 'Do you want to change the status?',
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Yes',
      icon: 'warning',
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.spinner.show('Updating...', {
          type: 'ball-triangle-path',
          size: 'medium',
          bdColor: 'rgba(0, 0, 0, 0.8)',
          color: '#fff',
          fullScreen: true
        });
        // This is to not to update UI until server response
        const tempProduct = product;
        tempProduct.status = status;
        this.api.changeProductStatus(JSON.stringify(tempProduct))
        .pipe(
          finalize(() => this.spinner.hide())
        )
        .subscribe((res: any) => {
          const index = this.products.indexOf(product);
          product.status = status;
          this.products[index] = product;
          Swal.fire(
            'Successfully approved!',
            'Product is listed and visible.',
            'success'
          );
        },
        err => {
          console.log(err);
          Swal.fire(
            'Update failed!',
            'Please, try again.',
            'error'
          );
        });
      }
    });
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
}
