# Práctica docker-compose y kubernetes

## Docker-compose

Compose es una herramienta para definir y ejecutar aplicaciones Docker de múltiples contenedores. Con Compose, utilizaremos un archivo YAML para configurar los servicios de nuestra aplicación. A partir de aquí, con un solo comando, podremos crear e iniciar todos los servicios desde su configuración. El docker-compose.yml contendrá:

- Lista de imágenes a utilizar para ejecutar contenedores.
- La ruta de los ficheros Dockerfile que crearán las imágenes si fuese necesario.
- Los puertos a exponer para acceder a dicho contenedor
- Los volúmenes a utilizar
- Las variables necesarias para ejecutar las aplicaciones
- Networks externas para comunicar los contenedores entre sí desde contenedores tanto del mismo ".yaml" como de distintos.

## Kubernetes

Es una plataforma de código abierto, portable y extensible para manejar servicios que están
en contenedores para facilitar la automatización de tareas relacionadas con estos.

Alguna de las características que ofrece Kubernetes para los equipos de desarrollo son:
- La capacidad de colocar contenedores automáticamente según sus requisitos de recursos, sin afectar la disponibilidad.
- Poder mezclar cargas de trabajo críticas y de mejor esfuerzo para aumentar su uso y poder optimizar los recursos.
- Autocuración: reiniciar los contenedores que fallan, reemplazar y re-programarlos cuando los nodos mueran. Eliminar asimismo los contenedores que no responden y no publicarlos hasta que estén listos.
- Ejecución de despliegues automatizados donde se implementan progresivamente los cambios en la aplicación o su configuración, mientras se monitorea su estado. De este modo, se asegura que no elimine todas sus instancias al mismo tiempo. Si algo sale mal, Kubernetes revertirá el cambio.

Kubernetes és, en esencia, un cluster formado por dos tipos de unidades: el nodo Master y los nodos Worker (o simplemente Nodos).
- El Master coordina el cluster. Coordina todas las actividades de este como organizar (schedule) las aplicaciones, mantener el estado deseado de las aplicaciones, escalado, despliegue de actualizaciones, y demás.
- Los Nodos son workers que ejecutan las aplicaciones. Cada nodo contiene un agente denominado Kubelet que gestiona el nodo y mantiene la comunicación con el Máster a través de la API de Kubernetes

## Crear fichero docker-compose.yml 

Crearemos un fichero docker-compose.yml en el que estarán los servicios necesarios para el despliege de la aplicación. El fichero esta formado por los siguientes servicio:
  - Angular
  - Rest (Express JS)
  - Graphql 
  - MonngoDB

Todos estos servicios estaran conectados por una network llamada api-network. Se expondran los puertos y se declararan las variables necesarias y algunos de ellos dependerán de otros. 

```
version: "3"
services:
  angular:
    container_name: bualabob-angular
    build: ./cliente
    ports:
      - 4200:4200
    networks:
      - api-network
  graphql:
    container_name: bualabob-graphql
    build: ./servidor/graphQL
    depends_on:
      - mongo
    ports:
      - 3000:3000
    env_file:
      - .env
    environment:
      DB_MONGO: ${DB_MONGO}
    networks:
      - api-network
  rest:
    container_name: bualabob-rest
    build: ./servidor/rest
    depends_on:
      - mongo
    ports:
      - 4000:4000
    env_file:
      - .env
    environment:
      DB_MONGO: ${DB_MONGO}
      SECRET: ${SECRET}
    networks:
      - api-network
  mongo:
    container_name: bualabob-mongo
    image: mongo:latest
    volumes:
      - ./dump:/var/dump
      - ./mongorestore.sh:/docker-entrypoint-initdb.d/mongorestore.sh
    # command: mongorestore /var/dump, amb el "docker-entrypoint.... ja executa l'script"
    ports:
      - 27017:27017
    networks:
      - api-network
networks:
  api-network:
    driver: bridge
  bualabob_api-network:
    external: true
```
Utilizaremos el siguiente comando para iniciar el proyecto de compose: 

```
docker-compose up
```

## Fichero .env 

Crearemos un fichero .env el cual contendra todos los datos sensibles. 

```
DB_MONGO=mongodb://bualabob-mongo:27017/bualabob 
SECRET=ejemplo123
```

Las variables se declaran en el archivo docker-compose.yml de la siguiente forma:

```
env_file:
      - .env
environment:
  VARIABLE: ${NOMBRE_DE_LA_VARIABLE}
```

## Prometheus y Grafana

Utilizaremos Prometheus que es una aplicación que nos permite recoger métricas de una aplicación en tiempo real y Grafana que sera el encargado de graficar todas las métricas creadas por el servicio de Prometheus. 
Crearemos un nuevo fichero de docker compose en el que se incluyan estos dos servicios necesarios para poder monitorizar la parte servidora de nuestra aplicación.

El servicio de prometheus se encargará de arrancar en el puerto 9090 de nuestro host un contenedor (prometheus_practica) basado en la imagen prom/prometheus:v2.20.1. Para poder configurar correctamente este servicio, será
necesario realizar además dos acciones:

- Copiar el fichero adjunto prometheus.yml al directorio /etc/prometheus del
contenedor

```
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: "node"
    static_configs:
    - targets: ["bualabob-rest:4000"]
  - job_name: "rest"
```

- Ejecutar el comando --config.file=/etc/prometheus/prometheus.yml

El servicio de grafana arrancará tras el de prometheus se encargará de arrancar en el puerto 3500 de nuestro host un contenedor (grafana_practica) basado en la imagen grafana/grafana:7.1.5 que, además, se caracterizará por:

