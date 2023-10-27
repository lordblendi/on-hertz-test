FROM node:18.18.2-slim

WORKDIR /usr/src/app
COPY . .
RUN yarn install
EXPOSE 5000
CMD [ "yarn", "start" ]