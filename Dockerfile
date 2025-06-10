FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install   # installs all dependencies (dev + prod)

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
