FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Expose the port the app runs on
EXPOSE 3050

CMD [ "npm", "run", "start:dev"]
