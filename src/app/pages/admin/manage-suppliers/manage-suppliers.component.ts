import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ApiServiceService } from 'app/api-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-suppliers',
  templateUrl: './manage-suppliers.component.html',
  styleUrls: ['./manage-suppliers.component.scss']
})
export class ManageSuppliersComponent implements OnInit, AfterViewInit, OnDestroy {

  suppliers: any[];

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
    this.api.getAllSuppliers()
    .pipe(
      finalize(() => this.spinner.hide())
    )
    .subscribe((res: any) => {
      this.suppliers = res.data;
    },
    err => {
      console.log(err);
    });
  }

  changePendingStatus(supplier, status) {
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
        const tempSupplier = supplier;
        tempSupplier.status = status;
        this.api.changeSupplierStatus(JSON.stringify(tempSupplier))
        .pipe(
          finalize(() => this.spinner.hide())
        )
        .subscribe((res: any) => {
          const index = this.suppliers.indexOf(supplier);
          supplier.status = status;
          this.suppliers[index] = supplier;
          Swal.fire(
            'Successfully approved!',
            'Supplier is listed and visible.',
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
  }
}
