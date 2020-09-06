import {
  Component,
  ViewChild,
  OnInit,
  OnDestroy,
  Inject,
  Renderer2,
  ChangeDetectorRef,
  AfterViewInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { ConfigService } from 'app/shared/services/config.service';
import { LayoutService } from 'app/shared/services/layout.service';

import { SwiperDirective, SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { ApiServiceService } from 'app/api-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/internal/operators/finalize';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent implements OnInit, OnDestroy, AfterViewInit {
  public config: any = {};
  layoutSub: Subscription;
  readonly: Boolean = false;
  supplierForm: FormGroup;
  Supplier_Name: String;
  supplierFormSubmitted = false;

  public swipeConfig: SwiperConfigInterface = {
    slidesPerView: 'auto',
    centeredSlides: false,
    spaceBetween: 15,
  };

  @ViewChild(SwiperDirective, { static: false }) directiveRef?: SwiperDirective;

  constructor(
    private configService: ConfigService,
    private layoutService: LayoutService,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    private api: ApiServiceService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
  ) {
    this.config = this.configService.templateConf;
  }

  ngOnInit() {
    this.layoutSub = this.configService.templateConf$.subscribe(
      (templateConf) => {
        if (templateConf) {
          this.config = templateConf;
        }
        this.cdr.markForCheck();
      }
    );
    const numRegex = /^((\+|-)?([0-9]+)(\.[0-9]+)?)|((\+|-)?\.?[0-9]+)$/;

    this.supplierForm = this.formBuilder.group({
      product_name: ['', Validators.required],
      description: ['', Validators.required],
      specifications: ['', Validators.required],
      color: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern(numRegex)]],
      aqty: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      attachment: ['', Validators.required],
      // supID: ['', Validators.pattern(nicregex)],
      // supBusinessInfo: [''],
    });
  }

  get sf() {
    return this.supplierForm.controls;
  }

  ngAfterViewInit() {
    const conf = this.config;
    conf.layout.sidebar.collapsed = true;
    this.configService.applyTemplateConfigChange({ layout: conf.layout });
  }

  ngOnDestroy() {
    const conf = this.config;
    conf.layout.sidebar.collapsed = false;
    this.configService.applyTemplateConfigChange({ layout: conf.layout });
    if (this.layoutSub) {
      this.layoutSub.unsubscribe();
    }
  }

  resetProductForm() {
    this.supplierForm.setValue({
      product_name: '',
      description: '',
      specifications: '',
      color: '',
      price: '',
      aqty: '',
      attachment: '',
    });
  }

  submitProduct() {
    this.spinner.show(undefined, {
      type: 'ball-triangle-path',
      size: 'medium',
      bdColor: 'rgba(0, 0, 0, 0.8)',
      color: '#fff',
      fullScreen: true
    });
    this.supplierFormSubmitted = true;
    if (this.supplierForm.valid) {
      this.supplierForm.value['price'] = parseFloat(this.supplierForm.value['price']);
      this.supplierForm.value['aqty'] = parseInt(this.supplierForm.value['aqty'], 10);
      this.api
        .submitSuplierProduct(JSON.stringify(this.supplierForm.value))
        .pipe(
          finalize(() => this.spinner.hide())
        )
        .subscribe((data: any) => {
          Swal.fire(
            'Thank you!',
            data.message,
            'success'
          ).then(() => {});
        },
        err => {
          Swal.fire(
            'Warning!',
            'Something went wrong, please try again',
            'error'
          );
          console.log(err.message);
        },
        () => {
          console.log('Done!');
        });
    } else {
      this.spinner.hide();
      return;
    }
  }
}
