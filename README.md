# API de Gestión de Suscripciones

Esta es una API construida con Node.js y TypeScript para gestionar cuentas, clientes, suscripciones y addons en un sistema de suscripción de servicios de wellness y health. La API sigue los principios de arquitectura hexagonal, asegurando una separación clara de responsabilidades y un diseño mantenible.

## Estructura del Proyecto

El proyecto se organiza en varias capas según la arquitectura hexagonal:

- **Dominio**: Contiene las entidades y la lógica de negocio.
  - Entidades:
    - `Account`
    - `Client`
    - `Addon`
    - `Subscription`
  
- **Aplicación**: Contiene los casos de uso y la lógica de orquestación.
  - Casos de uso:
    - Para `Account`: Crear, actualizar y eliminar (soft delete) cuentas.
    - Para `Client`: Crear, actualizar y eliminar (soft delete) clientes.
    - Para `Subscription`: Crear, actualizar y eliminar (soft delete) suscripciones.
    - Para `Addon`: Crear, gestionar cantidad, obtener estado de cantidad y estado activo.

- **Infraestructura**: Esta capa proporciona los adaptadores y repositorios para la persistencia de datos.
  - Repositorios en memoria (mock) para manejar las operaciones CRUD sin necesidad de una base de datos real.
  
- **Adaptadores**: Actúan como intermediarios entre la capa de aplicación y la infraestructura, permitiendo la comunicación con otros servicios o interfaces externas a traves de controladores.

## Entidades

### Account
- **Atributos**:
  - `id`: Identificador único de la cuenta.
  - `name`: Nombre de la cuenta.
  - `type`: Tipo de cuenta (`wellness`, `health`).
  - `isActive`: verifica sí está activo o inactivo.
- **Relaciones**:
  - Uno a muchos con `Client`.
  - Uno a uno con `Subscription`.

### Client
- **Atributos**:
  - `id`: Identificador único del cliente.
  - `name`: Nombre del cliente.
  - `email`: Correo electrónico del cliente.
  - `isActive`: verifica sí está activo o inactivo.
- **Relaciones**:
  - Uno a muchos con `Addon`.
  - Uno a uno con `Subscription`.

### Addon
- **Atributos**:
  - `id`: Identificador único del addon.
  - `type`: Tipo de addon (`email`, `sms`, `push notification`).
  - `usageCount`: Cantidad de uso asignada.
  - `quantity`: Cantidad disponible del addon.
- **Relaciones**:
  - Pertenece a `Client`.

### Subscription
- **Atributos**:
  - `id`: Identificador único de la suscripción.
  - `state`: Estado de la suscripción (`active`, `inactive`).
- **Relaciones**:
  - Uno a uno con `Account`.
  - Uno a uno con `Client`.

## Principios de Arquitectura Hexagonal

La arquitectura hexagonal se implementa mediante la separación de la lógica de negocio de las preocupaciones de infraestructura. Esto se logra de la siguiente manera:

1. **Separación de Dominios**: Las entidades de dominio (`Account`, `Client`, `Addon`, `Subscription`) están claramente definidas en la capa de dominio y contienen su lógica de negocio. Esto permite que el dominio permanezca independiente de la infraestructura y de los detalles de implementación.

2. **Casos de Uso**: La lógica de aplicación se maneja en la capa de aplicación, donde se definen los casos de uso que orquestan las operaciones que se pueden realizar en las entidades. Esto proporciona una interfaz clara para interactuar con el sistema y permite la inyección de dependencias para facilitar las pruebas.

3. **Repositorios y Adaptadores**: Los repositorios en memoria actúan como adaptadores que permiten la interacción con las entidades de dominio sin acoplarse a una base de datos concreta. Esto facilita la creación de pruebas unitarias y el cambio de la implementación de persistencia si es necesario.

4. **Independencia de la Infraestructura**: La implementación está diseñada de tal manera que el núcleo de la lógica de negocio es independiente de detalles como la base de datos, frameworks o APIs externas. Esto significa que puedes cambiar la infraestructura sin afectar la lógica de negocio.

## Endpoints

A continuación, se presentan algunos ejemplos de los endpoints disponibles en la API:

### Accounts
- `GET /accounts`: Devuelve todas cuentas.
- `POST /accounts`: Crear una nueva cuenta.
- `POST /accounts/addclient`: Agrega un cliente a la cuenta.
- `PUT /accounts/:id`: Actualizar una cuenta existente.
- `DELETE /accounts/:id`: Eliminar (soft delete) una cuenta.

### Clients
- `GET /clients`: Devuelve todos los clientes.
- `POST /clients`: Crear un nuevo cliente.
- `PUT /clients/:id`: Actualizar un cliente existente.
- `DELETE /clients/:id`: Eliminar (soft delete) un cliente.

### Subscriptions
- `GET /subscriptions`: Devuelve todas las suscriptiones.
- `POST /subscriptions`: Crear una nueva suscripción.
- `PUT /subscriptions/:id`: Actualizar una suscripción existente.
- `DELETE /subscriptions/:id`: Eliminar (soft delete) una suscripción.

### Addons
- `GET /addons`: Obtener el estado de cantidad de los addons.
- `POST /addons`: Crear un nuevo addon.
- `PUT /addons`: Gestionar la cantidad de un addon.
- `DELETE /subscriptions/:id`: Eliminar (soft delete) un addon.

## Instalación

Clona el repositorio

```bash
git clone https://github.com/camilolc/subscription-management.git
```


Accede a la carpeta contenedora de la solución

```bash
cd subscription-management
```

Instala las dependencias de node

```bash
npm install
```

Ejecuta el proyecto, el cual se servira en  `http://localhost:3000`

```bash
npm run dev
```



## Pruebas

Se incluyen pruebas unitarias para los casos de uso y las entidades, asegurando que la lógica de negocio funcione como se espera. Las pruebas se pueden ejecutar con el siguiente comando:

```bash
npm run test
```

## Postman collection

Se incluye la collección de postman para las pruebas a todos los endpoints, la cual se encuentra en la raiz del proyecto con el nombre de `Suscription Manager.postman_collection.json`. La variable de entorno para los endpoints tiene por defecto `http://localhost:3000`