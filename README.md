## Ejecutar el proyecto
1. Clonar el proyecto
2. Dentro del directorio del proyecto, instalar dependencias: `npm install`
3. Este proyecto utiliza `nodemon` paara Live Reload. Esta paquete deberá estar instalado de forma global: `npm install -g nodemon`
4. Ejecutar el proyecto desde la consola con: `npm run dev`

## Dependencias
1. Plantilla de estilos y marcado: AdminLTE
2. Motor de templating: PUG

## Número de actuación
Para obtener un número autogenerado e incremental de Actuación, es necesario indicar en `src/data/actuaciones.txt` el número inicial.
De esta manera el sistema obtendrá este número y lo incrementará a medida que sea necesario.
Si este archivo es nulo, el sistema no podrá ejecutarse.


## Almacenamiento en LocalStorage de claves en frontend.
La librería utilizada para temas de almacenamiento y recupero de información en el Frontend es: `localforage`.

Para almacenamiento de par de claves:
``` javascript
await localforage.setItem('publicKey', PUBLIC_KEY_HERE)
await localforage.setItem('secretKey', SECRET_KEY_HERE)
```

Para recuperar las claves previamente almacenadas:
``` javascript
await localforage.getItem('publicKey', PUBLIC_KEY_HERE)
await localforage.getItem('secretKey', SECRET_KEY_HERE)
``` 