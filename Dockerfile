FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g nodemon

COPY . .

RUN npx prisma generate --schema=./src/infrastructure/database/prisma/schema.prisma

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
