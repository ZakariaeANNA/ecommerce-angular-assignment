import { Component, OnInit , OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { LoginService } from 'src/app/service/login.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { __values } from 'tslib';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy {

  loginSubscription : Subscription | any ; 
  isLoginSuccessful: boolean | null = null   ; 
  
  constructor(
    private loginService : LoginService,
    private tokenService : TokenStorageService,
    private route : Router
  ) { }

  ngOnInit(): void {
  }

  loginAction(login : any){
    const loginValues = {
      username  : login.form.value.username , 
      password : login.form.value.password
    }
    this.loginSubscription = this.loginService.login(loginValues.username,loginValues.password).subscribe(
      (value : any) =>{
        console.log(value)
        this.tokenService.saveToken(value.token) ;
        const userConnected =  { 
          id: value.id,
          email: value.email,
          firstName: value.firstName,
          lastName: value.lastName,
          gender: value.gender,
          username : value.username,
        }
        this.tokenService.saveUser(userConnected)
        this.isLoginSuccessful = true ; 
        this.route.navigateByUrl('');
      },
      (error : any) =>{
        console.log(error)
        this.isLoginSuccessful = false ;
      }
    )
  }

  ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe();
}

}
