FROM node:20.10

WORKDIR /app

COPY package.json /app

RUN npm install

COPY prisma ./prisma

RUN npm run generate

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]