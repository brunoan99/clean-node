FROM node:16
WORKDIR /usr/workspace/clean-node-api
COPY ./package.json .
COPY ./package-lock.json .
RUN npm set-script prepare ""
RUN npm ci --omit=dev