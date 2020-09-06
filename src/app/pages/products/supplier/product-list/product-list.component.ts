import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiServiceService } from 'app/api-service.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, OnDestroy, AfterViewInit {

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

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

}
