import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ApiServiceService } from 'app/api-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-sub-category',
  templateUrl: './manage-sub-category.component.html',
  styleUrls: ['./manage-sub-category.component.scss']
})
export class ManageSubCategoryComponent implements OnInit, OnDestroy, AfterViewInit {

  subCategories: any[];

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
    this.api.getSubCategories()
    .pipe(
      finalize(() => this.spinner.hide())
    )
    .subscribe((res: any) => {
      this.subCategories = res.data;
    },
    err => {
      console.log(err);
    });
  }

  deleteSubCategory(subCategory) {
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
        this.api.deleteSubCategory(subCategory.id)
        .pipe(
          finalize(() => this.spinner.hide())
        )
        .subscribe((res: any) => {
          const index = this.subCategories.indexOf(subCategory);
          if (index > -1) {
            this.subCategories.splice(index, 1);
          }
          Swal.fire(
            'Successfully deleted!',
            `Sub Category ${subCategory.name} is deleted.`,
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
