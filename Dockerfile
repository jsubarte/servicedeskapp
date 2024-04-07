FROM node:18.16.1-alpine3.18

RUN mkdir -p /var/www/ServiceDesk
WORKDIR /var/www/ServiceDesk

COPY . /var/www/ServiceDesk
COPY package.json /var/www/ServiceDesk

RUN npm install

CMD [ "npm","start" ]