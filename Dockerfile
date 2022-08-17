FROM node:14.17.1
WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install\
        && npm install typescript -g
COPY . .

RUN tsc
CMD ["node", "./build/index.js"]