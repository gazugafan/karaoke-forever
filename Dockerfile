FROM node:latest
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN apt-get update && apt-get -y install ffmpeg python3 python3-pip
RUN pip3 install spleeter
EXPOSE 3000
ENTRYPOINT ["node","server/main.js","-p3000"]