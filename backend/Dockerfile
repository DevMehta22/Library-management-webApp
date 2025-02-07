FROM node:22 as builder

WORKDIR /backend

COPY package*.json .

RUN npm install

COPY . .

FROM node:22-slim

WORKDIR /app

COPY --from=builder /backend .

EXPOSE 4000

CMD [ "npm", "run", "dev" ]