FROM node:16.14.2-alpine

EXPOSE 3010

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

CMD ["npm", "start"]