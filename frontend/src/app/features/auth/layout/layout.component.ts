import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { ButtonDirective, ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { filter, startWith } from 'rxjs';
import { LogoComponent } from '../../../shared/components/logo/logo.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface AuthData {
  img: string;
  title: string;
  subtitle: string;
  switchLabel?: string;
  swithchLabelButton?: string;
  switchRoute?: string;
}

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ButtonDirective,
    ButtonModule,
    FormsModule,
    InputTextModule,
    PasswordModule,
    ReactiveFormsModule,
    LogoComponent,
  ],
  templateUrl: './layout.component.html',
  styles: `
    .c-mt {
      margin-top: 7.5rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LayoutComponent {
  private readonly router = inject(Router);
  public authData: AuthData = {} as AuthData;
  public isForgot = signal<boolean>(false);

  constructor() {
    this.router.events
      .pipe(
        takeUntilDestroyed(),
        filter(event => event instanceof NavigationEnd),
        startWith(new NavigationEnd(0, this.router.url, this.router.url))
      )
      .subscribe((event: NavigationEnd) => {
        this.updateTitleAndSubtitle(event.urlAfterRedirects);
      });
  }

  private updateTitleAndSubtitle(url: string): void {
    if (url === '/iniciar-sesion') {
      this.authData = {
        img: '/assets/images/auth/login.webp',
        title: '¡Bienvenido de nuevo!',
        subtitle: 'Iniciar Sesión',
        switchLabel: '¿No tienes una cuenta?',
        swithchLabelButton: 'Crear Cuenta',
        switchRoute: '/registrarse',
      };
    } else if (url === '/registrarse') {
      this.authData = {
        img: '/assets/images/auth/register-1.webp',
        title: 'Crear Cuenta',
        subtitle: 'Empieza a contratar servicios',
        switchLabel: '¿Ya tienes una cuenta?',
        swithchLabelButton: 'Iniciar Sesión',
        switchRoute: '/iniciar-sesion',
      };
    } else if (url === '/registro-profesional') {
      this.authData = {
        img: '/assets/images/auth/register.webp',
        title: 'Registrarse como Profesional',
        subtitle: 'Empieza a publicar tus servicios',
        switchLabel: '¿Ya tienes cuenta?',
        swithchLabelButton: 'Iniciar Sesión',
        switchRoute: '/iniciar-sesion',
      };
    } else if (url === '/restablecer-contrase%C3%B1a') {
      this.isForgot.set(true);
      this.authData = {
        img: '/assets/images/auth/forgot.webp',
        title: 'Restablecer contraseña',
        subtitle: 'Introduce tu correo',
      };
    }
  }
}
