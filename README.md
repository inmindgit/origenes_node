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