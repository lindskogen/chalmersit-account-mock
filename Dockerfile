FROM node:10

WORKDIR /app

ENV MOCK default

COPY mocks /app/mocks
COPY index.js package.json yarn.lock /app/

RUN yarn --pure-lockfile


EXPOSE 3000

ENTRYPOINT [ "yarn", "start" ] 
