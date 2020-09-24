import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ApiServiceService } from 'app/api-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss']
})
export class ManageProductComponent implements OnInit, OnDestroy, AfterViewInit {

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
    this.api.getSuplierAllProducts()
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

  deleteProduct(product) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success mx-1',
        cancelButton: 'btn btn-danger mx-1'
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.spinner.show('Deleting...', {
          type: 'ball-triangle-path',
          size: 'medium',
          bdColor: 'rgba(0, 0, 0, 0.8)',
          color: '#fff',
          fullScreen: true
        });
        this.api.deleteProduct(product.id)
        .pipe(
          finalize(() => this.spinner.hide())
        )
        .subscribe((res: any) => {
          const index = this.products.indexOf(product);
          if (index > -1) {
            this.products.splice(index, 1);
          }
          Swal.fire(
            'Successfully deleted!',
            `Your Product ${product.product_name} is deleted.`,
            'success'
          );
        },
        err => {
          console.log(err);
          Swal.fire(
            'Delete failed!',
            'Please, try again.',
            'error'
          );
        });
      }
    });
  }

  ngOnDestroy(): void {
  }
}
