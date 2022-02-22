FROM node:16-alpine

WORKDIR /usr/app/backend

RUN adduser -D app
USER app

COPY ./backend/ .

COPY ./frontend/ ../frontend

RUN cd ../frontend && \
  npm ci --production && \
  cd ../backend && \
  npm ci --production && \
  npm run build:ui && \
  npm rm -rf ../frontend

CMD npm start