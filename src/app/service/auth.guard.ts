// role.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  // UrlTree se da cuando queremos redirigir al usuario
  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    // Leemos los roles disponibles en los datos de la ruta (app.routes.ts)
    const expectedRoles: string[] = route.data['roles'];
    const userRole = this.authService.getUserRole();

    // Verificamos si el rol del usuario está entre los roles esperados
    if (userRole && expectedRoles.includes(userRole)) {
      return true;
    }
    return this.router.parseUrl('/');
  }
}
