FROM node:13.10

RUN npm install -g nodemon browserify

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080
CMD [ "npm", "run", "dev" ]