FROM node:16-alpine

WORKDIR /usr/app/backend

COPY --chown=node:node . .


COPY ./backend/ .

COPY ./frontend/ ../frontend

RUN cd ../frontend && \
  npm ci --production && \
  cd ../backend && \
  npm ci --production && \
  npm run build:ui && \
  npm rm -rf ../frontend
USER node
CMD npm start