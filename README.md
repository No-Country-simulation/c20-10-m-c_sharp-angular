# 🚀 ConectaOficios 

ConectaOficios es una aplicación web fullstack diseñada para conectar personas que ofrecen servicios de 
oficios (Oferentes) con aquellas que los necesitan (Solicitantes). La aplicación facilita la creación de 
perfiles, la comunicación entre usuarios, seleccionar un servicio, calificar y comentar tanto a un Oferente 
como a un Solicitante.

## ✨ Características 

- 🔐 **Registro de Usuarios**: Los usuarios pueden registrarse como Administrador, Oferente o Solicitante.
- 👤 **Perfiles Personalizados**:
  - Oferentes pueden seleccionar categorías y oficios, agregar experiencia, ubicación, y ver calificaciones y comentarios.
  - Solicitantes pueden calificar a los oferentes, subir fotos de trabajos realizados, y ver sus propias calificaciones y comentarios.
- 💬 **Comunicación entre Usuarios**: Los Oferentes y Solicitantes pueden contactar y comunicarse entre sí directamente desde la plataforma.
- 🛠️ **Panel de Administración**: Los administradores tienen control completo para realizar CRUD en categorías, oficios, y otros modelos.

## 🛠️ Tecnologías Utilizadas

### Backend

- **.NET 7+ con C#**
  - Framework robusto para el desarrollo de la API.
  - Implementación de autenticación y autorización.
  - Manejo de datos con Entity Framework Core.

### Frontend

- **Angular 18+**
  - Framework moderno para el desarrollo de aplicaciones SPA.
  - Gestión de rutas y estado de la aplicación.
  - **PrimeNG** como framework de componentes UI:
    - Amplia colección de componentes de UI personalizables.
    - Soporte para temas y diseño responsivo.

### Base de Datos

- **SQL Server**
  - Base de datos relacional para el almacenamiento de la información de usuarios, perfiles, categorías, oficios, etc.

## 🚀 Instalación y Configuración

### Requisitos Previos

- [.NET 7 SDK](https://dotnet.microsoft.com/download)
- [Node.js y npm](https://nodejs.org/) (versión recomendada: 18.x)
- [Angular CLI](https://angular.io/cli) (versión recomendada: 18+)
- SQL Server (local o remoto)

### Instrucciones

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/tu-usuario/conectaoficios.git
   cd conectaoficios
2. **Configuración del Backend**:

	* Navega a la carpeta del backend:
	  ```bash
	  cd backend
	* Configura la conexión a la base de datos en `appsettings.json`.
	* Restaura los paquetes y ejecuta la aplicación:
	  ```bash
      dotnet restore
      dotnet run
3. **Configuración del Frontend**:

   * Navega a la carpeta del fronted:
     ```bash
     cd frontend
   * Instala las dependencias y ejecuta la aplicación:
     ```bash
     npm install
     ng serve
4. **Acceso a la aplicación**:

* Una vez que ambos servidores estén corriendo, accede a la aplicación en tu navegador en `http://localhost:4200`.

## 🤝 Participantes:
