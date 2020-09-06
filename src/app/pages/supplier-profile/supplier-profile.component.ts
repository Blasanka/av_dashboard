import { Component, ViewChild, OnInit, OnDestroy, Inject, Renderer2, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { ConfigService } from 'app/shared/services/config.service';
import { LayoutService } from 'app/shared/services/layout.service';

import { SwiperDirective, SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { ApiServiceService } from 'app/api-service.service';
import { FormGroup, FormBuilder,Validators  } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-supplier-profile',
  templateUrl: './supplier-profile.component.html',
  styleUrls: ['./supplier-profile.component.scss']
})
export class SupplierProfileComponent implements OnInit, AfterViewInit, OnDestroy {

  public config: any = {};
  layoutSub: Subscription;
  readonly:Boolean;
  supplierForm: FormGroup;
  Supplier_Name:String;
  supplierFormSubmitted = false;




  public swipeConfig: SwiperConfigInterface = {
    slidesPerView: 'auto',
    centeredSlides: false,
    spaceBetween: 15
  };


  @ViewChild(SwiperDirective, { static: false }) directiveRef?: SwiperDirective;

  constructor(private configService: ConfigService,
    private layoutService: LayoutService,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2, private cdr: ChangeDetectorRef,
    private api: ApiServiceService,
    private formBuilder: FormBuilder
  ) {
    this.config = this.configService.templateConf;
  }

    ngOnInit() {
      this.layoutSub = this.configService.templateConf$.subscribe((templateConf) => {
        if (templateConf) {
          this.config = templateConf;
        }
        this.cdr.markForCheck();

      })
      const telregex = /^(?:0|94|\+94)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|912)(0|2|3|4|5|7|9)|7(0|1|2|5|6|7|8)\d)\d{6}$/;
      const nicregex = /^([0-9]{9}[x|X|v|V]|[0-9]{12})$/m;
      
      this.supplierForm = this.formBuilder.group({
        supEmail: ['', [Validators.required,Validators.email]],
        supMobile: ['', [Validators.required, Validators.pattern(telregex) ]],
        supUsername: ['', Validators.required],
        supLegName: ['', ],
        supAddress: [''],
        supPIC: [''],
        supBr: [''],
        supID: ['',Validators.pattern(nicregex)],
        supBusinessInfo: [''],
    });
      this.readonly = true;
      this.getDetails();
    }

    get sf() {
      return this.supplierForm.controls;
    }
    ngAfterViewInit() {
      let conf = this.config;
      conf.layout.sidebar.collapsed = true;
      this.configService.applyTemplateConfigChange({ layout: conf.layout });
    }

    ngOnDestroy() {
      let conf = this.config;
      conf.layout.sidebar.collapsed = false;
      this.configService.applyTemplateConfigChange({ layout: conf.layout });
      if (this.layoutSub) {
        this.layoutSub.unsubscribe();
      }
    }
    editSupplier(){
      this.readonly = false;

    }

    getDetails(){
      this.readonly = true;
      this.api.getSupplierDetails()
      .subscribe(
          (data:any) => {
            console.log(data);
            this.supplierForm.markAsPristine();
            this.supplierForm.markAsUntouched();
            this.supplierForm.updateValueAndValidity();
            this.supplierForm.setValue({
              supEmail: data.email,
              supMobile: data.mobile,
              supUsername: data.username,
              supLegName: data.legal_name,
              supAddress: data.address,
              supPIC: data.personalic,
              supBr: data.br_num,
              supID: data.nic_copy,
              supBusinessInfo: data.bis_info,
            });     
            this.Supplier_Name=data.username;
          },
          (err:any)=>{
            console.log(err);

          });

    }
    resetSupplierForm(){
      this.getDetails();
    }

    supplierSubmit(){

      this.supplierFormSubmitted = true;
      if (this.supplierForm.invalid) {
        return;
      }

      if (this.supplierForm.valid) {
        console.log(JSON.stringify(this.supplierForm.value));
        this.api.updateSupplierDetails(JSON.stringify(this.supplierForm.value)).subscribe(
          (data:any) => {
            console.log(data);
            Swal.fire('Thank you...',
            'Your profile details updated successfully',  
            'success').then(()=>{
              this.getDetails();

           })

          },
          (err:any)=>{
            Swal.fire('Warning...',
            'Something went wrong please try again', 
            'error');
            
          });
        }
      }
    


}
