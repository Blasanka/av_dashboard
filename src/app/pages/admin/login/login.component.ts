import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, ReactiveFormsModule  } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/shared/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiServiceService } from 'app/api-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

 loginFormSubmitted = false;
  isLoginFailed = false;
  failed_message = '';

  adminLoginForm = new FormGroup({
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
    return this.adminLoginForm.controls;
  }

  // On submit button click
  onSubmit() {
    this.loginFormSubmitted = true;
    if (this.adminLoginForm.invalid) {
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
      if (this.adminLoginForm.value.email && this.adminLoginForm.value.password) {
        this.api.authenticateAdmin(JSON.stringify(this.adminLoginForm.value))
              .subscribe(
                  (data: any) => {
                      if (data.code == 200) {
                        this.api.setSession(data);
                        localStorage.setItem('userRole', 'admin');
                        this.spinner.hide();
                        this.router.navigate(['/admin/dashboard']);
                      } else if (data.code === 500) {
                        this.isLoginFailed = true;
                        this.failed_message = 'Internal Server Error!';
                        this.spinner.hide();
                        Swal.fire(
                          'Login failed!',
                          'Internal Server Error!',
                          'error'
                        );
                      } else {
                        this.isLoginFailed = true;
                        this.failed_message = 'Login failed!';
                        this.spinner.hide();
                        Swal.fire(
                          'Login failed!',
                          'Wrong credentials',
                          'error'
                        );
                      }
                  },
                  (err: any) => {
                    this.isLoginFailed = true;
                    this.failed_message = 'Login failed!';
                    this.spinner.hide();
                    console.log('error: ' + err);
                    Swal.fire(
                      'Login failed!',
                      err,
                      'error'
                    );
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
