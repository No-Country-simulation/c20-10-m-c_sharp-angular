import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';

import {
  NotificationService,
  UserLocationService,
  UserSpecialitiesService,
} from '@app/core/services';
import { ShowErrorsDirective } from '@app/shared/directives';
import { atLeastOnePaymentMethodSelected } from '../../validators/payment.validator';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextareaModule,
    InputTextModule,
    DropdownModule,
    CheckboxModule,
    ButtonModule,
    AutoCompleteModule,
    ShowErrorsDirective,
  ],
  templateUrl: './create-post.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CreatePostComponent implements OnInit {
  private readonly userSpecialitiesService = inject(UserSpecialitiesService);
  private readonly userLocationService = inject(UserLocationService);
  private readonly notificationService = inject(NotificationService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);
  private readonly router = inject(Router);

  public readonly allCategories = signal<any[]>([]);
  public readonly allSpecialities = signal<any[]>([]);
  public readonly specialitiesByCategory = signal<any[]>([]);

  public address!: unknown;

  public readonly paymentMethodsList = [
    {
      label: 'Mercado Pago',
      control: 'mercadoPago',
    },
    {
      label: 'Tarjeta de débito/crédito',
      control: 'creditCard',
    },
    {
      label: 'Dinero en efectivo',
      control: 'cash',
    },
  ];

  public addressControl = new FormControl();
  public suggestions = signal<any[]>([]);

  public readonly createForm = new FormGroup({
    title: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    speciality: new FormControl({ value: '', disabled: true }, Validators.required),
    description: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    paymentMethods: new FormGroup(
      {
        mercadoPago: new FormControl(false),
        creditCard: new FormControl(false),
        cash: new FormControl(false),
      },
      atLeastOnePaymentMethodSelected
    ),
  });

  ngOnInit(): void {
    this.activatedRoute.data.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(res => {
      this.allCategories.set(res[0].allCategories);
      this.allSpecialities.set(res[0].allSpecialities);
    });
  }

  public onSelectCategory(selectedCategory: DropdownChangeEvent) {
    const filterSpecialities = this.allSpecialities().filter(
      specialities => specialities.categoryId === selectedCategory.value.categoryId
    );
    this.specialitiesByCategory.set(filterSpecialities);
    if (filterSpecialities.length > 0) {
      this.speciality?.enable();
    } else {
      this.speciality?.disable();
    }
  }

  /**
   * @todo Arreglar validacion de los checkbox
   * Al hacer check sobre un metodo de pago y luego desmarcarlo
   * la validacion deja de funcionar
   */
  public onSubmit(): void {
    if (this.createForm.invalid) {
      this.createForm.markAllAsTouched();
      Object.keys(this.createForm.controls).forEach(key => {
        const control = this.createForm.get(key);
        if (control instanceof FormGroup) {
          Object.keys(control.controls).forEach(subKey => {
            control.get(subKey)!.updateValueAndValidity();
          });
        } else {
          control!.updateValueAndValidity();
        }
      });
      return;
    }
    const formValue = this.createForm.value;
    console.log(formValue);
    // this.userSpecialitiesService.createUserSpecialities({
    //   idUser: '',
    //   idSpeciality: formValue.speciality!.specialityId,
    //   title: formValue.title!,
    //   text: formValue.description!,
    //   area: formValue.location!.city,
    //   latitude: location.latitude!,
    //   longitude: location.latitude!,
    // });
    this.sendNotification();
  }

  public searchAddress(event: AutoCompleteCompleteEvent) {
    const query = event.query;
    this.userLocationService
      .addressAutocomplete(query)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: res => {
          console.log(res);
          const suggestions = res.results.map((result: any) => ({
            name: `${result.city}, ${result.name}`,
          }));
          this.suggestions.set(suggestions);
        },
        error: err => {
          console.error('Error al buscar dirección:', err);
        },
      });
  }

  public sendNotification(): void {
    this.notificationService.addNotification({
      subject: 'Dashboard publicaciones',
      message: 'Su publicacion ha sido creada de forma exitosa',
    });
  }

  public get title() {
    return this.createForm.get('title');
  }
  public get category() {
    return this.createForm.get('category');
  }
  public get speciality() {
    return this.createForm.get('speciality');
  }
  public get description() {
    return this.createForm.get('description');
  }
  public get paymentMethods() {
    return this.createForm.get('paymentMethods');
  }
  public get location() {
    return this.createForm.get('location');
  }
}
