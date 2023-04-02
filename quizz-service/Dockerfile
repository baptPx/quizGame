FROM node:16-alpine
ENV NODE_ENV=prod

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

COPY tsconfig.json ./
COPY . .

RUN ls -a 

RUN npm install

RUN npm run build

EXPOSE 3001

CMD [ "node", "dist/src/Index.js" ]