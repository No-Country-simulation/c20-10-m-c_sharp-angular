import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { ButtonDirective, ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { filter, startWith } from 'rxjs';
import { LogoComponent } from '../../../shared/components/logo/logo.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface AuthData {
  currentAuthRoute: string;
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

  public readonly imgLogin = '/assets/images/auth/login.webp';
  public readonly imgRegister = '/assets/images/auth/register-1.webp';
  public readonly imgRegisterProfessional = '/assets/images/auth/register.webp';

  public authData: AuthData = {} as AuthData;

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
        currentAuthRoute: '/iniciar-sesion',
        title: '¡Bienvenido de nuevo!',
        subtitle: 'Iniciar Sesión',
        switchLabel: '¿No tienes una cuenta?',
        swithchLabelButton: 'Crear Cuenta',
        switchRoute: '/registrarse',
      };
    } else if (url === '/registrarse') {
      this.authData = {
        currentAuthRoute: '/registrarse',
        title: 'Crear Cuenta',
        subtitle: 'Empieza a contratar servicios',
        switchLabel: '¿Ya tienes una cuenta?',
        swithchLabelButton: 'Iniciar Sesión',
        switchRoute: '/iniciar-sesion',
      };
    } else if (url === '/registro-profesional') {
      this.authData = {
        currentAuthRoute: '/registro-profesional',
        title: 'Registrarse como Profesional',
        subtitle: 'Empieza a publicar tus servicios',
        switchLabel: '¿Ya tienes cuenta?',
        swithchLabelButton: 'Iniciar Sesión',
        switchRoute: '/iniciar-sesion',
      };
    } else if (url === '/recuperar-clave') {
      this.authData = {
        currentAuthRoute: '/recuperar-clave',
        title: 'Recuperar Clave',
        subtitle: 'Recuperar Clave',
      };
    }
  }
}
