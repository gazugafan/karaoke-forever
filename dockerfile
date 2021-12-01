FROM node:12-bullseye

RUN apt-get update \
 && apt-get install -y ffmpeg

USER node

WORKDIR /usr/karaoke

COPY . .

RUN npm install \
 && npm run build \
 && mkdir tmp || true

EXPOSE 3000

ENTRYPOINT [ "node", "server/main.js", "-p 3000" ]