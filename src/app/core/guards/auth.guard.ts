import { CanActivateFn } from '@angular/router';
import {inject } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  let auth:AuthService=inject(AuthService);
  return auth.isAuthenticated();
  // const token:string= sessionStorage.getItem('emp-token');
  // if( token != null){
  //   return true;
  // }
  // else{
  //   return false;
  // }
};
