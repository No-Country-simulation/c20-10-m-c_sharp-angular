import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RippleModule } from 'primeng/ripple';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { PlacesService } from './services';
import { MenuModule } from 'primeng/menu';
import { CheckboxModule } from 'primeng/checkbox';


@Component({
  selector: 'app-publish',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    InputTextareaModule,
    RippleModule,
    FormsModule,
    FileUploadModule,
    ToastModule,
    MenuModule,
    CheckboxModule,
  ],
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.css'],
  providers: [MessageService]
})
export class PublishComponent implements OnInit {
  selectedCategory: string | null = null;
  serviceInfo: string = '';
  selectedPaymentMethod: any[] = [];  // Array para almacenar los métodos seleccionados
  uploadedFiles: any[] = [];
  userLocation: string = '';
  isMenuVisible = false;

  // Lista de categorías disponibles para seleccionar
  categories: any[] = [
    { name: 'Electricidad', key: 'E' },
    { name: 'Plomería', key: 'P' },
    { name: 'Jardinería', key: 'J' },
    { name: 'Cuidados', key: 'C' },
    { name: 'Pintura', key: 'T' },
    { name: 'Otros', key: 'O' }
  ];

  // Métodos de pago disponibles
  paymentMethods: any[] = [
    { name: 'Mercado Pago', key: 'M' },
    { name: 'Tarjeta Débito/Crédito', key: 'T' },
    { name: 'Transferencia Bancaria', key: 'B' },
    { name: 'Pago en Efectivo', key: 'P' }
  ];

  constructor(
    private messageService: MessageService,
    private router: Router,
    private placesService: PlacesService
  ) { }

  // Hook que se ejecuta al inicializar el componente
  ngOnInit() {
    this.selectedCategory = null;

    // Obtener la ubicación del usuario a través del servicio PlacesService
    this.placesService.getUserLocation().then((location: any[]) => {
      this.userLocation = `Lat: ${location[1]}, Lng: ${location[0]}`;
    }).catch(() => {
      this.userLocation = 'No se pudo obtener la ubicación';
    });
  }

  // Método que se ejecuta cuando el formulario es enviado
  onSubmit() {
    const formData = {
      category: this.selectedCategory,
      serviceInfo: this.serviceInfo,
      userLocation: this.userLocation,
      uploadedFiles: this.uploadedFiles,
      selectedPaymentMethods: this.selectedPaymentMethod  // Incluye los métodos de pago seleccionados
    };
    console.log(formData);
    // Aquí se puede implementar la lógica para enviar los datos a un servidor o base de datos
  }

  // Método para seleccionar una categoría
  selectCategory(category: string) {
    if (this.selectedCategory === category) {
      this.selectedCategory = null;
    } else {
      this.selectedCategory = category;
    }
  }

  // Método para manejar la subida de archivos
  onUpload(event: any) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
    this.messageService.add({ severity: 'info', summary: 'Archivo subido', detail: '' });
  }

  // Método para navegar a otra página una vez se ha creado la publicación
  navigateTo() {
    this.router.navigate(['/publicacion-creada']);
  }

  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }
}
