# Set the base image to nginx
FROM node

# File Author / Maintainer
MAINTAINER Liudonghua <liudonghua123@gmail.com>

# https://hackernoon.com/build-a-crud-api-with-mongodb-express-and-docker-70510c6f706b
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.5.0/wait /wait
RUN chmod +x /wait

# http://www.clock.co.uk/blog/a-guide-on-how-to-cache-npm-install-with-docker
ADD package.json /app/package.json

ENV NODE_ENV prod

WORKDIR /app

RUN npm install

# copy static resources to the specified location
COPY . /app

# build and start server in production
RUN npm run build

WORKDIR /app/dist

CMD /wait && node index.js