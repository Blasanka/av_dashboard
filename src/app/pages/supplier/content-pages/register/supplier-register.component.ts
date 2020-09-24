import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MustMatch } from 'app/shared/directives/must-match.validator';
import { ApiServiceService } from 'app/api-service.service';
import swal from 'sweetalert2/dist/sweetalert2.js';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-supplier-register',
  templateUrl: './supplier-register.component.html',
  styleUrls: ['./supplier-register.component.scss']
})
export class SupplierRegisterComponent implements OnInit {

  supplierRegisterFormSubmitted = false;
  supplierRegisterForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router,private api: ApiServiceService,
    private spinner: NgxSpinnerService) {}

  ngOnInit() {
    const telregex = /^(?:0|94|\+94)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|912)(0|2|3|4|5|7|9)|7(0|1|2|5|6|7|8)\d)\d{6}$/;

    this.supplierRegisterForm = this.formBuilder.group({
      username: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern(telregex) ]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      acceptTerms: [false, Validators.requiredTrue]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
  }

  get rf() {
    return this.supplierRegisterForm.controls;
  }


  //  On submit click, reset field value
  onSubmit() {
    this.supplierRegisterFormSubmitted = true;
    if (this.supplierRegisterForm.invalid) {
      return;
    }

    this.spinner.show(undefined, {
      type: 'ball-triangle-path',
      size: 'medium',
      bdColor: 'rgba(0, 0, 0, 0.8)',
      color: '#fff',
      fullScreen: true
    });
    this.api.supplier_registration((JSON.stringify(this.supplierRegisterForm.value)))
        .subscribe(
          (data: any) => {
              if (data.code == 200) {
                swal.fire('Thank you...',
                  'You Registered Successfully!. Please wait some time to approve you', 
                  'success').then(() => {
                    this.spinner.hide();
                    this.router.navigate(['/supplier/login']);
                });
              }
          },
          (err: any) => {
            this.spinner.hide();
            swal.fire(
              'Oops...',
              'Something went wrong!',
              'error',
            );
        }
      );
  }

}
