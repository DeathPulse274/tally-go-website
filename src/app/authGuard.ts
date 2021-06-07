import {Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate  {
    token: String;
    

constructor(private router: Router){    
}

canActivate() {    
    
    this.token = sessionStorage.getItem('token'); 
        if (this.token === null || this.token === undefined) {           
             this.router.navigate(['/user-pages/login']);
             return false;
      }
       else{
        return true;      }    
    
  }

//   token = sessionStorage.getItem('token');
//     if(!token){
//       dont redirect go login
//     }
//     else{
//       go to path
//     }

}