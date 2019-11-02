from node:latest

WORKDIR /usr/src/app
COPY app/package*.json ./

RUN npm install
COPY app/ ./

EXPOSE 9000
ENTRYPOINT [ "npm", "start" ]
