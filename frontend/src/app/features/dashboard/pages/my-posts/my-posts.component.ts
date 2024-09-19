import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { UserService, UserSpecialitiesService } from '@app/core/services';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { UserSpeciality } from '@app/core/interfaces';

@Component({
  selector: 'app-my-posts',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    ConfirmDialogModule,
    DataViewModule,
    ButtonModule,
  ],
  templateUrl: './my-posts.component.html',
  styleUrl: './my-posts.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class MyPostsComponent implements OnInit {
  public readonly userSpecialitiesService = inject(UserSpecialitiesService);
  public readonly confirmationService = inject(ConfirmationService);
  public readonly messageService = inject(MessageService);
  public readonly userService = inject(UserService);
  public readonly destroyRef = inject(DestroyRef);
  public readonly router = inject(Router);

  public readonly postsData = signal<UserSpeciality[]>([]);

  ngOnInit(): void {
    this.getPosts();
  }

  public deletePost(id: number) {
    this.confirmationService.confirm({
      message: 'Esta accion es irreversible <br> ¿Desea continuar?',
      header: 'Estas a punto de borrar esta publicacion',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      acceptButtonStyleClass: 'p-button-danger p-button-outlined ',
      rejectButtonStyleClass: 'p-button-primary',
      accept: () => {
        this.userSpecialitiesService
          .deleteUserSpecialitiesById(id)
          .pipe()
          .subscribe({
            next: () => {
              this.messageService.add({
                key: 'toast',
                severity: 'success',
                summary: 'Se ha eliminado',
                detail: 'El post se ha eliminado correctamente',
              });
              this.getPosts();
            },
            error: error => {
              this.messageService.add({
                key: 'toast',
                severity: 'error',
                summary: 'Ha ocurrido un error',
                detail: error,
              });
            },
          });
      },
    });
  }

  public getPosts(): void {
    this.userService
      .getUserData()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(res => {
        console.log(res.userSpecialities);
        this.postsData.set(res.userSpecialities);
      });
  }

  public onNavigate(route: string): void {
    this.router.navigate([route]);
  }
}
