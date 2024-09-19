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
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { Category, Speciality, User, UserSpeciality } from '@app/core/interfaces';
import { Suggestions, Address, Location } from './create-post.interface';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
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

  public readonly userData = signal<User>({} as User);
  public readonly allCategories = signal<Category[]>([]);
  public readonly allSpecialities = signal<Speciality[]>([]);
  public readonly specialitiesByCategory = signal<Speciality[]>([]);

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

  public suggestions = signal<Suggestions[]>([]);

  public readonly createForm = new FormGroup({
    title: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    speciality: new FormControl<Speciality | null>(
      { value: null, disabled: true },
      Validators.required
    ),
    description: new FormControl('', Validators.required),
    location: new FormControl<Location | null>(null, Validators.required),
    paymentMethods: new FormGroup(
      {
        mercadoPago: new FormControl(false),
        creditCard: new FormControl(false),
        cash: new FormControl(false),
      },
      atLeastOnePaymentMethodSelected // Custom validator to ensure at least one payment method is selected
    ),
  });

  ngOnInit(): void {
    this.activatedRoute.data.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(res => {
      this.allCategories.set(res[0].allCategories);
      this.allSpecialities.set(res[0].allSpecialities);
      this.userData.set(res[0].userData);
      const userSpecialityData = res[0].userSpecialityData;
      if (userSpecialityData) {
        this.patchCurrentValues(userSpecialityData);
      }
    });
  }

  public patchCurrentValues(data: UserSpeciality) {
    const category = this.allCategories().find(c => c.id === data.id);

    this.createForm.patchValue({
      title: data.title,
      category: category?.name,
      description: data.text,
      location: {
        area: data.area,
        lat: data.latitude,
        lng: data.longitude,
      },
      paymentMethods: {
        mercadoPago: false,
        creditCard: false,
        cash: false,
      },
    });

    if (data.idSpeciality) {
      this.createForm.get('speciality')?.enable();
    } else {
      this.createForm.get('speciality')?.disable();
    }
  }

  public onSelectCategory(selectedCategory: DropdownChangeEvent) {
    const filterSpecialities = this.allSpecialities().filter(
      specialities => specialities.categoryId === selectedCategory.value.categoryId
    );
    this.specialitiesByCategory.set(filterSpecialities);
    // Enable or disable speciality control based on filtered results
    if (filterSpecialities.length > 0) {
      this.speciality?.enable();
    } else {
      this.speciality?.disable();
    }
  }

  public searchAddress(event: AutoCompleteCompleteEvent) {
    const query = event.query;
    this.userLocationService
      .addressAutocomplete(query)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: res => {
          /**
           * Map the API results to the format expected by the autocomplete suggestions
           * Includes the address components and coordinates
           */
          const suggestions = res.results.map((result: Address) => ({
            value: {
              lat: result.lat,
              lng: result.lng,
              area: `${result.country}, ${result.city}, ${result.name}`,
            },
            address: `${result.city}, ${result.name}`,
          }));
          this.suggestions.set(suggestions);
        },
        error: err => {
          console.error('Error al buscar dirección:', err);
        },
      });
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
    const location = formValue.location as Location;
    const speciality = formValue.speciality as Speciality | null;
    this.userSpecialitiesService
      .createUserSpecialities({
        idUser: this.userData().id,
        idSpeciality: speciality!.specialityId,
        title: formValue.title!,
        text: formValue.description!,
        area: location.area,
        latitude: `${location.lat}`,
        longitude: `${location.lng}`,
      })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.sendNotification();
          this.router.navigate(['/']);
        },
        error: err => {
          console.error(err);
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
