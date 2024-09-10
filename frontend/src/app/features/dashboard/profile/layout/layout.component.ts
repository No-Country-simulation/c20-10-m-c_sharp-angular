import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';

interface EditingFields {
  name: boolean;
  birthDate: boolean;
  dni: boolean;
  country: boolean;
  locality: boolean;
  phone: boolean;
  email: boolean;
  password: boolean;
}

@Component({
  selector: 'app-perfil',
  standalone: true,
  templateUrl: './layout.component.html',
  imports: [FileUploadModule, AvatarModule, InputTextModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PerfilComponent implements OnInit {
  profileForm!: FormGroup;

  isEditing: EditingFields = {
    name: false,
    birthDate: false,
    dni: false,
    country: false,
    locality: false,
    phone: false,
    email: false,
    password: false,
  };

  countries = ['Argentina', 'Brasil', 'Chile', 'Perú']; // Aquí deberías llenar con el listado real
  localities = []; // Cambiará dinámicamente según el país seleccionado
  photoUrl = 'path-to-default-image.jpg'; // Cambiar por el path real o manejar dinámicamente

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      name: ['', Validators.required],
      birthDate: ['', Validators.required],
      dni: ['', Validators.required],
      country: ['', Validators.required],
      locality: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  toggleEdit(field: keyof EditingFields): void {
    this.isEditing[field] = !this.isEditing[field];
  }
}
