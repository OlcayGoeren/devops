FROM node:16
WORKDIR /backend
COPY ./package.json /backend
RUN npm install
COPY . .
EXPOSE 8080
ENV MESSAGE="OLCAYYYY!!!"
CMD node app.js
