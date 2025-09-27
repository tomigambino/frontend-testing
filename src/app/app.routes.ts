import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductDetailComponent } from './pages/product/product.component';
import { SalesComponent } from './pages/sales/sales.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { canActivateFn } from './service/auth.guard';

export const routes: Routes = [
    { 
        path: '', 
        canActivate: [canActivateFn],
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'product/:id', component: ProductDetailComponent },
            { path: 'sales', component: SalesComponent },
        ]
    },
    { path: 'login', component: LoginComponent },
    { path: 'sign-up', component: SignUpComponent },
    { path: '**', redirectTo: 'home', pathMatch: 'full' }, // Redirección para rutas no encontradas
];

