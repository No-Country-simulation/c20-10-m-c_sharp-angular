// Importaciones necesarias para el funcionamiento del componente
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RippleModule } from 'primeng/ripple';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FormsModule } from '@angular/forms';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { PlacesService } from './services';

@Component({
  selector: 'app-publish',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    InputTextareaModule,
    RippleModule,
    RadioButtonModule,
    FormsModule,
    FileUploadModule,
    ToastModule,
  ],
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.css'],
  providers: [MessageService],
})
export default class PublishComponent implements OnInit {
  selectedCategory: string | null = null;
  serviceInfo: string = '';
  selectedPaymentMethod: string | null = null;
  uploadedFiles: any[] = [];
  userLocation: string = '';

  // Lista de categorías disponibles para seleccionar
  categories: any[] = [
    { name: 'Electricidad', key: 'E' },
    { name: 'Plomería', key: 'P' },
    { name: 'Jardinería', key: 'J' },
    { name: 'Cuidados', key: 'C' },
    { name: 'Pintura', key: 'T' },
    { name: 'Otros', key: 'O' },
  ];

  // Métodos de pago disponibles
  paymentMethods: any[] = [
    { name: 'Mercado Pago', key: 'M' },
    { name: 'Tarjeta Débito/Crédito', key: 'T' },
    { name: 'Transferencia Bancaria', key: 'B' },
    { name: 'Pago en Efectivo', key: 'P' },
  ];

  constructor(
    private messageService: MessageService,
    private router: Router,
    private placesService: PlacesService
  ) {}

  // Hook que se ejecuta al inicializar el componente
  ngOnInit() {
    this.selectedCategory = null; // Inicializa la categoría seleccionada a null

    // Obtener la ubicación del usuario a través del servicio PlacesService
    this.placesService
      .getUserLocation()
      .then((location: any[]) => {
        this.userLocation = `Lat: ${location[1]}, Lng: ${location[0]}`;
      })
      .catch(() => {
        this.userLocation = 'No se pudo obtener la ubicación';
      });
  }

  // Método que se ejecuta cuando el formulario es enviado
  onSubmit() {
    // Crear un objeto con los datos del formulario
    const formData = {
      category: this.selectedCategory,
      serviceInfo: this.serviceInfo,
      userLocation: this.userLocation,
      uploadedFiles: this.uploadedFiles,
    };
    console.log(formData);
    // Aquí se puede implementar la lógica para enviar los datos a un servidor o base de datos
  }

  // Método para seleccionar una categoría
  selectCategory(category: string) {
    // Si ya ha sido seleccionada, se deselecciona
    if (this.selectedCategory === category) {
      this.selectedCategory = null;
    } else {
      this.selectedCategory = category; // Si no ha sido seleccionada, se asigna
    }
  }

  // Método para seleccionar un método de pago
  selectPaymentMethod(method: string) {
    // Si ya ha sido seleccionado, se deselecciona
    if (this.selectedPaymentMethod === method) {
      this.selectedPaymentMethod = null;
    } else {
      this.selectedPaymentMethod = method; // Si no ha sido seleccionado, se asigna
    }
  }

  // Método para manejar la subida de archivos
  onUpload(event: any) {
    // Iterar sobre los archivos subidos y agregarlos al arreglo uploadedFiles
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
    // Mostrar un mensaje de éxito utilizando el MessageService
    this.messageService.add({ severity: 'info', summary: 'Archivo subido', detail: '' });
  }

  // Método para navegar a otra página una vez se ha creado la publicación
  navigateTo() {
    this.router.navigate(['/publicacion-creada']);
  }
}
