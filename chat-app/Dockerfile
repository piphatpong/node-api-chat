FROM node:14

WORKDIR /chat-app
COPY package.json .
RUN npm install
COPY . .
CMD npm start
