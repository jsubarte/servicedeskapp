# ServiceDeskApp

Aplicación de servicios tecnicos, cuenta con funcionalidad de registro y login de usuarios y administracion de tickets. La aplicación esta desarrollada con Nodejs 18.16.1, PostgreSQL 14.7.1 y npm 9.5.1.

## Documentación Postman en linea

https://documenter.getpostman.com/view/12345252/2s93CLuEMi

## Variables de entorno

* ***PORT***: Puerto de la aplicación.
* ***SECRETORPRIVATEKEY***: Cadena secreta para generar el token JWT necesario para la autenticación.
* ***DB_USER***: Usuario de la base de datos.
* ***DB_PASS***: Contraseña de la base de datos.
* ***DB_NAME***: Nombre de la base de datos.
* ***DB_DIAL***: Que base de datos es: mysql, postgres, tedious ( sqlserver ), oracledb, sqlite, mariadb. 
* ***DB_PORT***: Puerto de la base de datos. Normalmente el puerto por defecto de la base de datos seleccionada.
* ***DB_HOST***: Host de la base de datos.
* ***DKDB_PORT***: Puerto del contenedor para exponer a la base de datos fuera del contenedor.

## Ejecución de la aplicación

Primero se debe ejecutar la intrucción 

```
    npm install
```
Para reconstruir los modulos de node necesarios para el funcionamiento de la aplicación.

### Local

Para ejecutar la aplicación en entorno local, solo se debe ejecutar la siguiente intrucción en la ruta raiz de la aplicación.

```
    npm run start
```

Esto levantara la aplicación y estara lista para ser usada.

### Docker

Para ejecutar la aplicación en docker solo se debe ejecutar la siguiente instrucción.

```
    npm run docker
```

Esto levantara la aplicación y estara lista para ser usada.