import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TokenStorageService } from 'src/app/service/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLogged : boolean = false ;
  user : any = {}

  constructor(
    private route: ActivatedRoute,
    private tokenService: TokenStorageService
  ) { 
    const token = this.tokenService.getToken();
    if(token){
      this.isLogged = true ; 
      this.user = this.tokenService.getUser();
    }
  }

  ngOnInit(): void {
  }

  signOutAction(){
    this.tokenService.signOut();
    this.isLogged = false ; 
  }

}
