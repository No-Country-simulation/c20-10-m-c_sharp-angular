### Estructura del Proyecto

Este documento describe la estructura de carpetas y archivos del proyecto, detallando el propósito y el uso recomendado de cada una.

```
src/
├── app/
│   ├── core/
│   │   ├── configs
│   │   ├── guards
│   │   ├── interceptors
│   │   ├── interfaces
│   │   └── services
│   ├── features/
│   │   ├── auth/
│   │   │   ├── ** Ejemplo de carpetas internas de una funcionalidad **
│   │   │   ├── components
│   │   │   ├── interfaces
│   │   │   ├── layout
│   │   │   ├── pages
│   │   │   ├── routes
│   │   │   └── services
│   │   ├── landing
│   │   └── profile
│   ├── shared/
│   │   ├── components
│   │   ├── layout
│   │   ├── pipes
│   │   └── directives
│   ├── app.component.spec.ts
│   ├── app.component.ts
│   ├── app.config.ts
│   └── app.routes.ts
├── assets/
│   └── images
├── styles/
│   └── reset.css
├── favicon.ico
├── index.html
├── main.ts
└── styles.css
```

### Descripción de Carpetas y Archivos

#### `src/`

Directorio raíz del código fuente de la aplicación.

#### `app/`

Contiene la lógica principal de la aplicación, organizada en módulos y componentes.

##### `core/`

Módulos y servicios esenciales que son utilizados en toda la aplicación.

- **`configs/`**: Configuraciones globales que definen cómo se debe comportar diferentes partes de la aplicación.
- **`guards/`**: Guardias de rutas para manejar la protección y autenticación de las mismas.
- **`interceptors/`**: Interceptores HTTP que permiten modificar las solicitudes o respuestas de la aplicación.
- **`interfaces/`**: Definiciones de tipos e interfaces compartidas en toda la aplicación.
- **`services/`**: Servicios globales que proveen funcionalidad central y son utilizados en múltiples lugares.

##### `features/`

Módulos de características individuales, cada uno encapsulando una funcionalidad específica de la aplicación.

- **`features/amazing-functionality/`**: Funcionalidad
  - **`components/`**: Componentes específicos de la funcionalidad.
  - **`interfaces/`**: Interfaces relacionadas.
  - **`layout/`**: Estructuras de diseño específicas.
  - **`pages/`**: Páginas o vistas de la funcionalidad.
  - **`routes/`**: Definiciones de rutas.
  - **`services/`**: Servicios relacionados en el funcionamiento interno de los componentes.

##### `shared/`

Componentes y módulos compartidos entre diferentes partes de la aplicación.

- **`components/`**: Componentes reutilizables a lo largo de la aplicación.
- **`layout/`**: Componentes de diseño reutilizables, como contenedores y estructuras de página.
- **`pipes/`**: Pipes personalizados que transforman datos en vistas.
- **`directives/`**: Directivas personalizadas para manipular el DOM.

##### Archivos de la raíz de `app/`

- **`app.component.spec.ts`**: Pruebas unitarias para el componente raíz de la aplicación.
- **`app.component.ts`**: Componente raíz que controla la estructura base de la aplicación.
- **`app.config.ts`**: Configuración general de la aplicación, como proveedores o módulos importados.
- **`app.routes.ts`**: Definiciones de rutas principales de la aplicación.

#### `assets/`

Recursos estáticos como imágenes, fuentes, y otros archivos multimedia.

- **`images/`**: Almacena imágenes utilizadas en la aplicación.

#### `styles/`

Estilos CSS globales que se aplican a toda la aplicación.

- **`reset.css`**: CSS para resetear los estilos predeterminados del navegador.

#### Archivos de la raíz de `src/`

- **`favicon.ico`**: Ícono de la aplicación mostrado en la pestaña del navegador.
- **`index.html`**: Página HTML principal que carga la aplicación.
- **`main.ts`**: Archivo de entrada de la aplicación, que inicia y configura la misma.
- **`styles.css`**: Archivo principal de estilos CSS aplicados globalmente.

---

### Uso Recomendado

- Mantén **`core/`** para la lógica que se usa en toda la aplicación y debe estar disponible de manera global.
- Divide las funcionalidades en **`features/`** para mejorar la mantenibilidad y la escalabilidad del proyecto.
- Centraliza los componentes y servicios reutilizables en **`shared/`** para evitar duplicación de código.
- Almacena los recursos estáticos en **`assets/`** para una fácil referencia y organización.
- Mantén los estilos globales en **`styles/`** para garantizar una apariencia y comportamiento consistente en toda la aplicación.

Esta estructura modular permite un desarrollo escalable y organizado, facilitando la reutilización de componentes y la gestión de funcionalidades específicas.
