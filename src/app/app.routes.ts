import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductDetailComponent } from './pages/product/product.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' }, // redirección inicial
    { path: 'home', component: HomeComponent },
    { path: 'product/:id', component: ProductDetailComponent }
];