- Establecer las variables de entorno necesarias para:
  - Deshabilitar el login de acceso a Grafana
  - Permitir la autenticación anónima
  - Que el rol de autenticación anónima sea Admin
  - Que instale el plugin grafana-clock-panel 1.0.1
- Dispondrá de un volumen nombrado (myGrafanaVol) que permitirá almacenar los cambios en el servicio ya que se asociará con el directorio /var/lib/grafana

Además, para una correcta configuración de Grafana, será necesario realizar la copia del fichero adjunto datasources.yml al directorio del contenedor /etc/grafana/provisioning/datasources/

```
apiVersion: 1
datasources:
  - name: Prometheus
    type: prometheus
    access: proxy
    orgId: 1
    url: prometheus_practica:9090
    basicAuth: false
    isDefault: true
    editable: true
```

Finalmente el fichero docker-compose.yml de los servicios de Prometheus y Grafana se quedará de la siguiente forma:

```
version: "3"
services:
  prometheus:
    image: prom/prometheus:v2.20.1
    container_name: prometheus_practica
    networks:
    - bualabob_api-network
    ports:
    - "9090:9090"
    volumes:
    - ../prometheus/prometheus.yml:/etc/prometheus/prometheus.yml
    command:
    - --config.file=/etc/prometheus/prometheus.yml
    # depends_on:
    # - myapp_practica
  grafana:
    image: grafana/grafana:latest
    container_name: grafana_practica
    networks:
    - bualabob_api-network
    ports:
    - "3500:3000"
    # - "3500:3000"
    volumes:
    - ../grafana/datasources.yml:/etc/grafana/provisioning/datasources/datasources.yml
    - myGrafanaVol:/var/lib/grafana
    environment:
      GF_AUTH_DISABLE_LOGIN_FORM: "true"            #Deshabilitar el login de acceso a Grafana
      GF_AUTH_ANONYMOUS_ENABLED: "true"             #Permitir la autenticación anónima
      GF_AUTH_ANONYMOUS_ORG_ROLE: Admin             #Que el rol de autenticación anónima sea Admin
      GF_INSTALL_PLUGINS: grafana-clock-panel 1.0.1 #Que instale el plugin grafana-clock-panel 1.0.1
    depends_on:
    - prometheus
volumes:
  myGrafanaVol:
networks:
  bualabob_api-network:
    external: true
```

Utilizaremos el siguiente comando para iniciar el docker-compose: 

```
docker-compose up
```

### Añadir endpoints a la aplicación

Seguidamente vamos a modificar el código del servidor rest para que, al invocar a cada uno de los endpoints, contará el numero total de solicitudes de los procesos get.

Primero de todo añadiremos en el archivo servidor/rest/index.js las siguientes lineas:

```
let client = require('prom-client');

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics({ timeout: 5000 });

app.get('/metrics', (req, res) => {
  res.set('Content-Type', client.register.contentType);
  res.end(client.register.metrics());
});
```

Seguidamente vamos a modificar el archivo servidor/rest/routes/api/products.js añadiendo el siguiente código para añadir el endpoint:

```
let client = require('prom-client');

const counterProductsEndpoint = new client.Counter({
  name: 'counterProductsEndpoint',
  help: 'The total number of processed requests to get endpoint'
});
```

Ahora localizamos los diferentes get y añadiremos el incrementador de endpoints:

```
  counterProductsEndpoint.inc();
```

Seguiremos los mismos pasos para los distintos endpoints.

## Comprobación del correcto funcionamiento de la aplicación con Prometheus y Grafana

Una vez creado el docker-compose.yml y docker-compose1.yml realizaremos el docker-compose up. Para lanzar los dos docker-compose a la vez. Se realizara con el siguiente comando:

```
docker-compose -f docker-compose.yml -f docker-compose1.yml up -d
```

Entraremos en http://localhost:4200 para comprobar que la aplicación funciona correctamente:

![Bualabob](https://github.com/KevinCamos/NodeJS_Express_Mongo_Angular12/blob/gh-pages/img/docker%20(9).png)

Entraremos en http://localhost:4000/metrics para comprobar que podemos ver las métricas:

![metricas](https://github.com/KevinCamos/NodeJS_Express_Mongo_Angular12/blob/gh-pages/img/docker%20(1).png)

Entraremos en http://localhost:9090 para comprobar que funciona Prometheus

![Prometheus](https://github.com/KevinCamos/NodeJS_Express_Mongo_Angular12/blob/gh-pages/img/docker%20(7).png)

Por último entraremos en http://localhost:3500 para comprobar que funciona Grafana y crearemos una dashboard para comprobar que los diferentes endpoints funcionan correctamente. Nos dirigimos a Create -> Dashboard

![Grafana](https://github.com/KevinCamos/NodeJS_Express_Mongo_Angular12/blob/gh-pages/img/docker%20(2).png)

Seguidamente presionamos en añadir nuevo panel, y vamos a proceder a crear un panel con todos los endpoints

![Grafana](https://github.com/KevinCamos/NodeJS_Express_Mongo_Angular12/blob/gh-pages/img/docker%20(3).png)

Para crear los diferentes endpoint nos dirigimos a Metrics y seleccionamos los endpoints.

![Grafana](https://github.com/KevinCamos/NodeJS_Express_Mongo_Angular12/blob/gh-pages/img/docker%20(4).png)

![Grafana](https://github.com/KevinCamos/NodeJS_Express_Mongo_Angular12/blob/gh-pages/img/docker%20(5).png)

![Grafana](https://github.com/KevinCamos/NodeJS_Express_Mongo_Angular12/blob/gh-pages/img/docker%20(6).png)

Para finalizar guardaremos el dashboard pulsando el boton de save

![Grafana](https://github.com/KevinCamos/NodeJS_Express_Mongo_Angular12/blob/gh-pages/img/docker%20(10).png)
