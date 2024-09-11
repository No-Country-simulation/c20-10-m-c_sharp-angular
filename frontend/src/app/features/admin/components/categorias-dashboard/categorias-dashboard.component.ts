import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field'
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CategoriasService } from '../../service/categorias.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Categoria } from './categoria.model';

@Component({
  selector: 'app-categorias-dashboard',
  templateUrl: './categorias-dashboard.component.html',
  styleUrl: './categorias-dashboard.component.css',
  standalone: true,
  imports: [
    AsyncPipe,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,MatFormFieldModule, MatInputModule,
    ReactiveFormsModule,CommonModule,RouterModule
  ]
})

export class CategoriasDashboardComponent implements OnInit {
  categoriaForm: FormGroup;
    // Declaración de la propiedad
    categorias: any[] = [];
   
  constructor(
    private fb: FormBuilder, 
    private categoriasService: CategoriasService
  ) {
    this.categoriaForm = this.fb.group({
      nombre: [''],
      descripcion: ['']
    });
  }

  ngOnInit(): void {

      console.log('CategoriasDashboardComponent ha sido inicializado');
      this.loadCategorias();
  }
  onSubmit(): void {
    if (this.categoriaForm.valid) {
      this.categoriasService
        .addCategoria(new Categoria(
          null,
          this.categoriaForm.value.nombre,
          this.categoriaForm.value.descripcion
        )
      )
      .subscribe((response) => {
        console.log('Categoría añadida:', response);
        // ctualizar la lista de categorías o mostrar un mensaje de éxito.
      });

    this.categoriasService.getCategorias().subscribe((data) => {
      this.categorias = data;
    });
  }
}
// Método para cargar las categorías
loadCategorias(): void {
  console.log('Categories: ', this.categorias);
  this.categoriasService.getCategorias().subscribe((data) => {
    this.categorias = data;
  });
  console.log('Categories then: ', this.categorias);
}

deleteCategoria(category: Categoria): void {
  console.log('Categoría eliminada', category);
  this.categoriasService.deleteCategoria(category.id!).subscribe(() => {});
  this.loadCategorias(); // Actualizar la lista después de eliminar
}
}