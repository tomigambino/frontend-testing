import { Injectable } from "@angular/core";
import { axiosService } from "./axiosClient";
import { Router } from "@angular/router";
import { axiosPrivate } from "./axiosClientPrivate";
import { Role } from "./role.enum";


@Injectable({ providedIn: 'root' })
export class AuthService {
  
    constructor(private router: Router) { }

    // Inicia sesión con email y contraseña y guarda el token de acceso
    async login(email: string, password: string) {
    try {
        const data = { email, password }
        const response = await axiosService.post('/auth/login', data)
        localStorage.setItem('accessToken', response.data.accessToken) // Guarda el token en localStorage
        localStorage.setItem('roleId', response.data.roleId) // Guarda el roleId en localStorage
        return;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || 'Datos incorrectos o usuario no registrado';
        throw new Error(errorMessage);
    }
    }
    
    // Registra un nuevo usuario con los datos proporcionados
    async signUp(firstName: string, lastName: string, phone: string, email: string, password: string) {
        try {
            const data = { firstName, lastName, phone, email, password };
            const response = await axiosService.post('/auth/register', data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    // Obtener token actual
    getToken(): string | null {
        return localStorage.getItem('accessToken');
    }

    logout(): void {
    try {
        localStorage.removeItem('accessToken'); // Elimina el token de localStorage
        this.router.navigate(['/login']); // Redirige al usuario a la página de login
    } catch (error) {
        throw new Error('Error during logout');
    }
    }

    async isLoggedIn(): Promise<boolean> {
        //Obtenemos el token del localStorage
        const token = this.getToken();

        // Si no hay token, redirigimos al login
        if (!token) {
            this.redirectToLogin();
            return false;
        } 

        // Si hay token, verificamos si es válido
        const response = await axiosPrivate.get('/auth/validateToken')

        // Si el token no es válido, redirigimos al login
        if (response.data === false) {
            this.redirectToLogin();
            return false;
        }

        // Si el token es válido no retornamos true
        return true;
    }

    redirectToLogin(): void {
        this.router.navigate(['/login']);
    }

    async getCustomerId(): Promise<number | null> {
        try {
            const response = await axiosPrivate.get('/auth/getCustomerId');
            return response.data.customerId;
        } catch (error) {
            console.error('Error fetching customer ID:', error);
            return null;
        }
    }

    getUserRole(): Role | null {
        return localStorage.getItem('roleId') as Role | null;
    }

    isOwner(): boolean {
        const role = this.getUserRole();
        return role === Role.Owner;
    }
}
