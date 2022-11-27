FROM node:16.14.2-alpine

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

CMD ["npm", "start"]