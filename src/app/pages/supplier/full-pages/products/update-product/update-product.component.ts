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
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit, OnDestroy, AfterViewInit {
  public config: any = {};
  layoutSub: Subscription;
  paramSub: Subscription;
  readonly: Boolean = false;
  supplierForm: FormGroup;
  Supplier_Name: String;
  supplierFormSubmitted = false;

  public selectedProduct: any = {};

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
    private route: ActivatedRoute,
    private router: Router,
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

    this.paramSub = this.route.params.subscribe(params => {
      const productId = params['id'];
      this.spinner.show('Loading...', {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
      this.api.getSupplierProduct(productId).subscribe((res: any) => {
        if (res.code == 200) {
          this.selectedProduct = res.data;
          if (res.data.attachment != null && res.data.attachment.length > 0 && res.data.attachment[0] !== '') {
            this.selectedProduct.attachment.forEach(i => {
              if (i != null && i !== '') {
                this.liElement = this.renderer.createElement('li');
                const img: HTMLImageElement = this.renderer.createElement('img');
                img.src = `http://127.0.0.1:8000/storage/${i}`;
                this.renderer.addClass(img, 'product-image');
                const a: HTMLAnchorElement = this.renderer.createElement('a');
                a.innerText = 'Delete';
                this.renderer.addClass(a, 'delete-btn');
                a.addEventListener('click', this.deleteProductImage.bind(this, i, a));

                this.renderer.appendChild(this.image.nativeElement, this.liElement);
                this.renderer.appendChild(this.liElement, img);
                this.renderer.appendChild(this.liElement, a);
                if (this.files.length === 5) {
                  this.renderer.setStyle(this.browseBtn.nativeElement, 'display', 'none');
                }
              }
            });
          }
          this.spinner.hide();
        } else {
          this.spinner.hide();
        }
      });
    });
    const numRegex = /^((\+|-)?([0-9]+)(\.[0-9]+)?)|((\+|-)?\.?[0-9]+)$/;

    this.supplierForm = this.formBuilder.group({
      product_name: ['', Validators.required],
      description: ['', Validators.required],
      specifications: ['', Validators.required],
      color: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern(numRegex)]],
      aqty: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
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
    this.resetProductImages();
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
      a.addEventListener('click', this.deleteProductImageFile.bind(this, selectedFile, a));

      this.renderer.appendChild(this.image.nativeElement, this.liElement);
      this.renderer.appendChild(this.liElement, img);
      this.renderer.appendChild(this.liElement, a);
      if (this.files.length === 5) {
        this.renderer.setStyle(this.browseBtn.nativeElement, 'display', 'none');
      }
    }
  }

  deleteProductImageFile(file, a) {
    const formData = new FormData();
    formData.append('filename', file.name);
    a.parentElement.remove();
    const index = this.files.indexOf(file, 0);
    if (index > -1) {
      this.files.splice(index, 1);
    }
  }

  deleteProductImage(url, a) {
    a.parentElement.remove();
    const index = this.selectedProduct.attachment.indexOf(url, 0);
    console.log(`index ${index}`);
    if (index > -1) {
      this.selectedProduct.attachment.splice(index, 1);
      console.log(`index ${this.selectedProduct.attachment}`);
    }
  }

  resetProductImages() {
    this.liElement.remove();
    this.files = [];
  }

  submitImages() {
    const formData = new FormData();
    this.files.forEach((file: any) => {
      formData.append('attachment[]', file, file.name);
    });
    console.log(formData.getAll('attachment[]'));
    return this.api.submitSuplierProductImages(formData);
  }

  submitProductWithImages() {
    this.supplierFormSubmitted = true;
    if (this.supplierForm.valid) {
      this.spinner.show(undefined, {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
      if (this.files != null && this.files.length > 0) {
        this.submitImages().subscribe((res: any) => {
          if (res.code == 200) {
            const previousAttachments = this.selectedProduct.attachment;
            if (previousAttachments[0] != null && previousAttachments[0] !== '') {
              console.log(previousAttachments);
              this.selectedProduct.attachment = res.data;
              previousAttachments.forEach(img => {
                if (img != null && img !== '') {
                  this.selectedProduct.attachment += `|${img}`;
                }
              });
            } else {
              this.selectedProduct.attachment = res.data;
            }
            this.updateProduct();
          }
        },
        err => {
          this.spinner.hide();
        });
      } else {
        // If new images are not added we don t need to violate existing image paths with urls
        let previousAttachments = '';
        this.selectedProduct.attachment.forEach(img => {
          if (img != null && img !== '') {
            previousAttachments += `${img}|`;
          }
        });
        this.selectedProduct.attachment = previousAttachments;
        this.updateProduct();
      }
    } else {
      this.spinner.hide();
      return;
    }
  }

  updateProduct() {
    this.supplierForm.value['price'] = parseFloat(this.supplierForm.value['price']);
    this.supplierForm.value['aqty'] = parseInt(this.supplierForm.value['aqty'], 10);
    this.api
          .updateSupplierProduct(this.selectedProduct.id, JSON.stringify(this.selectedProduct))
          .pipe(
            finalize(() => {
              this.spinner.hide();
              // this._location.replace('/supplier/dashboard/products/manage');
            })
          )
          .subscribe((data: any) => {
            if (data.code == 200) {
              Swal.fire(
                'Thank you!',
                data.message,
                'success'
              ).then(() => {
                // this.resetProductForm();
                console.log(data);
              });
            } else {
              Swal.fire(
                data.message,
                'Something went wrong, please try again',
                'error'
              );
              console.log(data.message);
            }
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
  }
}
