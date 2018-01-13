FROM node:6.12.0

MAINTAINER George Puisha "e.puysha@itransition.com"

COPY ./ ./
RUN rm -rf node_modules
RUN npm install

CMD npm run docker

EXPOSE 3000
