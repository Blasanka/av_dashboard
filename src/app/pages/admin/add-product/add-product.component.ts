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
export class AddNewProductComponent implements OnInit, OnDestroy, AfterViewInit {
  public config: any = {};
  layoutSub: Subscription;
  readonly: Boolean = false;
  supplierForm: FormGroup;
  Supplier_Name: String;
  supplierFormSubmitted = false;

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

  submitProduct() {
    this.supplierFormSubmitted = true;
    if (this.supplierForm.valid) {

      this.submitImages().subscribe((res: any) => {
        this.supplierForm.value['price'] = parseFloat(this.supplierForm.value['price']);
        this.supplierForm.value['aqty'] = parseInt(this.supplierForm.value['aqty'], 10);

        this.supplierForm.value['attachment'] = res.data;
        console.log(res.data);

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
            ).then(() => {
              // this.resetProductForm();
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
