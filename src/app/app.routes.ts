import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductDetailComponent } from './pages/product/product.component';
import { SalesComponent } from './pages/sales/sales.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { MyProductComponent } from './pages/my-products/my-products.component';
import { RoleGuard } from './service/auth.guard';
import { Role } from './service/role.enum';


export const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },

      //Rutas públicas
      { path: 'home', component: HomeComponent },
      { path: 'product/:id', component: ProductDetailComponent },

      //Rutas protegidas por rol
      {
        path: 'sales',
        component: SalesComponent,
        canActivate: [RoleGuard],
        data: { roles: [Role.Owner] } // solo Owner
      },
      {
        path: 'my-products',
        component: MyProductComponent,
        canActivate: [RoleGuard],
        data: { roles: [Role.Owner] } // solo Owner
      }
    ]
  },

  //Rutas de autenticación
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },

  // Ruta comodín para redirigir a home en caso de ruta no encontrada
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
