# Utiliser l'image officielle de Node.js comme image de base
FROM node:20.11.1

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm install -g nodemon

COPY . .

EXPOSE 8000

CMD ["npm", "run", "dev"]
