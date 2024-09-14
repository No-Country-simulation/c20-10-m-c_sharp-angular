import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserService } from '../../../core/services';
import { CountriesService } from '../../../shared/services/countries.service';
import { FileUploadModule } from 'primeng/fileupload';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { FieldsetModule } from 'primeng/fieldset';
import { DropdownModule } from 'primeng/dropdown';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CheckboxModule } from 'primeng/checkbox';
import { ChangeDetectorRef } from '@angular/core';

import { User } from '../../../core/interfaces';

interface Country {
  country: string;
  code: string;
}

@Component({
  selector: 'app-perfil',
  standalone: true,
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    AvatarModule,
    InputTextModule,
    InputNumberModule,
    CalendarModule,
    FieldsetModule,
    DropdownModule,
    PasswordModule,
    ButtonModule,
    InputSwitchModule,
    CheckboxModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PerfilComponent implements OnInit {
  currentUser: User | null = null;
  profileForm!: FormGroup;

  errorRequest = false;

  editmode = false;
  editLabel = 'Editar';

  imageUrl = 'https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png';

  //selectedCountry: any | object | string = '';
  //selectedCity: object | string = '';

  countries = [];
  cities = [];

  photoUrl = 'path-to-default-image.jpg'; // Cambiar por el path real o manejar dinámicamente

  constructor(
    private formBuilder: FormBuilder,
    private countriesServices: CountriesService,
    private cd: ChangeDetectorRef,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.getUserData().subscribe({
      next: (user) => {
        this.currentUser = user;
        this.profileForm.patchValue(user);
      },
      error: (error) => {
        console.error('Error fetching user data', error);
        this.errorRequest = true;
      },
    });

    this.countriesServices.getCountries().subscribe(countries => {
      this.countries = countries
        .map((country: any) => ({
          country: country.name.common,
          code: country.cca2,
        }))
        .sort((a: any, b: any) => a.country.localeCompare(b.country));
    });

    this.profileForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      dni: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      phone: ['', Validators.required],
      contactByPhone: [false],
      email: ['', [Validators.required, Validators.email]],
      contactByEmail: [false],
      password: ['', Validators.required],
      mercadoPago: [false],
      creditCard: [false],
      money: [false],
    });

    this.profileForm.disable();
  }

  toggleEdit(): void {
    this.editmode = !this.editmode;
    this.editLabel = this.editmode ? 'Guardar' : 'Editar';

    this.editmode ? this.profileForm.enable() : this.profileForm.disable();
  }

  uploadImage(event: Event): void {
    console.log('uploadImage');
    const file = (event.target as HTMLInputElement).files?.item(0);
    if (file) {
      console.log('file', file);
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrl = reader.result as string;
        this.cd.detectChanges();
      };
      reader.readAsDataURL(file);
    }
  }

  onCountryChange() {
    if (this.profileForm.controls['country'].value.country) {
      this.profileForm.controls['city'].disable();
      this.countriesServices
        .getCitiesByCountry(this.profileForm.controls['country'].value.code)
        .subscribe(data => {
          this.cities = data.geonames
            .map((city: any) => ({
              city: city.toponymName,
            }))
            .sort((a: any, b: any) => a.city.localeCompare(b.city));
          this.profileForm.controls['city'].enable();
        });
    }
  }
}
