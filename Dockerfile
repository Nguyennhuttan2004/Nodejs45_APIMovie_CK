FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

# Thêm dòng này để sinh Prisma Client
RUN npx prisma generate

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]