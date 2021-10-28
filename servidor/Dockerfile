# FROM node:latest
# FROM  alpine:latest 

FROM ubuntu:20.04

# Create app directory
WORKDIR /usr/src/app


# Install NodeJS & NPM
RUN  apt-get -y update

RUN apt install nodejs
RUN apt install npm

# Install MongoDB
RUN wget -qO - https://www.mongodb.org/static/pgp/server-4.4.asc | sudo apt-key add -
RUN echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/4.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-4.4.list
RUN  apt-get -y update
RUN  apt-get install -y mongodb-org

# Copy all files and npm install
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 4000

CMD ["bash", "runapp.sh"]





