FROM  node:14-alpine
WORKDIR /usr/src/app/client
COPY package.json package-lock.json ./
RUN npm install
COPY . .
EXPOSE 4200
RUN npm install -y -g @angular/cli
CMD ng serve --host 0.0.0.0
