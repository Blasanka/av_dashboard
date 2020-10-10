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
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit, OnDestroy, AfterViewInit {
  public config: any = {};
  layoutSub: Subscription;
  readonly: Boolean = false;
  supplierForm: FormGroup;
  Supplier_Name: String;
  supplierFormSubmitted = false;
  categories: any[];
  subCategories: any[];
  selectedCategoryName = 'Select category';
  selectedCategoryId = 0;
  selectedSubCategoryName = 'Select Sub category';
  selectedSubCategoryId = 0;
  isCategoryEmpty = false;
  isSubCategoryEmpty = false;

  // Selected image files
  files: File[] = [];
  liElement: HTMLLIElement;

  public swipeConfig: SwiperConfigInterface = {
    slidesPerView: 'auto',
    centeredSlides: false,
    spaceBetween: 15,
  };

  @ViewChild(SwiperDirective, { static: false }) directiveRef?: SwiperDirective;
  @ViewChild('image') private image: ElementRef;
  @ViewChild('browseBtn') private browseBtn: ElementRef;
  // @Output() close = new EventEmitter();

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

    this.spinner.show(undefined, {
      type: 'ball-triangle-path',
      size: 'medium',
      bdColor: 'rgba(0, 0, 0, 0.8)',
      color: '#fff',
      fullScreen: true
    });

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
      sale_price: ['', [Validators.required, Validators.pattern(numRegex)]],
      aqty: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      attachment: ['', Validators.required],
      // category_id: '0',
      // sub_category_id: '0',
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

  get sf() {
    return this.supplierForm.controls;
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

  resetProductForm() {
    this.supplierForm.setValue({
      product_name: '',
      description: '',
      specifications: '',
      color: '',
      price: '',
      sale_price: '',
      aqty: '',
      attachment: '',
    });
    this.resetProductImages();
    this.selectedCategoryName = 'Select Category';
    this.selectedCategoryId = 0;
    this.selectedSubCategoryName = 'Select Sub Category';
    this.selectedSubCategoryId = 0;
  }

  onImageFileChanged(event: any) {
    if (event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      this.files.push(selectedFile);
      this.liElement = this.renderer.createElement('li');

      const img: HTMLImageElement = this.renderer.createElement('img');
      const reader = new FileReader();
      reader.onload = e => img.src = reader.result.toString();
      reader.readAsDataURL(selectedFile);
      // img.src = this.files[0].;
      this.renderer.addClass(img, 'product-image');

      const a: HTMLAnchorElement = this.renderer.createElement('a');
      a.innerText = 'Delete';
      this.renderer.addClass(a, 'delete-btn');
      a.addEventListener('click', this.deleteProductImage.bind(this, selectedFile, a));

      this.renderer.appendChild(this.image.nativeElement, this.liElement);
      this.renderer.appendChild(this.liElement, img);
      this.renderer.appendChild(this.liElement, a);
      if (this.files.length === 5) {
        this.renderer.setStyle(this.browseBtn.nativeElement, 'display', 'none');
      }
    }
  }

  deleteProductImage(file, a) {
    const formData = new FormData();
    formData.append('filename', file.name);
    a.parentElement.remove();
    const index = this.files.indexOf(file, 0);
    if (index > -1) {
      this.files.splice(index, 1);
    }
  }

  resetProductImages() {
    this.liElement.remove();
    this.files = [];
  }

  submitImages() {
    this.spinner.show(undefined, {
      type: 'ball-triangle-path',
      size: 'medium',
      bdColor: 'rgba(0, 0, 0, 0.8)',
      color: '#fff',
      fullScreen: true
    });
    const formData = new FormData();
    this.files.forEach((file: any) => {
      formData.append('attachment[]', file, file.name);
    });
    console.log(formData.getAll('attachment[]'));
    return this.api.submitSuplierProductImages(formData);
  }

  changeSelectedCategory(category) {
    this.selectedCategoryName = category.category_name;
    this.selectedCategoryId = category.id;
  }

  changeSelectedSubCategory(subCategory) {
    this.selectedSubCategoryName = subCategory.name;
    this.selectedSubCategoryId = subCategory.id;
  }

  submitProduct() {
    this.supplierFormSubmitted = true;
    this.supplierForm.value['category_id'] = this.selectedCategoryId;
    this.supplierForm.value['sub_category_id'] = this.selectedSubCategoryId;

    if (this.supplierForm.value['category_id'] === ''
      || this.supplierForm.value['category_id'] === 0) {
      this.isCategoryEmpty = true;
      return;
    } else {
      this.isCategoryEmpty = false;
    }
    if (this.supplierForm.value['sub_category_id'] === ''
      || this.supplierForm.value['sub_category_id'] === 0) {
        this.isSubCategoryEmpty = true;
        return;
    } else {
      this.isSubCategoryEmpty = false;
    }

    if (this.supplierForm.valid) {

      this.submitImages().subscribe((res: any) => {
        this.supplierForm.value['price'] = parseFloat(this.supplierForm.value['price']);
        this.supplierForm.value['sale_price'] = parseFloat(this.supplierForm.value['sale_price']);
        this.supplierForm.value['aqty'] = parseInt(this.supplierForm.value['aqty'], 10);

        this.supplierForm.value['attachment'] = res.data;

        this.api
          .submitSuplierProduct(JSON.stringify(this.supplierForm.value))
          .pipe(
            finalize(() => {
              this.spinner.hide();
            })
          )
          .subscribe((data: any) => {
            Swal.fire(
              'Thank you!',
              data.message,
              'success'
            ).then(() => {
              this.resetProductForm();
            });
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
      },
      err => {
        this.spinner.hide();
      });
    } else {
      this.spinner.hide();
      return;
    }
  }
}
