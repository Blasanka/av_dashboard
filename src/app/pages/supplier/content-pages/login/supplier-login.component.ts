import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, ReactiveFormsModule  } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/shared/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiServiceService } from 'app/api-service.service';

@Component({
  selector: 'app-supplier-login',
  templateUrl: './supplier-login.component.html',
  styleUrls: ['./supplier-login.component.scss']
})
export class SupplierLoginComponent {

  loginFormSubmitted = false;
  isLoginFailed = false;
  failed_message = '';

  supplierLoginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    rememberMe: new FormControl(true)
  });


  constructor(private router: Router, private authService: AuthService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private api: ApiServiceService) {
  }

  get lf() {
    return this.supplierLoginForm.controls;
  }

  // On submit button click
  onSubmit() {
    this.loginFormSubmitted = true;
    if (this.supplierLoginForm.invalid) {
      return;
    }

    this.spinner.show(undefined,
      {
        type: 'ball-triangle-path',
        size: 'medium',
        bdColor: 'rgba(0, 0, 0, 0.8)',
        color: '#fff',
        fullScreen: true
      });
      if (this.supplierLoginForm.value.email && this.supplierLoginForm.value.password) {
        // this.wait =true; 
        this.api.login(JSON.stringify(this.supplierLoginForm.value))
              .subscribe(
                  (data: any) => {
                      if (data.code == 200 ) {
                        this.api.setSession(data);
                        localStorage.setItem('userRole', 'supplier');
                        this.router.navigate(['/supplier/dashboard']);
                      } else if (data.code == 401) {
                        this.isLoginFailed = true;
                        this.failed_message = 'Your Account is Not Activated Yet!';
                        this.spinner.hide();

                      }
                  },
                  (err: any) => {
                    this.isLoginFailed = true;
                    this.failed_message = 'Login failed!';
                    this.spinner.hide();
                    console.log('error: ' + err);
                  }
              );
      } else {
        this.isLoginFailed = true;
        this.failed_message = 'Please Enter Correct Details!'
        this.spinner.hide();
        return;
      }
  }

}
