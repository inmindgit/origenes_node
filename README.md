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
Se utiliza LocalStorage de HTML5.
Para almacenar claves desde la consola de desarrollo:

``` javascript
$ window.localStorage.setItem('keypair', KEYPAIR)
```

Para recuperar las claves:
``` javascript
window.localStorage.getItem('keypair')
``` 

## Desarrollo
Para poder utilizar la función `require` de los módulos/paquetes de debemos compilar el archivo `.js` utilizando Browserify.

1. Instalar Browserify de manera global
``` javascript
npm i -g browserify
```
2. Instalar dependencias del proyecto (es necesario el paquete `brsf` para utilizar `fs` en el navegador)
3. Para compilar el nuevo archivo `*.bundle.js` se utiliza el comando: `browserify -t brsf nombrearchivo.js > nombrearchivo.bundle.js`, este ultimo es requerido en HTML para su uso.