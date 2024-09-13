# test-tecnico-guatson

# Frontend

La Url para intereactuar con el frontend se encuentra en 

http://ec2-3-135-224-4.us-east-2.compute.amazonaws.com](http://ec2-3-135-224-4.us-east-2.compute.amazonaws.com)


# Backend
# Documentación de la API

## Resumen

Este documento proporciona información sobre los endpoints de la API incluidos en la colección de Postman **test-tecnico-guatson**. Incluye detalles sobre las solicitudes disponibles, sus métodos y cómo usarlas.


## Endpoints

### 1. Perfiles (GET)

- **Endpoint**: `/api/v1/perfiles`
- **Método**: `GET`
- **Descripción**: Recupera la lista de perfiles.
- **URL**: [http://ec2-3-135-224-4.us-east-2.compute.amazonaws.com/api/v1/perfiles](http://ec2-3-135-224-4.us-east-2.compute.amazonaws.com/api/v1/perfiles)

### 2. Cálculo de IVA (GET)

- **Endpoint**: `/api/v1/iva-calculo/{id}`
- **Método**: `GET`
- **Descripción**: Recupera el cálculo de IVA para un ID específico.
- **URL**: [http://ec2-3-135-224-4.us-east-2.compute.amazonaws.comapi/v1/iva-calculo/{id}](http://ec2-3-135-224-4.us-east-2.compute.amazonaws.com/api/v1/iva-calculo/c0a1ce46-8526-47f0-a47c-e722ce62caf3)
- **Parámetros**:
    - `id` (en la ruta): El identificador único para el cálculo de IVA.

### 3. Crear Perfil (POST)

- **Endpoint**: `/api/v1/perfiles`
- **Método**: `POST`
- **Descripción**: Crea un nuevo perfil.
- **URL**: [http://ec2-3-135-224-4.us-east-2.compute.amazonaws.com/api/v1/perfiles](http://ec2-3-135-224-4.us-east-2.compute.amazonaws.com/api/v1/perfiles)
- **Cuerpo de la Solicitud**:
  ```json
  {
      "rfc": "RFC123456",
      "commercialName": "Company One",
      "taxRegimeCode": "601"
  }
    ```

### 4. Subir Facturas (POST)
- **Endpoint:** /api/v1/facturas
- **Método**: `POST`
- **Descripción**: Sube un archivo ZIP de facturas para un perfil fiscal específico.
- **URL**: http://ec2-3-135-224-4.us-east-2.compute.amazonaws.com/api/v1/facturas

- **Cuerpo de la Solicitud**:
  - **Archivo**: zipFile (Tipo: archivo, Ruta: /home/miguelangelmp10/Descargas/facturas.zip)
  - **ID de Perfil Fiscal**: fiscalProfileId (Valor: c0a1ce46-8526-47f0-a47c-e722ce62caf3)

### 5. Listar Facturas (GET)
- **Endpoint**: /api/v1/facturas
- **Método**: GET
- **Descripción**: Recupera una lista paginada de facturas.
- **URL**: http://ec2-3-135-224-4.us-east-2.compute.amazonaws.com/api/v1/facturas?page=1&pageSize=20&fiscalProfileId=4f3856d3-f2dc-44b1-b23a-14cc768e14a5
- **Parámetros de Consulta**:
  - page (opcional) Número de página (valor por defecto: 1)
  - pageSize (opcional): Tamaño de la página (valor por defecto: 20)
  - fiscalProfileId: identificador del perfil
