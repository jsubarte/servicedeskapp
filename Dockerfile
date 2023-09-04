FROM node:18.16.1-alpine3.18

RUN mkdir -p /var/www/TestBackend
WORKDIR /var/www/TestBackend

COPY . /var/www/TestBackend
COPY package.json /var/www/TestBackend

RUN npm install

CMD [ "npm","start" ]