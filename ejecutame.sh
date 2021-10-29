#Creamos el network
docker network create --driver bridge bualabob

#FRONTEND
#Creamos la imágen de frontend
docker build -t frontend ./cliente
#Creamos el contenedor de frontend
docker run -d -p 4200:4200 --name angular_frontend --network bualabob  frontend

#MONGO
#Creamos la imágen de mongo
docker build -t mongo-contain .
#Creamos el contenedor de frontend
docker run -d  -p 27017:27017 --name mongo-contain --network bualabob  mongo

#BACKEND
#Creamos la imágen de mongo
docker build -t backend ./servidor
#Creamos el contenedor de frontend
docker run -p 4000:4000 --name backend_contenedor --network bualabob backend