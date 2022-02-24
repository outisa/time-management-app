FROM node:16-alpine

WORKDIR /usr/app/backend

ARG MONGODB_ARG
ARG SECRET_ARG

ENV MONGODB_URI_PROD $MONGODB_ARG
ENV SECRET $SECRET_ARG

COPY --chown=node:node . .
COPY ./backend/ .
COPY ./frontend/ ../frontend

RUN cd ../frontend && \
  npm ci --production && \
  cd ../backend && \
  npm ci --production && \
  npm run build:ui && \
  rm -rf ../frontend
USER node
CMD npm start
