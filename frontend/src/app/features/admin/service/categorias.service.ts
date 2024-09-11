import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Categoria } from '../components/categorias-dashboard/categoria.model'; // Asegúrate de tener un modelo para Categoria

@Injectable({
  providedIn: 'root',
})
export class CategoriasService {
  // TODO: aqui se debe de hacer las llamadas al back pero como no tenemos, esta implemenatdo en memoria
  private categorias: Categoria[] = [
    { id: 1, name: 'Electronics', description: 'Example description' },
    { id: 2, name: 'Books', description: 'Example description' },
    // Agrega más categorías iniciales si es necesario
  ];

  constructor() {}

  // Método para obtener todas las categorías
  getCategorias(): Observable<Categoria[]> {
    return of(this.categorias);
  }

  // Método para añadir una nueva categoría
  addCategoria(categoria: Categoria): Observable<Categoria> {
    const newCategoria = { ...categoria, id: this.categorias.length + 1 }; // Generar un ID nuevo
    this.categorias.push(newCategoria);
    return of(newCategoria);
  }

  // Método para eliminar una categoría por ID
  deleteCategoria(id: number): Observable<void> {
    this.categorias = this.categorias.filter((c) => c.id !== id);
    return of();
  }
}