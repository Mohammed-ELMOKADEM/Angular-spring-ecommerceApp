import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AppStateService } from '../services/app-state.service';

export const authGuardGuard: CanActivateFn = (route, state) => {
  if(inject(AppStateService).authState.user.role.includes("ADMIN")){
    return true;
  }
  else{
    return false;
  }
};
