
import {
  Component,
  ViewChild,
  OnInit,
  OnDestroy,
  Inject,
  Renderer2,
  ChangeDetectorRef,
  AfterViewInit,
  ElementRef,
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
  selector: 'app-add-sub-category',
  templateUrl: './add-sub-category.component.html',
  styleUrls: ['./add-sub-category.component.scss']
})

export class AddSubCategoryComponent implements OnInit, OnDestroy, AfterViewInit {

  public config: any = {};
  layoutSub: Subscription;
  readonly: Boolean = false;
  categoryForm: FormGroup;
  categoryFormSubmitted = false;
  categories: any[];
  selectedCategoryName = 'Select category';
  selectedCategoryId = 0;

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

    this.categoryForm = this.formBuilder.group({
      name: ['', Validators.required],
      category_id: ['', Validators.required],
    });

    this.spinner.show(undefined, {
      type: 'ball-triangle-path',
      size: 'medium',
      bdColor: 'rgba(0, 0, 0, 0.8)',
      color: '#fff',
      fullScreen: true
    });
    this.api.getCategories()
    .pipe(
      finalize(() => this.spinner.hide())
    )
    .subscribe((res: any) => {
      this.categories = res.data;
    },
    err => {
      console.log(err);
    });
  }

  get sf() {
    return this.categoryForm.controls;
  }

  ngAfterViewInit() {
    const conf = this.config;
    conf.layout.sidebar.collapsed = true;
    this.configService.applyTemplateConfigChange({ layout: conf.layout });
    this.spinner.hide();
  }

  ngOnDestroy() {
    const conf = this.config;
    conf.layout.sidebar.collapsed = false;
    this.configService.applyTemplateConfigChange({ layout: conf.layout });
    if (this.layoutSub) {
      this.layoutSub.unsubscribe();
    }
  }

  changeSelectedCategory(category) {
    this.selectedCategoryName = category.category_name;
    this.selectedCategoryId = category.id;
  }

  resetCategoryForm() {
    this.categoryForm.setValue({
      name: '',
    });
    this.selectedCategoryName = 'Select Category';
  }

  submitCategory() {
    this.categoryFormSubmitted = true;
    this.categoryForm.value['category_id'] = this.selectedCategoryId;
    this.api
          .submitSubCategory(JSON.stringify(this.categoryForm.value))
          .pipe(
            finalize(() => this.spinner.hide())
          )
          .subscribe((data: any) => {
            Swal.fire(
              'Thank you!',
              data.message,
              'success'
            ).then(() => {
              this.resetCategoryForm();
            });
          },
          err => {
            this.spinner.hide();
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
  }
}