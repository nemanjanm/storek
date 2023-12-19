import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent {

  loginForm!: FormGroup;

  username!: string;
  password!: string;

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService, 
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router
  ){}
  
  ngOnInit(): void{
    this.loginForm = this.formBuilder.group
    ({
      username: new FormControl('', Validators.required),
      password: new FormControl("", Validators.required)
    });
  }

  submit(): void {
    if(this.loginForm.valid)
    {
      this.login(this.loginForm.value.username, this.loginForm.value.password);
    }
  }

  login(username: any, password: any): void{
    this.authService.login(username, password).subscribe({
      next: (res: any) => {
        if(res && res.status)
        {
          console.log(res.object);
          this.storageService.setCredentials(res.object)
          this.router.navigate(["/pocetna"]);
        }
        else
        {
          this.messageService.add({
            severity: "error",
            summary: "Greska",
            detail: "Pogresni kredencijali"
          })
        }
      }
    })
  }
}
