FROM node:20.10

WORKDIR /app

COPY package.json /app

RUN npm install

COPY prisma ./prisma

RUN npm run generate

COPY . .

COPY entrypoint.sh /entrypoint.sh

RUN chmod +x /entrypoint.sh

EXPOSE 3000

CMD ["sh", "/entrypoint.sh"]